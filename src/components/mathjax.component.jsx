class MathJaxTool {
    constructor({ data }) {
      this.data = data.math || '';
      this.wrapper = null;
      this.input = null;
    }
  
    static get toolbox() {
      return {
        title: 'MathJax',
        icon: '<svg>...</svg>',
      };
    }
  
    render() {
      this.wrapper = document.createElement('div');
      this.input = document.createElement('input');
      this.wrapper.appendChild(this.input);
  
      // Load MathJax script dynamically
      const script = document.createElement('script');
      script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
      script.async = true;
      document.head.appendChild(script);
  
      script.onload = () => {
        // Configure MathJax
        window.MathJax = {
          tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']], // Configure inline math delimiters
          },
          svg: {
            fontCache: 'global', // Use a global font cache to improve performance
          },
        };
  
        // Load MathJax
        const mathJaxScript = document.createElement('script');
        mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
        mathJaxScript.async = true;
        document.head.appendChild(mathJaxScript);
      };
  
      // Update input value with saved data
      this.input.value = this.data;
  
      return this.wrapper;
    }
  
    save() {
      return {
        math: this.input.value,
      };
    }
  }
  
  export default MathJaxTool;
  