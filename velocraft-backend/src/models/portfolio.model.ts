import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {table: 'portfolio'},
  },
})
export class Portfolio extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    default: 0,
  })
  order?: number;

  @property({
    type: 'string',
    required: true,
    index: {unique: true},
  })
  slug: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'string',
    required: true,
  })
  shortDescription: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
  })
  challenge?: string;

  @property({
    type: 'string',
  })
  approach?: string;

  @property({
    type: 'object',
    mysql: {dataType: 'json'},
  })
  technologies?: string[];

  @property({
    type: 'string',
    required: true,
  })
  category: string;

  @property({
    type: 'object',
    mysql: {dataType: 'json'},
  })
  results?: string[];

  @property({
    type: 'string',
  })
  client?: string;

  @property({
    type: 'string',
  })
  duration?: string;

  @property({
    type: 'string',
  })
  teamSize?: string;

  @property({
    type: 'object',
    mysql: {dataType: 'json'},
  })
  keyFeatures?: string[];

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdAt?: Date;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  updatedAt?: Date;

  constructor(data?: Partial<Portfolio>) {
    super(data);
  }
}

export interface PortfolioRelations {}

export type PortfolioWithRelations = Portfolio & PortfolioRelations;
