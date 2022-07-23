import { Field, ObjectType } from '@nestjs/graphql';
import { Runner } from '../service/runner.schema';

@ObjectType()
export class RunnerModel {
  @Field()
  id: string;

  @Field()
  name: string;

  static from(runner: Runner): RunnerModel {
    let model = new RunnerModel();

    model.id = runner.id;
    model.name = runner.name;

    return model;
  }
}
