import React, { Component } from "react";
import { Button } from "@material-ui/core";

class Buttons extends Component {
  render() {
    return (
      <div className="buttons">
        <div>
          <Button
            variant="outlined"
            className="btn"
            size="large"
            color="primary"
          >
            Uncomplete Tasks
          </Button>
        </div>
        <div className="margin-top">
          <Button
            variant="contained"
            className="btn"
            size="large"
            color="secondary"
          >
            Remove Completed Tasks
          </Button>
        </div>
      </div>
    );
  }
}

export default Buttons;
