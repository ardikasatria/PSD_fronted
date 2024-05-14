/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js/lib/core';
import { MathTex } from 'editorjs-math';
import EJLatex from 'editorjs-latex';
import { BlockMath } from 'react-katex';


const Img = ({ url, caption }) => {
    return (
        <div>
            <img src={url} />
            { caption.length ? <p className="w-full text-center my-3 md:mb-12 text-base text-dark-grey">{caption}</p> : "" }
        </div>
    )
}

const Quote = ({ quote, caption }) => {
    return (
        <div className="bg-purple/10 p-3 pl-5 border-l-4 border-purple">
            <p className="text-xl leading-10 md:text-2xl">{quote}</p>
            {caption.length ? <p className="w-full text-purple text-base">{caption}</p> : ""}
        </div>
    )
}

const List = ({ style, items }) => {
    return (
        <ol className={`pl-5 ${ style == "ordered" ? " list-decimal" : " list-disc"}`}>

            {
               items.map((listItem, i) => {
                    return <li key={i} className="my-4" dangerouslySetInnerHTML={{ __html: listItem }}></li>
               }) 
            }

        </ol>
    )
}

const CodeBlog = ({ code }) => {
    const codeRef = useRef(null);
  
    useEffect(() => {
      hljs.highlightBlock(codeRef.current);
    }, [code]);
  
    return (
      <pre className="code-blog rounded-lg">
        <code ref={codeRef} className="language-python">
          {code}
        </code>
      </pre>
    );
};





const BlogContent = ({ block }) => {
    let { type, data } = block;

    if (type === "paragraph") {
        return <p dangerouslySetInnerHTML={{ __html: data.text }} />;
    } 

    if (type === "header") {
        const Tag = `h${data.level}`;
        return <Tag dangerouslySetInnerHTML={{ __html: data.text }} />;
    }

    if (type === "image") {
        return <Img url={data.file.url} caption={data.caption} />;
    }

    if (type === "quote") {
        return <Quote quote={data.text} caption={data.caption} />;
    }
    
    if (type === "list") {
        return <List style={data.style} items={data.items} />;
    }

    if (type === "code") {
        return <CodeBlog code={data.code} />;
    }

    if (type === "Math") {
        return <BlockMath math={data.math} />;
    }


}

export default BlogContent;