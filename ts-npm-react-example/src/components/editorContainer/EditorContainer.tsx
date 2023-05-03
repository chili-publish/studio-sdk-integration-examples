import { FC } from "react";
import "./EditorContainer.css";

type EditorContainerProps = {
  editorId: string;
};

const EditorContainer: FC<EditorContainerProps> = (props) => {
  const { editorId } = props;
  return <div className="editor-container" id={editorId}></div>;
};

export default EditorContainer;
