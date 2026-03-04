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
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {BlogPost} from '../models/blog-post.model';
import {BlogPostRepository} from '../repositories/blog-post.repository';

export class BlogPostController {
  constructor(
    @repository(BlogPostRepository)
    public blogPostRepository: BlogPostRepository,
  ) {}

  @post('/blog-posts', {
    responses: {
      '201': {
        description: 'BlogPost model instance',
        content: {'application/json': {schema: getModelSchemaRef(BlogPost)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BlogPost, {
            title: 'NewBlogPost',
            exclude: ['id', 'createdAt', 'updatedAt'],
          }),
        },
      },
    })
    blogPost: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<BlogPost> {
    return this.blogPostRepository.create(blogPost);
  }

  @get('/blog-posts/count', {
    responses: {
      '200': {
        description: 'BlogPost model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(BlogPost) where?: Where<BlogPost>): Promise<Count> {
    return this.blogPostRepository.count(where);
  }

  @get('/blog-posts', {
    responses: {
      '200': {
        description: 'Array of BlogPost model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(BlogPost, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(BlogPost) filter?: Filter<BlogPost>,
  ): Promise<BlogPost[]> {
    return this.blogPostRepository.find(filter);
  }

  @get('/blog-posts/slug/{slug}', {
    responses: {
      '200': {
        description: 'BlogPost model instance by slug',
        content: {
          'application/json': {
            schema: getModelSchemaRef(BlogPost, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findBySlug(@param.path.string('slug') slug: string): Promise<BlogPost | null> {
    const found = await this.blogPostRepository.findOne({
      where: {slug, published: true},
      include: [{relation: 'featuredMedia'}],
    });
    return found ?? null;
  }

  @get('/blog-posts/{id}', {
    responses: {
      '200': {
        description: 'BlogPost model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(BlogPost, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(BlogPost, {exclude: 'where'})
    filter?: FilterExcludingWhere<BlogPost>,
  ): Promise<BlogPost> {
    return this.blogPostRepository.findById(id, filter);
  }

  @patch('/blog-posts/{id}', {
    responses: {
      '204': {
        description: 'BlogPost PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BlogPost, {
            partial: true,
            exclude: ['id', 'createdAt'],
          }),
        },
      },
    })
    blogPost: Partial<BlogPost>,
  ): Promise<void> {
    await this.blogPostRepository.updateById(id, {
      ...blogPost,
      updatedAt: new Date(),
    });
  }

  @del('/blog-posts/{id}', {
    responses: {
      '204': {
        description: 'BlogPost DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.blogPostRepository.deleteById(id);
  }
}
