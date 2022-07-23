import { InputType, IntersectionType, PartialType } from '@nestjs/graphql';
import { IdArgs } from 'src/common/args/id.args';
import { CreateRunnerInput } from './create-runner.input';

@InputType()
export class UpdateRunnerInput extends IntersectionType(
  PartialType(CreateRunnerInput),
  IdArgs,
) {}
