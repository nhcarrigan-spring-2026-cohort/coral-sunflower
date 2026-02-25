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
        border: "1px solid #ccc",
        borderRadius: "4px",
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          padding: "5px",
          borderBottom: "1px solid #eee",
          display: "flex",
          gap: "5px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <button type="button" onClick={() => execCommand("bold")} style={buttonStyle} title="Bold">
          <b>B</b>
        </button>
        <button type="button" onClick={() => execCommand("italic")} style={buttonStyle} title="Italic">
          <i>I</i>
        </button>
        <button
          type="button"
          onClick={() => execCommand("insertUnorderedList")}
          style={buttonStyle}
          title="Bullet List"
        >
          • List
        </button>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        style={{
          padding: "10px",
          minHeight: "150px",
          outline: "none",
          color: "#333",
        }}
        data-placeholder={placeholder}
      />
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  padding: "2px 8px",
  cursor: "pointer",
  border: "1px solid #ddd",
  borderRadius: "3px",
  backgroundColor: "#fff",
  fontSize: "12px",
};

export default RichTextEditor;
