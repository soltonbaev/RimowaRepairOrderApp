import React, { Component } from "react";
import WrappedButton from "../WrappedButton";
import { isActionAlowed } from "../../utils";
import Input from "../CustomInput";
import "./ConfirmDialog.css";

export default class ConfirmDialog extends Component {
  state = {
    confirmDisabled: false,
    password: ""
  };

  componentDidMount() {
    this.props.confirmWithInput && this.setState({ confirmDisabled: true });
  }

  onPassChange = e =>
    this.setState({ password: e.target.value, error: false, errorText: null });

  submitPassword = () => {
    if (isActionAlowed(this.state.password)) {
      this.setState({
        confirmDisabled: false,
        password: "",
        error: false,
        errorText: null
      });
    } else {
      this.setState({
        confirmDisabled: true,
        error: true,
        errorText: "Invalid password"
      });
    }
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
        <h2 style->{title}</h2>
        <p>{message}</p>
        {confirmWithInput && (
          <div className="buttonContainer">
            <Input
              type="password"
              error={this.state.error}
              label={this.state.errorText || "Enter the password"}
              onChange={this.onPassChange}
            />
            <div className="submitWrapper">
              
            <WrappedButton className="passSubmitButton" label="submit" onClick={this.submitPassword} />
            </div>
          </div>
        )}
        <div className="buttonContainer">
        <div className="dgButtonWrapper">
          <WrappedButton
            disabled={this.state.confirmDisabled}
            label={confirmText}
            onClick={onConfirm}
          />
          </div>
          <div className="dgButtonWrapper">
          <WrappedButton label={cancelText} onClick={onCancel} />
          </div>
        </div>
      </div>
    );
  }
}
