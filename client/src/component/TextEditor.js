import { styled } from "styled-components";
import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";


const TextEditor = styled.div`
  border-radius: 4px;
  border: 1px solid var(--black-200);
  box-shadow: none;
  position: relative;
`;

function EditorBox({setContent}) {
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["image"],
    ["code"],
    ["scrollSync"],
  ];

  const editorRef = useRef();
  const onChange = () => {
    const data = editorRef.current.getInstance().getMarkdown();
    setContent(data);
  };
  return (
    <div>
      <TextEditor>
        <Editor
          ref={editorRef}
          initialValue=" "
          previewStyle="vertical"
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          plugins={[colorSyntax]}
          toolbarItems={toolbarItems}
          onChange={onChange}
        />
      </TextEditor>
    </div>
  );
}
export default EditorBox;
