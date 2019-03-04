type EventTuple<evt> = [string, (event: evt) => void, boolean];

interface EventObject {
  [key: string]: EventTuple<any>;
}
