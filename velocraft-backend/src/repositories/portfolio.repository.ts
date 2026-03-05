import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources/db.datasource';
import {Portfolio, PortfolioRelations} from '../models/portfolio.model';

export class PortfolioRepository extends DefaultCrudRepository<
  Portfolio,
  typeof Portfolio.prototype.id,
  PortfolioRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Portfolio, dataSource);
  }
}
