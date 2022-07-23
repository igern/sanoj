export function partialMatch(object: any, filter: any): boolean {
  return Object.keys(filter).every((key) => {
    const keyInFilter = filter[key];
    const keyInObject = object[key];

    if (keyInFilter && keyInObject) {
      const keyInFilterIsObject = keyInFilter instanceof Object;
      if (keyInFilterIsObject) {
        return partialMatch(object[key], filter[key]);
      } else {
        return filter[key] === object[key];
      }
    } else {
      return false;
    }
  });
}
