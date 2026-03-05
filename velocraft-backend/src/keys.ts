import {BindingKey} from '@loopback/core';

/**
 * Directory where uploaded files are stored (e.g. public/uploads)
 */
export const STORAGE_DIRECTORY = BindingKey.create<string>('storage.directory');

/**
 * Optional: handler for file upload (e.g. multer middleware).
 * Controllers can use multer directly when storage directory is known.
 */
export type FileUploadHandler = (
  req: unknown,
  res: unknown,
  cb: (err?: unknown) => void,
) => void;

export const FILE_UPLOAD_SERVICE = BindingKey.create<FileUploadHandler>(
  'services.file-upload',
);
