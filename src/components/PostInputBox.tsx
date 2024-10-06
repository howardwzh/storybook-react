import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const formats = ['header', 'bold', 'underline', 'list', 'link'];

const customModule = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'underline'],
    ['list', 'bullet'],
  ],
};

const PostInputBox: React.FC = () => {
  const [content, setContent] = useState('');

  const handleChange = (value: string) => {
    setContent(value);
  };

  return (
    <div className="post-input-box">
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={customModule}
        formats={formats}
      />
    </div>
  );
};

export default PostInputBox;