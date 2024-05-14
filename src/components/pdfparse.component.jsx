import React, { useState } from 'react';
import pdf from 'pdf-parse';

const PdfParserComponent = () => {
  const [text, setText] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const data = await pdf(file);
      setText(data.text);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <div>{text}</div>
    </div>
  );
};

export default PdfParserComponent;
