import { ArgsType, Int, Field, ID, InputType } from '@nestjs/graphql';

export interface ICursorPagination {
  limit?: number;
  sortAscending?: boolean;
  next?: string;
}

@InputType()
export class CursorPaginationInput implements ICursorPagination {
  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field({ nullable: true })
  sortAscending?: boolean;

  @Field({ nullable: true })
  next?: string;
}
