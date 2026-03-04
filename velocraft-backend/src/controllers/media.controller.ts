import {randomUUID} from 'crypto';
import {promises as fsPromises, createWriteStream} from 'fs';
import path from 'path';
import {pipeline as pipelineCb, Transform} from 'stream';
import {promisify} from 'util';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  Request,
  requestBody,
} from '@loopback/rest';
import {Media} from '../models/media.model';
import {MediaRepository} from '../repositories/media.repository';

const pipeline = promisify(pipelineCb);
const MEDIA_UPLOAD_DIR = path.resolve(__dirname, '../../public/uploads/media');
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
]);
const EXTENSION_TO_MIME_TYPE: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

const FILE_UPLOAD_REQUEST_BODY: any = {
  required: true,
  content: {
    'application/octet-stream': {
      schema: {
        type: 'string',
        format: 'binary',
      },
      'x-parser': 'stream',
    },
  },
};

function getExtensionFromMimeType(mimeType: string): string {
  switch (mimeType) {
    case 'image/jpeg':
    case 'image/jpg':
      return '.jpg';
    case 'image/png':
      return '.png';
    case 'image/webp':
      return '.webp';
    case 'image/gif':
      return '.gif';
    case 'image/svg+xml':
      return '.svg';
    default:
      return '';
  }
}

function getMimeTypeFromExtension(extension: string): string | undefined {
  return EXTENSION_TO_MIME_TYPE[extension.toLowerCase()];
}

function sanitizeBaseName(fileName: string): string {
  const safe = fileName
    .replace(/[^\w.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return safe || 'media';
}

export class MediaController {
  constructor(
    @repository(MediaRepository)
    public mediaRepository: MediaRepository,
  ) {}

  @post('/media/upload', {
    responses: {
      '200': {
        description: 'Uploaded media record',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Media, {includeRelations: true}),
          },
        },
      },
    },
  })
  async upload(
    @requestBody(FILE_UPLOAD_REQUEST_BODY)
    request: Request,
    @param.query.string('fileName') fileName?: string,
  ): Promise<Media> {
    const rawContentType = String(request.headers['content-type'] ?? '');
    const fromHeader = String(request.headers['x-file-name'] ?? '').trim();
    const originalName = (fileName ?? fromHeader ?? '').trim() || 'media';
    const mimeType = rawContentType.split(';')[0].trim().toLowerCase();
    const providedExt = path.extname(originalName).toLowerCase();
    let resolvedMimeType = mimeType;
    if (!ALLOWED_IMAGE_MIME_TYPES.has(resolvedMimeType)) {
      // Swagger often sends octet-stream for binary uploads, so infer by extension.
      if (resolvedMimeType === 'application/octet-stream') {
        const inferred = getMimeTypeFromExtension(providedExt);
        if (inferred) {
          resolvedMimeType = inferred;
        }
      }
    }
    if (!ALLOWED_IMAGE_MIME_TYPES.has(resolvedMimeType)) {
      throw new HttpErrors.BadRequest(
        'Only image uploads are allowed (jpg, png, webp, gif, svg). If using Swagger binary upload, pass fileName with extension like hero.jpg.',
      );
    }

    const extension = providedExt || getExtensionFromMimeType(resolvedMimeType);
    const baseName = sanitizeBaseName(path.basename(originalName, providedExt));
    const storedName = `${Date.now()}-${baseName}-${randomUUID().slice(0, 8)}${extension}`;

    await fsPromises.mkdir(MEDIA_UPLOAD_DIR, {recursive: true});
    const absolutePath = path.join(MEDIA_UPLOAD_DIR, storedName);
    const output = createWriteStream(absolutePath);
    let size = 0;

    const sizeGuard = new Transform({
      transform(chunk, _enc, cb) {
        size += chunk.length;
        if (size > MAX_IMAGE_SIZE_BYTES) {
          cb(new HttpErrors.BadRequest('Image exceeds 5MB limit.'));
          return;
        }
        cb(null, chunk);
      },
    });

    try {
      await pipeline(request, sizeGuard, output);
    } catch (error) {
      await fsPromises.rm(absolutePath, {force: true});
      throw error;
    }

    return this.mediaRepository.create({
      id: randomUUID(),
      fileOriginalName: originalName,
      fileName: storedName,
      fileUrl: `/uploads/media/${storedName}`,
      fileLocation: absolutePath,
      fileType: resolvedMimeType,
      isUsed: false,
    });
  }

  @post('/media', {
    responses: {
      '201': {
        description: 'Media model instance',
        content: {'application/json': {schema: getModelSchemaRef(Media)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Media, {
            title: 'NewMedia',
            exclude: ['createdAt', 'updatedAt'],
          }),
        },
      },
    })
    media: Omit<Media, 'createdAt' | 'updatedAt'>,
  ): Promise<Media> {
    if (!media.id) media.id = randomUUID();
    return this.mediaRepository.create(media);
  }

  @get('/media/count', {
    responses: {
      '200': {
        description: 'Media model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Media) where?: Where<Media>): Promise<Count> {
    return this.mediaRepository.count(where);
  }

  @get('/media', {
    responses: {
      '200': {
        description: 'Array of Media model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Media, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Media) filter?: Filter<Media>): Promise<Media[]> {
    return this.mediaRepository.find(filter);
  }

  @get('/media/{id}', {
    responses: {
      '200': {
        description: 'Media model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Media, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Media, {exclude: 'where'})
    filter?: FilterExcludingWhere<Media>,
  ): Promise<Media> {
    return this.mediaRepository.findById(id, filter);
  }

  @patch('/media/{id}', {
    responses: {
      '204': {
        description: 'Media PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Media, {
            partial: true,
            exclude: ['id', 'createdAt'],
          }),
        },
      },
    })
    media: Partial<Media>,
  ): Promise<void> {
    await this.mediaRepository.updateById(id, {
      ...media,
      updatedAt: new Date(),
    });
  }

  @del('/media/{id}', {
    responses: {
      '204': {
        description: 'Media DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    const media = await this.mediaRepository.findById(id);
    await this.mediaRepository.deleteById(id);

    if (media.fileLocation) {
      await fsPromises.rm(media.fileLocation, {force: true});
    }
  }
}
