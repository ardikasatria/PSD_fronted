import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Table from "@editorjs/table";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter"
import { uploadImage } from "../common/aws";
import hljs from 'highlight.js/lib/core'; 
import python from 'highlight.js/lib/languages/python';
import RawTool from '@editorjs/raw';
import Strikethrough from "editorjs-strikethrough";
import Underline from '@editorjs/underline';


// Import the necessary styles for Highlight.js
import 'highlight.js/styles/atom-one-dark.css'; // Choose your preferred style
import EJLaTeX from "editorjs-latex";

// Register Python language syntax highlighting
hljs.registerLanguage('python', python);

const uploadImageByFile = (e) =>
  uploadImage(e).then((url) => {
    if (url) {
      return {
        success: 1,
        file: { url },
      };
    }
  });

const uploadImageByURL = (e) => {
  const link = new Promise((resolve, reject) => {
    try {
      resolve(e);
    } catch (err) {
      reject(err);
    }
  });

  return link.then((url) => ({
    success: 1,
    file: { url },
  }));
};

export const tools = {
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByURL,
        uploadByFile: uploadImageByFile,
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: "Type Heading....",
      levels: [2, 3],
      defaultLevel: 2,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  table: {
    class: Table,
    inlineToolbar: true,
  },
  code: {
    class: Code,
    inlineToolbar: true,
  },
  delimiter: {
    class: Delimiter,
    inlineToolbar: true,
  },
  embed: {
    class: Embed,
    inlineToolbar: true,
    config: {
      services: {
        youtube: true,
        coub: true,
        github: true,
        codepen: {
          regex: /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
          embedUrl: 'https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2',
          html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
          height: 300,
          width: 600,
          id: (groups) => groups.join('/embed/')
        }
      }
    }
  },
  Math: {
    class: EJLaTeX,
    inlineToolbar: true,
    config: {
      css: '.math-input-wrapper { padding: 5px; }'
    }
  },
  strikethrough: {
    class: Strikethrough,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+X',
  },
  marker: Marker,
  inlineCode: InlineCode,
  raw: RawTool,
  underline: Underline
}
