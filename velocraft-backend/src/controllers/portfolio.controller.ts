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
      description: 'Portfolio payload (technologies, results, keyFeatures are arrays of strings)',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['slug', 'title', 'shortDescription', 'description', 'category'],
            properties: {
              order: {type: 'number'},
              slug: {type: 'string'},
              title: {type: 'string'},
              imageId: {type: 'string', description: 'Media id from /files upload'},
              shortDescription: {type: 'string'},
              description: {type: 'string'},
              challenge: {type: 'string'},
              approach: {type: 'string'},
              technologies: {type: 'array', items: {type: 'string'}},
              category: {type: 'string'},
              results: {type: 'array', items: {type: 'string'}},
              client: {type: 'string'},
              duration: {type: 'string'},
              teamSize: {type: 'string'},
              keyFeatures: {type: 'array', items: {type: 'string'}},
            },
          },
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
      include: [{relation: 'featuredMedia'}],
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
      include: [{relation: 'featuredMedia'}],
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
    return this.portfolioRepository.findById(id, {
      ...filter,
      include: [{relation: 'featuredMedia'}],
    });
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
          schema: {
            type: 'object' as const,
            properties: {
              order: {type: 'number' as const},
              slug: {type: 'string' as const},
              title: {type: 'string' as const},
              imageId: {type: 'string' as const},
              shortDescription: {type: 'string' as const},
              description: {type: 'string' as const},
              challenge: {type: 'string' as const},
              approach: {type: 'string' as const},
              technologies: {type: 'array' as const, items: {type: 'string' as const}},
              category: {type: 'string' as const},
              results: {type: 'array' as const, items: {type: 'string' as const}},
              client: {type: 'string' as const},
              duration: {type: 'string' as const},
              teamSize: {type: 'string' as const},
              keyFeatures: {type: 'array' as const, items: {type: 'string' as const}},
            },
            additionalProperties: false,
          } as any,
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
