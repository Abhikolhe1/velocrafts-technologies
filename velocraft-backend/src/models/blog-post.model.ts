import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Media, MediaWithRelations} from './media.model';

export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

@model({
  settings: {
    mysql: {table: 'blog_posts'},
  },
})
export class BlogPost extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

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
  excerpt: string;

  @property({
    type: 'string',
    required: true,
  })
  category: string;

  @property({
    type: 'string',
    required: true,
  })
  author: string;

  @property({
    type: 'string',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
  })
  featuredImage?: string;

  @belongsTo(
    () => Media,
    {name: 'featuredMedia'},
    {
      required: false,
      mysql: {
        dataType: 'varchar',
        dataLength: 36,
      },
    },
  )
  featuredMediaId?: string;

  @property({
    type: 'string',
    required: true,
  })
  contentIntro: string;

  @property({
    type: 'object',
    mysql: {
      dataType: 'json',
    },
  })
  contentSections?: BlogSection[];

  @property({
    type: 'string',
  })
  quote?: string;

  @property({
    type: 'object',
    mysql: {
      dataType: 'json',
    },
  })
  keyPoints?: string[];

  @property({
    type: 'object',
    mysql: {
      dataType: 'json',
    },
  })
  tags?: string[];

  @property({
    type: 'number',
  })
  readTime?: number;

  @property({
    type: 'boolean',
    default: true,
  })
  published?: boolean;

  @property({
    type: 'string',
  })
  authorBio?: string;

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

  constructor(data?: Partial<BlogPost>) {
    super(data);
  }
}

export interface BlogPostRelations {
  featuredMedia?: MediaWithRelations;
}

export type BlogPostWithRelations = BlogPost & BlogPostRelations;
