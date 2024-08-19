class DrawEngine {
  context: CanvasRenderingContext2D;
  mousePos: DOMPoint;

  constructor() {
    this.context = c2d.getContext("2d");

    this.mousePos = new DOMPoint(0, 0);
    c2d.addEventListener("mousemove", (event: MouseEvent) => {
      let mouseX = event.clientX - c2d.getBoundingClientRect().left;
      let mouseY = event.clientY - c2d.getBoundingClientRect().top;
      this.mousePos = new DOMPoint(mouseX, mouseY);
    });
  }

  get canvasWidth() {
    return this.context.canvas.width;
  }

  get canvasHeight() {
    return this.context.canvas.height;
  }

  get mousePosition() {
    return this.mousePos;
  }

  drawText(
    text: string,
    fontSize: number,
    x: number,
    y: number,
    color = "white",
    textAlign: "center" | "left" | "right" = "center"
  ) {
    const context = this.context;

    context.font = `${fontSize}px system-ui, Roboto, Helvetica, Arial, sans-serif-black`;
    context.textAlign = textAlign;
    context.strokeStyle = "black";
    context.lineWidth = 4;
    context.strokeText(text, x, y);
    context.fillStyle = color;
    context.fillText(text, x, y);
  }
}

export const drawEngine = new DrawEngine();
