class wvveskit {
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
    this.container.className = 'wvves-modal';
    this.container.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      width: 400px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      padding: 20px;
      z-index: 9999;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.3s ease-out, transform 0.3s ease-out;
    `;
    document.body.appendChild(this.container);

    // Trigger animation on next frame
    requestAnimationFrame(() => {
      this.container.style.opacity = '1';
      this.container.style.transform = 'translateY(0)';
    });
  }

  showStep(index) {
    if (index >= this.steps.length) {
      this.close();
      return;
    }

    const step = this.steps[index];
    this.container.innerHTML = `
      <h3 style="margin: 0 0 10px 0;">${step.title}</h3>
      <p style="margin: 50px 0 50px 0;">${step.content}</p>
      <div style="display: flex; justify-content: space-between;">
        <button class="wvves-prev-btn" style="padding: 10px; border-radius: 12px; border: 1px solid #ccc; background: rgba(0, 0, 0, 0.1); display: flex; align-items: center; justify-content: center;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:17px; height: 17px;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <span>${index + 1} / ${this.steps.length}</span>
        <button class="wvves-next-btn">
          ${index === this.steps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    `;

    this.container.querySelector('.wvves-next-btn').onclick = () => this.next();
    this.container.querySelector('.wvves-prev-btn').onclick = () => this.prev();
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
      // Animate out
      this.container.style.opacity = '0';
      this.container.style.transform = 'translateY(20px)';

      // Remove after animation completes
      setTimeout(() => {
        if (this.container) {
          this.container.remove();
        }
      }, 300);
    }
  }
}

module.exports = wvveskit;