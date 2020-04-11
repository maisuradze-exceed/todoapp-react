import React, { Component } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from "@material-ui/core/";
import Edit from "@material-ui/icons/Edit";

class FormDialog extends Component {
  render() {
    return (
      <div>
        <Button
          className="btn-del"
          variant="contained"
          color="primary"
          startIcon={<Edit />}
        >
          Edit
        </Button>
        <Dialog aria-labelledby="form-dialog-title">
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Edit"
              type="text"
              autoComplete="off"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default FormDialog;
