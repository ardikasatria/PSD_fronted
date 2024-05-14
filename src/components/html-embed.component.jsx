// HTMLTool.js

class HTMLTool {
    constructor({ data }) {
      this.data = data || {};
    }
  
    static get toolbox() {
      return {
        title: 'Embed Jupyter Notebook',
        icon: '<>',
      };
    }
  
    render() {
      this.wrapper = document.createElement('div');
      this.wrapper.innerHTML = `
        <div>
          <textarea class="html-input" placeholder="Paste Jupyter Notebook HTML code here..."></textarea>
          <button class="html-submit">Submit</button>
        </div>
        <div class="embedded-notebook"></div>
      `;
  
      const submitButton = this.wrapper.querySelector('.html-submit');
      submitButton.addEventListener('click', () => {
        const htmlInput = this.wrapper.querySelector('.html-input');
        const htmlContent = htmlInput.value;
        this.embedNotebook(htmlContent);
      });
  
      return this.wrapper;
    }
  
    embedNotebook(htmlContent) {
      const notebookContainer = this.wrapper.querySelector('.embedded-notebook');
      notebookContainer.innerHTML = htmlContent;
      this.makeTableResponsive(notebookContainer);
    }
  
    makeTableResponsive(container) {
      const tables = container.querySelectorAll('table');
      tables.forEach(table => {
        table.classList.add('responsive-table');
      });
    }
  
    save(blockContent) {
      return {
        html: blockContent.html,
      };
    }
  
    validate(savedData) {
      if (!savedData.html.trim()) {
        return false;
      }
      return true;
    }
  
    static get isReadOnlySupported() {
      return true;
    }
  
    static get sanitize() {
      return {
        html: {},
      };
    }
  }
  
  export default HTMLTool;
  