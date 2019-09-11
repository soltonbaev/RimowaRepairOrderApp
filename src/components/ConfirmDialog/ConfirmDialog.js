import React, { Component } from "react";
import WrappedButton from "../WrappedButton";
import { isActionAlowed } from "../../utils";
import Input from "../CustomInput";
import "./ConfirmDialog.css";

export default class ConfirmDialog extends Component {
  state = {
    confirmDisabled: false
  };

  componentDidMount() {
    this.props.confirmWithInput && this.setState({ confirmDisabled: true });
  }

  changePassword = e => {
    isActionAlowed(e.target.value) &&
      this.setState({
        confirmDisabled: false
      });
  };

  render() {
    const {
      title,
      onConfirm,
      message,
      onCancel,
      confirmText,
      cancelText,
      confirmWithInput
    } = this.props;
    return (
      <div className="confirm">
        <h2>{title}</h2>
        <h3>{message}</h3>
        {confirmWithInput && (
          <div className="buttonContainer">
            <Input
              type="password"
              label="Enter action password"
              onChange={this.changePassword}
            />
          </div>
        )}
        <div className="buttonContainer">
          <WrappedButton
            disabled={this.state.confirmDisabled}
            label={confirmText}
            onClick={onConfirm}
          />
          <WrappedButton label={cancelText} onClick={onCancel} />
        </div>
      </div>
    );
  }
}
