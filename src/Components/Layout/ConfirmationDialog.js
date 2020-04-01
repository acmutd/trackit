import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class ConfirmationDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleDeny = this.handleDeny.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
  }

  /**
   * This function will get executed when the dialog is closed in any possible way except clicking the agree button
   */
  handleDeny() {
    this.props.handleDialogResponse(false);
  }

  /**
   * Person clicks confirm
   */
  handleAccept() {
    this.props.handleDialogResponse(true);
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.isOpen}
          onClose={this.handleDeny}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.props.titleText}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.messageText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeny} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAccept} color="secondary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmationDialog;
