import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      table: 'media',
    },
  },
})
export class Media extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    mysql: {
      dataType: 'varchar',
      dataLength: 36,
    },
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  fileOriginalName: string;

  @property({
    type: 'string',
    required: true,
  })
  fileName: string;

  @property({
    type: 'string',
    required: true,
  })
  fileUrl: string;

  @property({
    type: 'string',
    required: true,
  })
  fileLocation: string;

  @property({
    type: 'string',
    required: true,
  })
  fileType: string;

  @property({
    type: 'boolean',
    default: false,
    mysql: {
      dataType: 'tinyint',
      default: 0,
    },
  })
  isUsed?: boolean;

  @property({
    type: 'date',
    defaultFn: 'now',
    mysql: {
      dataType: 'datetime',
    },
  })
  createdAt?: Date;

  @property({
    type: 'date',
    defaultFn: 'now',
    mysql: {
      dataType: 'datetime',
    },
  })
  updatedAt?: Date;

  constructor(data?: Partial<Media>) {
    super(data);
  }
}

export interface MediaRelations {}

export type MediaWithRelations = Media & MediaRelations;