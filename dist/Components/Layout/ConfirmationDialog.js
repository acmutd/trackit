"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const core_1 = require("@material-ui/core");
/**
 * This component represents a modal which pops up when needing to confirm deletion, no other button uses this component yet
 */
class ConfirmationDialog extends react_1.default.Component {
    constructor() {
        super(...arguments);
        /**
         * This function will get executed when the dialog is closed in any possible way except clicking the agree button
         */
        this.handleDeny = () => {
            this.props.handleDialogResponse(false);
        };
        /**
         * Person clicks confirm
         */
        this.handleAccept = () => {
            this.props.handleDialogResponse(true);
        };
    }
    /**
     * The text for what appears in the confirmation dialog gets passed in as props
     * This dialog is all material-ui
     */
    render() {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(core_1.Dialog, { open: this.props.isOpen, onClose: this.handleDeny, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
                react_1.default.createElement(core_1.DialogTitle, { id: "alert-dialog-title" }, this.props.titleText),
                react_1.default.createElement(core_1.DialogContent, null,
                    react_1.default.createElement(core_1.DialogContentText, { id: "alert-dialog-description" }, this.props.messageText)),
                react_1.default.createElement(core_1.DialogActions, null,
                    react_1.default.createElement(core_1.Button, { onClick: this.handleDeny, color: "primary" }, "Cancel"),
                    react_1.default.createElement(core_1.Button, { onClick: this.handleAccept, color: "secondary", autoFocus: true }, "Confirm")))));
    }
}
exports.default = ConfirmationDialog;
//# sourceMappingURL=ConfirmationDialog.js.map