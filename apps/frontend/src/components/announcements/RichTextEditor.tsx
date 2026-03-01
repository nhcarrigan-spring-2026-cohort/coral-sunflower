import type React from "react";
import { useEffect, useRef } from "react";

// Keeping the editor simple and lightweight with contentEditable for now.
// It handles basic formatting (Bold/Italic/Lists) without the bloat of a heavy library.

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Update the editor content if the value prop changes from outside
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value: string | undefined = undefined) => {
    // biome-ignore lint: Using simple execCommand for basic editor
    document.execCommand(command, false, value);
    handleInput();
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          backgroundColor: "#f9f9f9",
          borderBottom: "1px solid #eee",
          display: "flex",
          gap: "5px",
          padding: "5px",
        }}
      >
        <button onClick={() => execCommand("bold")} style={buttonStyle} title="Bold" type="button">
          <b>B</b>
        </button>
        <button onClick={() => execCommand("italic")} style={buttonStyle} title="Italic" type="button">
          <i>I</i>
        </button>
        <button
          onClick={() => execCommand("insertUnorderedList")}
          style={buttonStyle}
          title="Bullet List"
          type="button"
        >
          • List
        </button>
      </div>

      {/* Editable Area */}
      <div
        contentEditable
        data-placeholder={placeholder}
        onInput={handleInput}
        ref={editorRef}
        style={{
          color: "#333",
          minHeight: "150px",
          outline: "none",
          padding: "10px",
        }}
      />
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  borderRadius: "3px",
  cursor: "pointer",
  fontSize: "12px",
  padding: "2px 8px",
};

export default RichTextEditor;
