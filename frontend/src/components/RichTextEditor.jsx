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

  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);

      try {
        const token = localStorage.getItem('adminToken');
        const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
        const apiPrefix = isProduction ? '' : `http://${window.location.hostname}:5000`;

        const res = await fetch(`${apiPrefix}/api/blogs/upload-inline`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        const result = await res.json();
        if (result.success) {
          executeCommand('insertImage', `${apiPrefix}${result.url}`);
        } else {
          alert('Failed to upload image: ' + result.message);
        }
      } catch (err) {
        console.error(err);
        alert('Image upload failed.');
      }
    }
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
          style={{
            padding: '6px 8px',
            border: 'none',
            background: 'transparent',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#4A1566'
          }}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('italic')}
          style={{
            padding: '6px 8px',
            border: 'none',
            background: 'transparent',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#4A1566'
          }}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('underline')}
          style={{
            padding: '6px 8px',
            border: 'none',
            background: 'transparent',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#4A1566'
          }}
          title="Underline"
        >
          <Underline size={16} />
        </button>

        <div style={{ width: '1px', height: '20px', background: '#D9CDE3', margin: '0 6px' }} />

        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<h2>')}
          style={{
            padding: '4px 8px',
            border: 'none',
            background: 'transparent',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#4A1566',
            fontWeight: 700,
            fontSize: '12px'
          }}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<h3>')}
          style={{
            padding: '4px 8px',
            border: 'none',
            background: 'transparent',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#4A1566',
            fontWeight: 700,
            fontSize: '12px'
          }}
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<p>')}
          style={{
            padding: '4px 8px',
            border: 'none',
            background: 'transparent',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#4A1566',
            fontWeight: 600,
            fontSize: '12px'
          }}
          title="Paragraph"
        >
          Normal
        </button>

        <div style={{ width: '1px', height: '20px', background: '#D9CDE3', margin: '0 6px' }} />

        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          style={{
            padding: '6px 8px',
            border: 'none',
            background: 'transparent',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#4A1566'
          }}
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('insertOrderedList')}
          style={{
            padding: '6px 8px',
            border: 'none',
            background: 'transparent',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#4A1566'
          }}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>

        <div style={{ width: '1px', height: '20px', background: '#D9CDE3', margin: '0 6px' }} />

        <button
          type="button"
          onClick={() => executeCommand('justifyLeft')}
          style={{
            padding: '6px 8px',
            border: 'none',
            background: 'transparent',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#4A1566'
          }}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('justifyCenter')}
          style={{
            padding: '6px 8px',
            border: 'none',
            background: 'transparent',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#4A1566'
          }}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('justifyRight')}
          style={{
            padding: '6px 8px',
            border: 'none',
            background: 'transparent',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#4A1566'
          }}
          title="Align Right"
        >
          <AlignRight size={16} />
        </button>

        <div style={{ width: '1px', height: '20px', background: '#D9CDE3', margin: '0 6px' }} />

        <label
          style={{
            padding: '6px 8px',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#4A1566',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Insert Inline Image"
        >
          <Image size={16} />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* Editor Content Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        style={{
          padding: '16px',
          minHeight: '260px',
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
