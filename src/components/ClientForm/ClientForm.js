import React from "react";
import "./ClientForm.css";
import { ROUTES } from "../../constants/routes";
import { formValueSelector } from "redux-form";
import WrappedButton from "../WrappedButton";
import Form from "./Form";
import uuid from "uuid";

export default class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false
    };
  }

  handleSubmit = () => {
    const selector = formValueSelector("client");
    const { state } = this.props;
    let clientInfo = selector(
      state,
      "firstName",
      "lastName",
      "email",
      "phone",
      "companyName",
      "shippingAddress",
      "shipWhenComplete"
    );
    clientInfo = {
      ...clientInfo,
      customerId: uuid(),
      shipWhenComplete:
        clientInfo.shipWhenComplete !== undefined || null || ""
          ? clientInfo.shipWhenComplete
          : false
    };
    window.sessionStorage.clientInfo = JSON.stringify(clientInfo);
    window.sessionStorage.orderUID = uuid();
    console.log("clientInfo", clientInfo);
    this.setState({ saved: true });
  };

  render() {
    return (
      <div className="formContainer clientFormContainer">
        
        <div className="rimowaTop">
          <div className="rimowaLogoText">RIMOWA</div>
          <div className="rimowaSubtitle">Client Care</div>
        </div>
        <div className="rimowaMid">
          <div className="rimowaTitle">Client to complete:</div>
          <Form />
        </div>
        <div className="rimowaBottom"><WrappedButton
        onClick={this.handleSubmit}
        href={ROUTES.NEW_REPAIR_ORDER.NESTED.ASSOCIATE}
        label="Save and continue"
        /></div>
      </div >
    );
  }
}
