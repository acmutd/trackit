import * as React from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from "@material-ui/core";

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
  constructor(props: any) {
    super(props);
    var defaultState: any;
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
      savedState: null,
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
    // var text = this.state.editorState.getCurrentContent().getBlocksAsArray();
    // var finalText;
    // text.map((item) => {
    // finalText = item.getText() + finalText});
    // console.log(finalText)

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
