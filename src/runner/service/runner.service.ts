import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICursorPagination } from 'src/common/args/cursor-pagination.args';
import { IPaginatedType } from 'src/common/models/paginated';
import { Runner, RunnerDocument } from './runner.schema';

@Injectable()
export class RunnerService {
  constructor(
    @InjectModel(Runner.name) private runnerModel: Model<RunnerDocument>,
  ) {}

  async create(createDto: Pick<Runner, 'name'>): Promise<Runner> {
    return await this.runnerModel.create(createDto);
  }

  async update(
    updateDto: Pick<Runner, 'id'> & Partial<Pick<Runner, 'name'>>,
  ): Promise<Runner> {
    const { id, ...update } = updateDto;
    const runner = await this.runnerModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!runner) throw new Error('runner not found');
    return runner;
  }

  async delete(id: string): Promise<Runner> {
    const runner = await this.runnerModel.findByIdAndDelete(id, { new: true });
    if (!runner) throw new Error('runner not found');
    return runner;
  }

  async findAll(): Promise<Runner[]> {
    return await this.runnerModel.find();
  }

  async find(filter: Partial<Runner>): Promise<Runner[]> {
    return await this.runnerModel.find(filter);
  }

  async findPaginated(
    pagination: ICursorPagination,
    filter: Partial<Runner>,
  ): Promise<IPaginatedType<Runner>> {
    pagination = pagination || {};

    pagination.limit = pagination.limit || 20;

    const cursorQuery = this.generateCursorQuery(pagination);
    const sort = this.generateSort(pagination);

    let results = await this.runnerModel
      .find({ $and: [cursorQuery, filter] })
      .sort(sort as any)
      .limit(pagination.limit + 1);

    const hasMore = results.length > pagination.limit;
    if (hasMore) results.pop();

    const hasPrevious = !!pagination.next || !!(pagination.previous && hasMore);
    const hasNext = !!pagination.previous || hasMore;

    if (pagination.previous) results = results.reverse();
    return {
      results,
      previous: results[0],
      hasPrevious,
      next: results[results.length - 1],
      hasNext,
    };
  }

  generateCursorQuery(pagination: ICursorPagination) {
    if (!pagination.next && !pagination.previous) return {};

    const sortAsc =
      (!pagination.sortAscending && pagination.previous) ||
      (pagination.sortAscending && !pagination.previous);
    const comparisonOp = sortAsc ? '$gt' : '$lt';
    const op = pagination.next || pagination.previous;
    return {
      _id: {
        [comparisonOp]: op,
      },
    };
  }

  generateSort(pagination: ICursorPagination) {
    const sortAsc =
      (!pagination.sortAscending && pagination.previous) ||
      (pagination.sortAscending && !pagination.previous);
    const sortDir = sortAsc ? 1 : -1;

    return {
      _id: sortDir,
    };
  }
}
