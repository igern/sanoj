import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cursorFind, ICursorPagination } from 'src/common/cursor-find';
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

  async findById(id: string): Promise<Runner> {
    const runner = await this.runnerModel.findById(id);
    if (!runner) throw new Error('runner not found');
    return runner;
  }

  async findPaginated(
    pagination: ICursorPagination,
    filter: Partial<Runner>,
  ): Promise<IPaginatedType<Runner>> {
    return await cursorFind(this.runnerModel, pagination, filter);
  }
}
