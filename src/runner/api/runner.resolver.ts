import { Type } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { IdArgs } from 'src/common/args/id.args';
import {
  ISubscriptionPayload,
  MutationType,
  SubscriptionPayload,
} from 'src/common/models/subscription-payload';
import { partialMatch } from 'src/common/partial-match';
import { RunnerService } from '../service/runner.service';
import { CreateRunnerInput } from './inputs/create-runner.input';
import { RunnerFilterInput } from './inputs/runner-filter.input';
import { UpdateRunnerInput } from './inputs/update-runner.input';
import { RunnerModel } from './runner.model';

const pubSub = new PubSub();

const RunnerSubscriptionPayloadModel =
  SubscriptionPayload<RunnerModel>(RunnerModel);

@Resolver(() => RunnerModel)
export class RunnerResolver {
  constructor(private readonly runnerService: RunnerService) {}

  @Query(() => [RunnerModel])
  async runners(
    @Args('input') input: RunnerFilterInput,
  ): Promise<RunnerModel[]> {
    const runners = await this.runnerService.find(input);
    return runners.map((e) => RunnerModel.from(e));
  }

  @Subscription(() => RunnerSubscriptionPayloadModel, {
    filter(
      payload: { runner: ISubscriptionPayload<RunnerModel> },
      variables: { input: RunnerFilterInput },
    ) {
      return partialMatch(payload.runner.data, variables.input);
    },
  })
  runner(@Args('input') _: RunnerFilterInput) {
    return pubSub.asyncIterator('runner');
  }

  @Mutation(() => RunnerModel)
  async createRunner(
    @Args('input') input: CreateRunnerInput,
  ): Promise<RunnerModel> {
    const runner = RunnerModel.from(await this.runnerService.create(input));
    pubSub.publish('runner', {
      runner: {
        mutation: MutationType.CREATED,
        data: runner,
      },
    });
    return runner;
  }

  @Mutation(() => RunnerModel)
  async updateRunner(
    @Args('input') input: UpdateRunnerInput,
  ): Promise<RunnerModel> {
    const runner = RunnerModel.from(await this.runnerService.update(input));
    pubSub.publish('runner', {
      runner: {
        mutation: MutationType.UPDATED,
        data: runner,
      },
    });
    return runner;
  }

  @Mutation(() => RunnerModel)
  async deleteRunner(@Args() { id }: IdArgs): Promise<RunnerModel> {
    const runner = RunnerModel.from(await this.runnerService.delete(id));
    pubSub.publish('runner', {
      runner: {
        mutation: MutationType.DELETED,
        data: runner,
      },
    });
    return runner;
  }
}
