import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRunnerInput {
  @Field()
  name: string;
}
