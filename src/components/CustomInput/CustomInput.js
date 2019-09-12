import React from "react";
import TextField from "@material-ui/core/TextField";
const Input = props => {
  const { label, meta = {} } = props;
  const { touched, error, warning, active } = meta;
  return (
    <div className={props.className}> 
    {/* style={{ display: "flex", flexDirection: "column" }} */}
      <TextField
        {...props}
        label={label}
        margin="normal"
      />
      {touched && !active && (error || warning) ? (
        (error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>) ||
        (warning && <div style={{ color: "red", fontSize: "12px" }}>{warning}</div>)
      ) : (
          <div style={{ height: "15px" }} />
        )}
    </div>
  );
};
export default Input;
