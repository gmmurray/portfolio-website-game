export function mergeWithDefault<T>(defaultObject: T, providedObject?: T) {
  if (!providedObject) return defaultObject;

  Object.keys(providedObject).forEach(key => {
    if (providedObject[key as keyof typeof providedObject] === undefined) {
      delete providedObject[key as keyof typeof providedObject];
    }
  });

  return {
    ...defaultObject,
    ...providedObject,
  };
}
