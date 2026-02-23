import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {table: 'contacts'},
  },
})
export class Contact extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  company?: string;

  @property({
    type: 'string',
  })
  service?: string;

  @property({
    type: 'string',
    required: true,
  })
  message: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdAt?: string;

  constructor(data?: Partial<Contact>) {
    super(data);
  }
}
