import { Type } from '@nestjs/common';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum MutationType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

registerEnumType(MutationType, {
  name: 'MutationType',
});

export interface ISubscriptionPayload<T> {
  mutation: MutationType;
  data: T;
}

export function SubscriptionPayload<T>(
  classRef: Type<T>,
): Type<ISubscriptionPayload<T>> {
  @ObjectType({ isAbstract: true })
  abstract class SubscriptionPayloadType implements ISubscriptionPayload<T> {
    @Field(() => MutationType)
    mutation: MutationType;
    @Field(() => classRef)
    data: T;
  }

  return SubscriptionPayloadType as Type<ISubscriptionPayload<T>>;
}
