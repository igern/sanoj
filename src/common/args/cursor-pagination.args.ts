import { ArgsType, Int, Field, ID } from '@nestjs/graphql';

export interface ICursorPagination {
  limit?: number;
  sortAscending?: boolean;
  next?: string;
  previous?: string;
}

@ArgsType()
export class CursorPaginationArgs implements ICursorPagination {
  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field({ nullable: true })
  sortAscending?: boolean;

  @Field({ nullable: true })
  next?: string;

  @Field({ nullable: true })
  previous?: string;
}
