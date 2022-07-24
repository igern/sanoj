import { ArgsType, Int, Field, ID, InputType } from '@nestjs/graphql';
import { ICursorPagination } from '../cursor-find';

@InputType()
export class CursorPaginationInput implements ICursorPagination {
  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field({ nullable: true })
  sortAscending?: boolean;

  @Field({ nullable: true })
  next?: string;
}
