import * as React from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
// import draftToHtml from "draftjs-to-html";
import { Button } from "@material-ui/core";
import draftToHtml = require("draftjs-to-html"); //ran into error and solved using --> https://stackoverflow.com/questions/57960016/what-does-can-only-be-default-imported-using-the-esmoduleinterop-flag-mean

interface WorkshopEditorProps {
  closeWindow(newText: string): void;
  content: string;
}

interface WorkshopEditorState {
  editorState: EditorState;
  savedState: string;
}

class WorkshopEditor extends React.Component<
  WorkshopEditorProps,
  WorkshopEditorState
> {
  constructor(props: WorkshopEditorProps) {
    super(props);
    var defaultState: EditorState;
    console.log(this.props.content);
    if (this.props.content) {
      const blocksFromHTML = convertFromHTML(this.props.content);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      defaultState = EditorState.createWithContent(state);
    } else defaultState = EditorState.createEmpty();

    this.state = {
      editorState: defaultState,
      savedState: "",
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.saveCurrentContent = this.saveCurrentContent.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
  }

  onEditorStateChange = (editorState: any) => {
    console.log("in editor state change");
    this.setState({
      editorState: editorState,
    });
  };

  saveCurrentContent() {
    var rawContentState = convertToRaw(
      this.state.editorState.getCurrentContent()
    );
    var markup = draftToHtml(rawContentState);
    console.log("marukup: ");
    console.log(markup);
    this.setState(
      {
        savedState: markup,
      },
      this.closeWindow
    );
  }

  closeWindow() {
    console.log("closing window");
    this.props.closeWindow(this.state.savedState);
  }

  render() {
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
        <Button onClick={this.saveCurrentContent}>Save Changes</Button>
        <Button onClick={this.closeWindow}>Close Window</Button>
      </div>
    );
  }
}

export default WorkshopEditor;
