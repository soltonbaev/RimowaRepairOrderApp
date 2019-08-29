import React from "react";
import TextField from "@material-ui/core/TextField";
const Input = props => (
  <div className={props.className}>
    <TextField {...props} margin="normal" />
  </div>
);
export default Input;
