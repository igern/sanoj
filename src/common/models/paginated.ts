import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IPaginatedType<T> {
  results: T[];
  previous: T;
  hasPrevious: boolean;
  next: T;
  hasNext: boolean;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef])
    results: T[];

    @Field(() => classRef)
    previous: T;

    @Field()
    hasPrevious: boolean;

    @Field(() => classRef)
    next: T;
    @Field()
    hasNext: boolean;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
