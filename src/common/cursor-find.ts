import { Model } from 'mongoose';
import { IPaginatedType } from './models/paginated';

export interface ICursorPagination {
  limit?: number;
  sortAscending?: boolean;
  next?: string;
}

export async function cursorFind<T>(
  model: Model<T>,
  pagination: ICursorPagination,
  filter: Object,
): Promise<IPaginatedType<T>> {
  pagination = pagination || {};
  pagination.limit = pagination.limit || 20;
  pagination.sortAscending = pagination.sortAscending || false;

  const cursorQuery = generateCursorQuery(pagination);
  const $sort = generateSort(pagination);

  let results = await model
    .find({ $and: [cursorQuery, filter] })
    .sort($sort as any)
    .limit(pagination.limit + 1);

  const hasMore = results.length > pagination.limit;
  if (hasMore) results.pop();

  const hasNext = hasMore;

  return {
    results,
    next: results[results.length - 1],
    hasNext,
  };
}

function generateCursorQuery(pagination: ICursorPagination) {
  if (!pagination.next) return {};

  const comparisonOp = pagination.sortAscending ? '$gt' : '$lt';
  const op = pagination.next;
  return {
    _id: {
      [comparisonOp]: op,
    },
  };
}

function generateSort(pagination: ICursorPagination) {
  const sortDir = pagination.sortAscending ? 1 : -1;

  return {
    _id: sortDir,
  };
}
