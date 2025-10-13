class wvveskit {
  constructor(options = {}) {
    this.steps = options.steps || [];
    this.currentStep = 0;
    this.container = null;
    this.theme = {
      backgroundColor: '#ffffff',
      textColor: '#333333',
      buttonBg: 'rgba(0, 0, 0, 0.1)',
      buttonHoverBg: 'rgba(0, 0, 0, 0.15)',
      borderColor: '#cccccc',
      borderRadius: '16px',
      buttonRadius: '12px',
      ...options.theme
    };
  }

  init() {
    this.injectStyles();
    this.createContainer();
    this.showStep(0);
  }

  injectStyles() {
    // Check if styles already injected
    if (document.getElementById('wvves-styles')) return;

    const style = document.createElement('style');
    style.id = 'wvves-styles';
    style.textContent = `
      .wvves-modal {
        --wvves-bg: ${this.theme.backgroundColor};
        --wvves-text: ${this.theme.textColor};
        --wvves-btn-bg: ${this.theme.buttonBg};
        --wvves-btn-hover-bg: ${this.theme.buttonHoverBg};
        --wvves-border: ${this.theme.borderColor};
        --wvves-radius: ${this.theme.borderRadius};
        --wvves-btn-radius: ${this.theme.buttonRadius};
      }

      .wvves-btn {
        padding: 10px 16px;
        border-radius: var(--wvves-btn-radius);
        border: 1px solid var(--wvves-border);
        background: var(--wvves-btn-bg);
        color: var(--wvves-text);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s ease;
        min-width: 60px;
      }

      .wvves-btn:hover {
        background: var(--wvves-btn-hover-bg);
        transform: translateY(-1px);
      }

      .wvves-btn:active {
        transform: translateY(0);
      }

      .wvves-btn svg {
        width: 17px;
        height: 17px;
        color: var(--wvves-text);
      }
    `;
    document.head.appendChild(style);
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.className = 'wvves-modal';
    this.container.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      width: 400px;
      background: var(--wvves-bg);
      color: var(--wvves-text);
      border-radius: var(--wvves-radius);
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
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>
      <h3 style="margin: 0 0 10px 0;">${step.title}</h3>
      <p style="margin: 50px 0 50px 0; font-size: 34px; line-height: 1.15;">${step.content}</p>
      <div style="display: flex; justify-content: space-between;">
        <button class="wvves-prev-btn wvves-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <span>${index + 1} / ${this.steps.length}</span>
        <button class="wvves-next-btn wvves-btn">
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