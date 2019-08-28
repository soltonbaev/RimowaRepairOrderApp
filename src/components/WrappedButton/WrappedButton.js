import React from "react";
import "./WrappedButton.css";
import Button from "@material-ui/core/Button";

const WrappedButton = props => (
  <div className={props.className}>
    <Button variant="outlined" {...props}>
      {props.label}
    </Button>
  </div>
);

export default WrappedButton;
