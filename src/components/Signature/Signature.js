import React from "react";
import "./Signature.css";
import SignaturePad from "react-signature-pad-wrapper";
import WrappedButton from "../WrappedButton";
import { ROUTES } from "../../constants/routes";
import CircularProgress from "@material-ui/core/CircularProgress";
import api from "../../api";
import { getEmailTemplate } from "../../templates/handlebar-template/emailTemplate";
import { getPDFTemplate } from "../../templates/handlebar-template/handlebarToPdf";
import html2canvas from "html2canvas";

export default class Signature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: null,
      sent: false,
      submitStarted: false,
      message: null
    };
  }

  printOrderInfo(order) {
    const w = window.open();
    w.document.write(getPDFTemplate(order));
    w.print();
    w.close();
  }

  componentDidMount() {
    window.html2canvas = html2canvas;
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
    this.setState({ submitStarted: true });
    api.orders.addOrder(orderData).then(data => {
      console.log(data);
      if (data.error && data.error.errors && data.error.errors.length) {
        this.setState({
          message: `Error: ${data.error.errors[0].message}`,
          sent: true
        });
        return;
      } else if (data.error || data.status === 0) {
        this.setState({
          message: "Failed to insert information to database",
          sent: true
        });
        return;
      } else {
        this.setState({
          message: "Repair order successfully submitted",
          sent: true
        });
        return;
      }
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
          <div className="signPadANDMessageContainer">
            {!this.state.submitStarted ? (
              <div>
                <div className="signPad">
                  <SignaturePad
                    options={{ minWidth: 1, maxWidth: 3, penColor: "black" }}
                  />
                </div>
              </div>
            ) : (
              <div>
                {!this.state.sent && <CircularProgress />}
                <h3>{this.state.message}</h3>
              </div>
            )}
          </div>
        </div>
        <div className="rimowaBottom">
          {this.state.submitStarted ? (
            <div>
              <WrappedButton href={ROUTES.HOME} label="Main menu" />
              <WrappedButton
                onClick={() => this.printOrderInfo(this.state.orderData)}
                label="Print order info"
              />
            </div>
          ) : (
            <WrappedButton
              onClick={() => this.submitRepairOrder(this.state.orderData)}
              label="Complete by submitting signature"
            />
          )}
        </div>
      </div>
    );
  }
}
