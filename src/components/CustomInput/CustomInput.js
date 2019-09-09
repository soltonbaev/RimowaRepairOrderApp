import React from "react";
import TextField from "@material-ui/core/TextField";
const Input = props => {
  const { label, meta = {} } = props;
  const { touched, error, warning } = meta;
  return (
    <div className={props.className}>
      <TextField
        error={Boolean(touched && (error || warning))}
        {...props}
        label={touched && (error || warning) ? error || warning : label}
        margin="normal"
      />
    </div>
  );
};
export default Input;
