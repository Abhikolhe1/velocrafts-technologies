import {inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, Getter, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources/db.datasource';
import {BlogPost, BlogPostRelations} from '../models/blog-post.model';
import {Media} from '../models/media.model';
import {MediaRepository} from './media.repository';

export class BlogPostRepository extends DefaultCrudRepository<
  BlogPost,
  typeof BlogPost.prototype.id,
  BlogPostRelations
> {
  public readonly featuredMedia: BelongsToAccessor<
    Media,
    typeof BlogPost.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('MediaRepository')
    mediaRepositoryGetter: Getter<MediaRepository>,
  ) {
    super(BlogPost, dataSource);
    this.featuredMedia = this.createBelongsToAccessorFor(
      'featuredMedia',
      mediaRepositoryGetter,
    );
    this.registerInclusionResolver(
      'featuredMedia',
      this.featuredMedia.inclusionResolver,
    );
  }
}
