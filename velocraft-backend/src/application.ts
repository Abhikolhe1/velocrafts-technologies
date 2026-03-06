import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication, RestBindings} from '@loopback/rest';
import path from 'path';
import {MySequence} from './sequence';
import {FILE_UPLOAD_SERVICE, STORAGE_DIRECTORY} from './keys';
import {MediaService} from './services/media.service';
import {logErrorMiddleware} from './middleware/log-error.middleware';
export {ApplicationConfig};

// Uploads stored outside public so they are not in git (see .gitignore)
const STORAGE_PATH = path.resolve(process.cwd(), 'public/uploads');

export class VelocraftsApplication extends BootMixin(
  RepositoryMixin(RestApplication),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // File upload storage (used by media controller)
    this.bind(STORAGE_DIRECTORY).to(STORAGE_PATH);
    // Minimal no-op handler to satisfy FILE_UPLOAD_SERVICE injection.
    // The media controller uses multer directly; this is only to avoid
    // ResolutionError for 'services.file-upload'.
    this.bind(FILE_UPLOAD_SERVICE).to((req, res, cb) => cb());
    this.service(MediaService);

    // Disable strict request body validation so JSON arrays are accepted for portfolio fields
    this.bind(RestBindings.REQUEST_BODY_PARSER_OPTIONS).to({
      validation: false as any,
    });

    // Set up the custom sequence
    this.sequence(MySequence);
    // Log real error cause (e.g. unwrap AggregateError → ECONNREFUSED) for 500s
    this.middleware(logErrorMiddleware);

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
      datasources: {
        dirs: ['datasources'],
        extensions: ['.datasource.js'],
        nested: true,
      },
      models: {
        dirs: ['models'],
        extensions: ['.model.js'],
        nested: true,
      },
      repositories: {
        dirs: ['repositories'],
        extensions: ['.repository.js'],
        nested: true,
      },
    };
  }
}
