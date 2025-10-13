class StepThroughModal {
  constructor(options = {}) {
    this.steps = options.steps || [];
    this.currentStep = 0;
    this.container = null;
  }

  init() {
    this.createContainer();
    this.showStep(0);
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.className = 'step-through-modal';
    this.container.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      max-width: 350px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      padding: 20px;
      z-index: 9999;
    `;
    document.body.appendChild(this.container);
  }

  showStep(index) {
    if (index >= this.steps.length) {
      this.close();
      return;
    }

    const step = this.steps[index];
    this.container.innerHTML = `
      <h3 style="margin: 0 0 10px 0;">${step.title}</h3>
      <p style="margin: 0 0 15px 0;">${step.content}</p>
      <div style="display: flex; justify-content: space-between;">
        <button class="prev-btn">Previous</button>
        <span>${index + 1} / ${this.steps.length}</span>
        <button class="next-btn">${index === this.steps.length - 1 ? 'Finish' : 'Next'}</button>
      </div>
    `;

    this.container.querySelector('.next-btn').onclick = () => this.next();
    this.container.querySelector('.prev-btn').onclick = () => this.prev();
  }

  next() {
    this.showStep(++this.currentStep);
  }

  prev() {
    if (this.currentStep > 0) {
      this.showStep(--this.currentStep);
    }
  }

  close() {
    if (this.container) {
      this.container.remove();
    }
  }
}

module.exports = StepThroughModal;