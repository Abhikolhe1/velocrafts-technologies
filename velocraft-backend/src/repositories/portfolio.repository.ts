import {inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, Getter, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources/db.datasource';
import {Media} from '../models/media.model';
import {Portfolio, PortfolioRelations} from '../models/portfolio.model';
import {MediaRepository} from './media.repository';

export class PortfolioRepository extends DefaultCrudRepository<
  Portfolio,
  typeof Portfolio.prototype.id,
  PortfolioRelations
> {
  public readonly featuredMedia: BelongsToAccessor<
    Media,
    typeof Portfolio.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('MediaRepository')
    mediaRepositoryGetter: Getter<MediaRepository>,
  ) {
    super(Portfolio, dataSource);
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
