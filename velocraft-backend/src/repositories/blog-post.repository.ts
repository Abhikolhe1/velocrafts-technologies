import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources/db.datasource';
import {BlogPost} from '../models/blog-post.model';

export class BlogPostRepository extends DefaultCrudRepository<
  BlogPost,
  typeof BlogPost.prototype.id
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(BlogPost, dataSource);
  }
}
