export class Motion {
  element = document.createElement('div');

  constructor(_config?: unknown) {
    this.element.setAttribute('data-page-agent-ignore', 'true');
  }

  autoResize(_target: HTMLElement) {}

  start() {}

  pause() {}

  fadeIn() {}

  fadeOut() {}

  dispose() {
    this.element.remove();
  }
}
