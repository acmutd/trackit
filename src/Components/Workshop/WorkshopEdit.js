import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from '@material-ui/core/FormControl';


/**
 * Opens up a dialog modal for the workshop data to be edited or a new workshop informatin to be added
 */
class WorkshopEdit extends React.Component {
  constructor(props) {
    super(props);

    // all set to null just for readability to see which fields will get filled out
    this.state = {
        Workshop: {
            Workshop_ID: null,
            Workshop_Name: null,
            Level_Titles: [null],
            Level_Descriptions: [null],
            Number_Of_Levels: 1,
            Day: null,
            Date: null,
            Month: null,
            Year: null
        }
    };
    this.initializeState = this.initializeState.bind(this);
    this.cancel = this.cancel.bind(this);
    this.submit = this.submit.bind(this);
  }

  initializeState() {
      //if it is null then a new workshop is being created else an existing  one is being updated
      if(this.props.workshop != null) {
          this.setState({
            Workshop: this.props.workshop
          });
      }
  }

  cancel() {
      this.props.submit(this.state.Workshop, false);
  }
  submit() {
      this.props.submit(this.state.Workshop, true);
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.isOpen}
          onClose={this.cancel}
          onEnter={this.initializeState}
          maxWidth="lg"
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
            <Button onClick={this.cancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.submit} color="secondary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default WorkshopEdit;
