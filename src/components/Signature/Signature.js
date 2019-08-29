import React from "react";
import "./Signature.css";
import SignaturePad from "react-signature-pad-wrapper";
import WrappedButton from "../WrappedButton";
import { ROUTES } from "../../constants/routes";

export default class Signature extends React.Component {
  render() {
    return (
      <div className="signPadContainer">
        <div>Sign your name below</div>
        <div className="signPad">
          <SignaturePad
            options={{ minWidth: 1, maxWidth: 3, penColor: "black" }}
          />
        </div>
        <WrappedButton
          href={ROUTES.HOME}
          label="Complete by submitting signature"
        />
      </div>
    );
  }
}
