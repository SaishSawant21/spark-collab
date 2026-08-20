import { useContext, useEffect, useRef } from "react";
import { BoardContext } from "../../../context/BoardContext";
import useTextEditor from "../../hooks/useTextEditor";

const TextEditor = () => {
  const {
    editingTextId,
    editingText,
    setEditingText,
    finishEditing,
  } = useTextEditor();

  const {
    elements,
    scale,
    stagePosition,
  } = useContext(BoardContext);

  const textareaRef = useRef(null);

  const element = elements.find(
    (item) => item.id === editingTextId
  );

  useEffect(() => {
    if (editingTextId) {
      textareaRef.current?.focus();
      textareaRef.current?.select();
    }
  }, [editingTextId]);

  if (!element) return null;

  const {
    x,
    y,
    width = 200,
    fontSize = 20,
    fill,
  } = element.element_data;

  return (
    <textarea
      ref={textareaRef}
      value={editingText}
      onChange={(e) =>
        setEditingText(e.target.value)
      }
      onBlur={finishEditing}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          finishEditing();
        }
      }}
      style={{
        position: "absolute",

        left:
          stagePosition.x + x * scale,

        top:
          stagePosition.y + y * scale,

        width: width * scale,

        minHeight:
          fontSize * 1.5 * scale,

        fontSize:
          fontSize * scale,

        padding: 0,
        margin: 0,

        border: "1px solid #1677ff",
        outline: "none",

        resize: "none",

        background: "white",

        color: fill || "#000",

        zIndex: 100,
      }}
    />
  );
};
export default TextEditor;
