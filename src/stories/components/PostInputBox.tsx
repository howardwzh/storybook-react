import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { registerCustomFormat, handleTextMatcher, handleCursorText } from './PostInputBoxUtils';

const formats = ['header', 'bold', 'underline', 'list', 'link', 'emoji'];

const customModule = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'underline'],
    ['list', 'bullet'],
    ['emoji'],
  ],
};

const PostInputBoxWrapper = () => {
  const [content, setContent] = useState('');

  const handleChange = (delta: any) => {
    // setContent(delta);
  };


  useEffect(() => {
    registerCustomFormat();
  }, []);

  return <PostInputBox content={content} onChange={handleChange} />;
}

const PostInputBox: React.FC<{content: string, onChange: (delta: any) => void, maxLength?: number}> = ({content, onChange, maxLength}) => {
  const [quillRef, setQuillRef] = useState<ReactQuill | null>(null);
  const timeRef = useRef<{ handleChange: NodeJS.Timeout | null }>({handleChange: null});
  const syncRef = useRef({stopChange: false});

  useEffect(() => {
    if (quillRef) {
      const quill = quillRef.editor;
      const callback = (node: any, delta: any):any => {
        const result = handleTextMatcher(
          node,
          delta
        );
        return result as any;
      }
      // quill?.clipboard.addMatcher(Node.TEXT_NODE, callback);
      quill?.root.addEventListener("compositionstart", handleComposStart);
      quill?.root.addEventListener("compositionend", handleComposEnd);
      return () => {
        quill?.root.removeEventListener("compositionstart", handleComposStart);
        quill?.root.removeEventListener("compositionend", handleComposEnd);
      }
    }
  }, [quillRef]);

  const handleChange = useCallback(
    (value: string) => {
      if (!quillRef) return;
      timeRef.current.handleChange && clearTimeout(timeRef.current.handleChange);
      timeRef.current.handleChange = setTimeout(() => {
        if (syncRef.current.stopChange) return;
        handleCursorText(
          quillRef.editor,
          maxLength ?? 0,
        );
        onChange && onChange(quillRef.editor?.getContents())
      }, 100);
    },
    [quillRef, maxLength],
  );

  const handleComposStart = () => {
    syncRef.current.stopChange = true;
  };
  const handleComposEnd = () => {
    syncRef.current.stopChange = false;
  };

  return (
    <div className="post-input-box">
      <ReactQuill
        ref={(ref) => setQuillRef(ref)}
        value={content}
        onChange={handleChange}
        modules={customModule}
        formats={formats}
      />
    </div>
  );
};

export default PostInputBoxWrapper;