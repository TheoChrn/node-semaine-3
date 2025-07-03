export function arrayToObject<T, K extends keyof T>(
  arr: T[],
  keyField: K
): Record<string, Omit<T, K>> {
  return arr.reduce(
    (acc, item) => {
      const groupKey = item[keyField] as unknown as string;
      const { [keyField]: _, ...rest } = item;
      acc[groupKey] = rest;
      return acc;
    },
    {} as Record<string, Omit<T, K>>
  );
}

export function groupBy<T, K extends keyof T>(
  arr: T[],
  keyField: K
): Partial<Record<string, Omit<T, K>[]>> {
  return arr.reduce(
    (groups, item) => {
      const groupKey = item[keyField] as unknown as string;
      const { [keyField]: _, ...rest } = item;
      (groups[groupKey] ||= []).push(rest);
      return groups;
    },
    {} as Partial<Record<string, Omit<T, K>[]>>
  );
}
