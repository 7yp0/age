import { gte, length } from 'ramda';

export function createHasMinLength(min: number): Validator<any[]> {
  return (array: any[]) => gte(length(array), min);
}
