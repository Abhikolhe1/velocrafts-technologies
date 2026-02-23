import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources/db.datasource';
import {Contact} from '../models/contact.model';

export class ContactRepository extends DefaultCrudRepository<
  Contact,
  typeof Contact.prototype.id
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Contact, dataSource);
  }
}
