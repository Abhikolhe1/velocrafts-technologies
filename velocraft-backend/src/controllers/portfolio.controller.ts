import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Portfolio} from '../models/portfolio.model';
import {PortfolioRepository} from '../repositories/portfolio.repository';

export class PortfolioController {
  constructor(
    @repository(PortfolioRepository)
    public portfolioRepository: PortfolioRepository,
  ) {}

  @post('/portfolios', {
    responses: {
      '201': {
        description: 'Portfolio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Portfolio)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Portfolio, {
            title: 'NewPortfolio',
            exclude: ['id', 'createdAt', 'updatedAt'],
          }),
        },
      },
    })
    portfolio: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Portfolio> {
    return this.portfolioRepository.create(portfolio);
  }

  @get('/portfolios/count', {
    responses: {
      '200': {
        description: 'Portfolio model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Portfolio) where?: Where<Portfolio>,
  ): Promise<Count> {
    return this.portfolioRepository.count(where);
  }

  @get('/portfolios', {
    responses: {
      '200': {
        description: 'Array of Portfolio model instances (ordered by order ASC)',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Portfolio, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Portfolio) filter?: Filter<Portfolio>,
  ): Promise<Portfolio[]> {
    const order = filter?.order ?? ['order ASC'];
    return this.portfolioRepository.find({
      ...filter,
      order: Array.isArray(order) ? order : [order],
    });
  }

  @get('/portfolios/slug/{slug}', {
    responses: {
      '200': {
        description: 'Portfolio model instance by slug',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Portfolio, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findBySlug(
    @param.path.string('slug') slug: string,
  ): Promise<Portfolio | null> {
    const found = await this.portfolioRepository.findOne({
      where: {slug},
    });
    return found ?? null;
  }

  @get('/portfolios/{id}', {
    responses: {
      '200': {
        description: 'Portfolio model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Portfolio, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Portfolio, {exclude: 'where'})
    filter?: FilterExcludingWhere<Portfolio>,
  ): Promise<Portfolio> {
    return this.portfolioRepository.findById(id, filter);
  }

  @patch('/portfolios/{id}', {
    responses: {
      '204': {
        description: 'Portfolio PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Portfolio, {
            partial: true,
            exclude: ['id', 'createdAt'],
          }),
        },
      },
    })
    portfolio: Partial<Portfolio>,
  ): Promise<void> {
    await this.portfolioRepository.updateById(id, {
      ...portfolio,
      updatedAt: new Date(),
    });
  }

  @del('/portfolios/{id}', {
    responses: {
      '204': {
        description: 'Portfolio DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.portfolioRepository.deleteById(id);
  }
}
