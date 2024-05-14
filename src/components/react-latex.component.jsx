import React, { Component } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import ReactDOMServer from 'react-dom/server';

class LaTeX {
    constructor({ data, config, api }) {
      this.data = data || {};
      this.api = api;
      this.inlineToolbar = config.inlineToolbar !== undefined ? config.inlineToolbar : true;
      this.CSS = {
        wrapper: 'math-tool-wrapper',
        inline: 'math-inline',
        block: 'math-block',
      };
    }
  
    static get toolbox() {
      return {
        icon: '<svg width="17" height="15" viewBox="0 0 17 15" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M-1-2h16v16H-1z"/><path fill="#000" d="M8.495 12.108h-.98l-1.26-4.142L5.58 9.03c-.236.623-.394 1.134-.474 1.53h-.052c-.074-.35-.193-.846-.357-1.49L3.875 8.08H2.835l1.125 3.91c.116.415.19.724.222.93h.052c.034-.188.082-.476.146-.865l.75-2.975.56 1.893h.743l-.84-2.812.9-2.893h.87L8.16 10.74c.27-.704.485-1.205.644-1.502h.053c.103.292.21.666.323 1.122l.654 2.63zm2.81-.36c.62 0 1.13-.14 1.535-.42.408-.28.63-.654.667-1.124.066-.72-.343-1.405-1.128-2.055L12.44 5.8c.47-.653.707-1.282.707-1.888 0-.59-.21-1.07-.628-1.44C12.03.54 11.473.227 10.875.067 10.273-.1 9.57-.12 8.778.014c-.795.126-1.447.393-1.956.801-.52.417-.786.948-.786 1.588H5.24c0-.57.175-1.08.52-1.53.348-.455.797-.77 1.345-.94.555-.174 1.182-.26 1.876-.26.69 0 1.304.083 1.844.253.545.177.995.445 1.355.804.363.36.546.8.546 1.323 0 .45-.15.883-.453 1.303-.304.42-.72.816-1.24 1.185l-1.066-.915c.507-.5.84-1.013.996-1.538h-.91V6.878h3.376c.013.142.02.365.02.672 0 .84-.27 1.464-.807 1.87-.538.402-1.272.6-2.208.6-.605 0-1.175-.097-1.707-.29-.53-.19-.955-.448-1.275-.776-.32-.33-.477-.725-.477-1.186 0-.555.214-1.02.64-1.392.428-.376.996-.563 1.703-.563.642 0 1.172.177 1.592.53.42.355.63.818.63 1.395V12.11h-.03z"/></g></svg>',
        title: 'LaTeX',
      };
    }
  
    render() {
      const wrapper = document.createElement('div');
      wrapper.classList.add(this.CSS.wrapper);
  
      const latexElement = document.createElement('div');
      latexElement.classList.add(this.CSS.inline);
      latexElement.innerHTML = this.data.expression || ''; // Assuming 'expression' is a LaTeX string
  
      wrapper.appendChild(latexElement);
  
      return wrapper;
    }
  
    save(blockContent) {
      const expressionElement = blockContent.querySelector(`.${this.CSS.inline}`);
      const expression = expressionElement ? expressionElement.innerHTML : '';
      return {
        expression,
      };
    }
  }
  
  export default LaTeX;
  
  