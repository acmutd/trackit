import * as React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromHTML, ContentState } from "draft-js";
// import draftToHtml from "draftjs-to-html";
import { Button, Input } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import draftToHtml from "draftjs-to-html"; //ran into error and solved using --> https://stackoverflow.com/questions/57960016/what-does-can-only-be-default-imported-using-the-esmoduleinterop-flag-mean
interface WorkshopEditorProps {
  closeWindow(data: any): void;
  content: string;
}

interface WorkshopEditorState {
  editorState: EditorState;
  savedState: string;
  uploadedFiles: File[];
}

class WorkshopEditor extends React.Component<WorkshopEditorProps, WorkshopEditorState> {
  constructor(props: WorkshopEditorProps) {
    super(props);
    let defaultState: EditorState;
    console.log(this.props.content);
    if (this.props.content) {
      const blocksFromHTML = convertFromHTML(this.props.content);
      const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
      defaultState = EditorState.createWithContent(state);
    } else defaultState = EditorState.createEmpty();

    this.state = {
      editorState: defaultState,
      savedState: "",
      uploadedFiles: [],
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.saveCurrentContent = this.saveCurrentContent.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
  }

  onEditorStateChange = (editorState: EditorState): void => {
    this.setState({
      editorState: editorState,
    });
  };

  saveCurrentContent(): void {
    const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    this.setState(
      {
        savedState: markup,
      },
      this.closeWindow
    );
  }

  uploadFiles = (files: File[]): void => {
    this.setState({
      uploadedFiles: files,
    });
  };

  closeWindow(): void {
    this.props.closeWindow({
      content: this.state.savedState,
      file: this.state.uploadedFiles,
    });
  }

  render(): JSX.Element {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          //initialContentState={this.state.contentState}
          //toolbarClassName="toolbarClassName"
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          placeholder="Start typing here"
          onEditorStateChange={this.onEditorStateChange}
          //onContentStateChange={this.onContentStateChange}
        />
        <hr />
        <DropzoneArea onChange={this.uploadFiles} />
        <br />
        <Button onClick={this.saveCurrentContent}>Save Changes</Button>
        <Button onClick={this.closeWindow}>Close Window</Button>
      </div>
    );
  }
}

export default WorkshopEditor;
