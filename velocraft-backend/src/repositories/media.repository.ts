import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources/db.datasource';
import {Media, MediaRelations} from '../models/media.model';

export class MediaRepository extends DefaultCrudRepository<
  Media,
  typeof Media.prototype.id,
  MediaRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Media, dataSource);
  }
}
