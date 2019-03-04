export function logAnything(...args: any[]) {
  // tslint:disable-next-line:no-console
  console.log(...args);
}

export function logWarning(warning: Error) {
  // tslint:disable-next-line:no-console
  console.warn(warning);
}

export function logError(error: Error) {
  // tslint:disable-next-line:no-console
  console.error(error);
}
