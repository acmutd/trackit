import React from "react";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
  } from "@material-ui/core";

class WorkshopEditor extends React.Component {
    constructor(props) 
    {
        super(props)
        var defaultState;
        if(this.props.content)
        {
            defaultState = EditorState.createWithContent(this.props.content)
        }
        else defaultState = EditorState.createEmpty();

        this.state = {
            editorState: defaultState,
            savedState: null
        }
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
        this.saveCurrentContent = this.saveCurrentContent.bind(this)
        this.closeWindow = this.closeWindow.bind(this)
    }   


    onEditorStateChange = (editorState) => {
        console.log('in editor state change')
        this.setState({
          editorState: editorState
        });
      };

    saveCurrentContent()
    {
        console.log('in save curr content')
        
        var text = this.state.editorState.getCurrentContent().getBlocksAsArray();
        var finalText;
        text.map((item) => {
        finalText = item.getText() + finalText});
        console.log(finalText)

        var rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
        var markup = draftToHtml(
            rawContentState,  
          );
          this.setState({
              savedState: markup
          })
          console.log('marukup: ')
          console.log(markup)
    }

    closeWindow()
    {
        console.log('closing window')
        this.props.closeWindow(this.state.savedState);
    }

    render()
    {
        
        const { editorState } = this.state;
        return(
            <div>
            <Editor
                editorState={this.state.editorState}
                //initialContentState={this.state.contentState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                placeholder="Start typing here"
                onEditorStateChange={this.onEditorStateChange}
                //onContentStateChange={this.onContentStateChange}
            />
            <Button
            onClick = {this.saveCurrentContent}>
                Save Changes
            </Button>
            <Button
            onClick = {this.closeWindow} >
                Close Window
            </Button>
        </div>
        )
    }

}

export default WorkshopEditor;