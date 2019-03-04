export function strokeLine(
  vertexA: Point,
  vertexB: Point,
  context: CanvasRenderingContext2D,
  strokeStyle: string = '#000',
): void {
  context.lineWidth = 1;
  context.strokeStyle = strokeStyle;
  context.beginPath();
  context.moveTo(vertexA.x, vertexA.y);
  context.lineTo(vertexB.x, vertexB.y);
  context.stroke();
}
