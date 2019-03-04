interface Clickable extends Triggerable {}

interface Clickables {
  [polygonId: string]: Clickable;
}
