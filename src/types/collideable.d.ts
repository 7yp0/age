interface Collideable extends Triggerable {}

interface Collideables {
  [polygonId: string]: Collideable;
}
