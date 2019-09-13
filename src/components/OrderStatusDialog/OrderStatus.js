import React from "react";
import {
  Popover,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";

export default class OrderStatus extends React.Component {
  onChange = e => {
    const newStatus = e.target.value;
    const { uid, onClose, changeStatus } = this.props;
    changeStatus(newStatus, uid);
    onClose();
  };

  render() {
    const { anchor, selectedValue, onClose } = this.props;
    return (
      <Popover
        className="confirmDelete"
        open={Boolean(anchor)}
        onClose={onClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        anchorEl={anchor}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Paper>
          <RadioGroup defaultValue={selectedValue}>
            <FormControlLabel
              value="NEW"
              label="New"
              control={<Radio onChange={this.onChange} />}
            />
            <FormControlLabel
              value="IN_PROGRESS"
              label="In progress"
              control={<Radio onChange={this.onChange} />}
            />
            <FormControlLabel
              value="COMPLETED"
              label="Completed"
              control={<Radio onChange={this.onChange} />}
            />
          </RadioGroup>
        </Paper>
      </Popover>
    );
  }
}
