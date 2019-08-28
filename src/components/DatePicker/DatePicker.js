import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const DatePicker = ({ value, onChange, label }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      margin="normal"
      id="date-picker-inline"
      label={label}
      value={value}
      onChange={onChange}
      KeyboardButtonProps={{
        "aria-label": "change date"
      }}
    />
  </MuiPickersUtilsProvider>
);
export default DatePicker;
