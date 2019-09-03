import React from "react";
import "./Signature.css";
import SignaturePad from "react-signature-pad-wrapper";
import WrappedButton from "../WrappedButton";
import { ROUTES } from "../../constants/routes";
import api from "../../api";
import { getEmailTemplate } from "../../templates/handlebar-template/emailTemplate";

export default class Signature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: null
    };
  }

  componentDidMount() {
    const orderItems = JSON.parse(window.sessionStorage.itemsList);
    const clientInfo = JSON.parse(window.sessionStorage.clientInfo);
    const associateName = window.sessionStorage.associateName;
    const orderUID = window.sessionStorage.orderUID;
    const orderData = {
      uid: orderUID,
      creationDate: new Date(),
      ...clientInfo,
      items: orderItems,
      associateName
    };

    const emailTemplate = getEmailTemplate(orderData);
    orderData.emailTemplate = emailTemplate;
    this.setState({ orderData });
  }

  submitRepairOrder = orderData => {
    api.orders.addOrder(orderData).then(data => {
      console.log(data);
    });
  };
  render() {
    return (
      <div className="signPadContainer">
        <div className="rimowaTop">
        <div className="rimowaLogoText">RIMOWA</div>
        <div className="rimowaSubtitle">Client Care</div>
        <div className="rimowaTitle">Sign your name below:</div>
        </div>
        <div className="rimowaMid">
        
        <div className="signPad">
          <SignaturePad
            options={{ minWidth: 1, maxWidth: 3, penColor: "black" }}
          />
        </div>
        </div>
        <div className="rimowaBottom">
        <WrappedButton
          onClick={() => this.submitRepairOrder(this.state.orderData)}
          label="Complete by submitting signature"
        />
        </div>
      </div>
    );
  }
}
