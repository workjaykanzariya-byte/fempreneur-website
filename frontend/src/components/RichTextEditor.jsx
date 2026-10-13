import React, { useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Image, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export default function RichTextEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command, val = '') => {
    document.execCommand(command, false, val);
    handleInput();
  };

  return (
    <div style={{
      border: '1px solid #E2D9EC',
      borderRadius: '12px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      background: '#FFFFFF',
      boxShadow: '0 2px 8px rgba(94, 23, 140, 0.04)'
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        padding: '8px 12px',
        background: '#FAF7FD',
        borderBottom: '1px solid #EAE2F3',
        alignItems: 'center'
      }}>
        <button
          type="button"
          onClick={() => executeCommand('bold')}
          style={{ padding: '6px 8px', border: 'none', background: 'transparent', borderRadius: '6px', cursor: 'pointer', color: '#4A1566' }}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('italic')}
          style={{ padding: '6px 8px', border: 'none', background: 'transparent', borderRadius: '6px', cursor: 'pointer', color: '#4A1566' }}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('underline')}
          style={{ padding: '6px 8px', border: 'none', background: 'transparent', borderRadius: '6px', cursor: 'pointer', color: '#4A1566' }}
          title="Underline"
        >
          <Underline size={16} />
        </button>
        <div style={{ width: '1px', height: '20px', background: '#D9CDE3', margin: '0 6px' }} />
        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          style={{ padding: '6px 8px', border: 'none', background: 'transparent', borderRadius: '6px', cursor: 'pointer', color: '#4A1566' }}
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('insertOrderedList')}
          style={{ padding: '6px 8px', border: 'none', background: 'transparent', borderRadius: '6px', cursor: 'pointer', color: '#4A1566' }}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
        <div style={{ width: '1px', height: '20px', background: '#D9CDE3', margin: '0 6px' }} />
        <button
          type="button"
          onClick={() => executeCommand('justifyLeft')}
          style={{ padding: '6px 8px', border: 'none', background: 'transparent', borderRadius: '6px', cursor: 'pointer', color: '#4A1566' }}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('justifyCenter')}
          style={{ padding: '6px 8px', border: 'none', background: 'transparent', borderRadius: '6px', cursor: 'pointer', color: '#4A1566' }}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('justifyRight')}
          style={{ padding: '6px 8px', border: 'none', background: 'transparent', borderRadius: '6px', cursor: 'pointer', color: '#4A1566' }}
          title="Align Right"
        >
          <AlignRight size={16} />
        </button>
      </div>

      {/* Editor Content Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        style={{
          padding: '16px',
          minHeight: '220px',
          outline: 'none',
          color: '#2B123A',
          fontSize: '0.92rem',
          lineHeight: 1.6,
          fontFamily: 'Outfit, Plus Jakarta Sans, sans-serif',
          overflowY: 'auto'
        }}
        data-placeholder={placeholder || 'Write your article or description here...'}
      />
    </div>
  );
}
