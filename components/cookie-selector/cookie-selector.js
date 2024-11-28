class CookieSelector extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  toggleSwitch(event) {
    const isChecked = event.target.checked;
    this.state = !this.state; // TODO: Remove this later
    console.log(isChecked ? 'Cookies enabled' : 'Cookies disabled');
    // Add any additional logic you want to handle the toggle state
  }

  attachEventListeners() {
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.addEventListener('change', this.toggleSwitch);
    }
  }

  render() {
    // const title = this.getAttribute('title') || 'Default Title';
    // const description = this.getAttribute('description') || 'Default Description';
    const isDisabled = this.getAttribute('disabled') === 'true';
    const isChecked = this.getAttribute('checked') === 'true';

    this.shadowRoot.innerHTML = `
      <style>
        .cookie-container {
          font-family: Arial, sans-serif;
          background-color: #f4f4f0;
          padding: 16px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #e0e0e0;
          height: 100%;
        }

        .content {
          max-width: 70%;
        }

        .title {
          font-size: 14px;
          font-weight: bold;
          margin: 0;
        }

        .description {
          font-size: 12px;
          margin: 4px 0 0;
          color: #666;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 20px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 20px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #f00;
        }

        input:checked + .slider:before {
          transform: translateX(20px);
        }

        input:disabled + .slider {
          background-color: #bbb;
          cursor: not-allowed;
        }
      </style>

      <div class="cookie-container">
        <div class="content">
          <slot></slot>
        </div>
        <label class="switch">
          <input type="checkbox" ${isDisabled ? 'disabled' : ''} ${isChecked ? 'checked' : ''} />
          <span class="slider"></span>
        </label>
      </div>
    `;
  }
}

customElements.define('cookie-selector', CookieSelector);
