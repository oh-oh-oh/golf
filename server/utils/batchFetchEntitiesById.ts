export const batchFetchEntitiesById = async <T, V>(
  fetchEntitiesByKey: (pks: V[]) => Promise<T[]>,
  pks: readonly V[],
  getLookupKey: keyof T | ((e: T) => V),
) => {
  const map = new Map<V | T[keyof T], T>();

  const entities = await fetchEntitiesByKey([...pks]);

  entities.forEach(entity => {
    const lookupKey = 
      typeof getLookupKey === 'function'
        ? getLookupKey(entity)
        : entity[getLookupKey]
    map.set(lookupKey, entity)
  })

  return pks.map(pk => map.get(pk) ?? null);
}
