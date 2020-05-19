"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_draft_wysiwyg_1 = require("react-draft-wysiwyg");
const draft_js_1 = require("draft-js");
const draftjs_to_html_1 = require("draftjs-to-html");
require("react-draft-wysiwyg/dist/react-draft-wysiwyg.css");
const core_1 = require("@material-ui/core");
class WorkshopEditor extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.onEditorStateChange = (editorState) => {
            console.log("in editor state change");
            this.setState({
                editorState: editorState,
            });
        };
        var defaultState;
        console.log(this.props.content);
        if (this.props.content) {
            const blocksFromHTML = draft_js_1.convertFromHTML(this.props.content);
            const state = draft_js_1.ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
            defaultState = draft_js_1.EditorState.createWithContent(state);
        }
        else
            defaultState = draft_js_1.EditorState.createEmpty();
        this.state = {
            editorState: defaultState,
            savedState: null,
        };
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.saveCurrentContent = this.saveCurrentContent.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
    }
    saveCurrentContent() {
        // var text = this.state.editorState.getCurrentContent().getBlocksAsArray();
        // var finalText;
        // text.map((item) => {
        // finalText = item.getText() + finalText});
        // console.log(finalText)
        var rawContentState = draft_js_1.convertToRaw(this.state.editorState.getCurrentContent());
        var markup = draftjs_to_html_1.default(rawContentState);
        console.log("marukup: ");
        console.log(markup);
        this.setState({
            savedState: markup,
        }, this.closeWindow);
    }
    closeWindow() {
        console.log("closing window");
        this.props.closeWindow(this.state.savedState);
    }
    render() {
        const { editorState } = this.state;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(react_draft_wysiwyg_1.Editor, { editorState: editorState, 
                //initialContentState={this.state.contentState}
                //toolbarClassName="toolbarClassName"
                wrapperClassName: "demo-wrapper", editorClassName: "demo-editor", placeholder: "Start typing here", onEditorStateChange: this.onEditorStateChange }),
            react_1.default.createElement(core_1.Button, { onClick: this.saveCurrentContent }, "Save Changes"),
            react_1.default.createElement(core_1.Button, { onClick: this.closeWindow }, "Close Window")));
    }
}
exports.default = WorkshopEditor;
//# sourceMappingURL=WorkshopEditor.js.map