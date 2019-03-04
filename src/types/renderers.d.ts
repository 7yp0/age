type Renderer = (state: State, context: CanvasRenderingContext2D) => void;

interface RendererObject {
  [key: string]: Renderer;
}
