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
import classnames from "classnames";

export default class Signature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: null,
      sent: false,
      submitStarted: false,
      message: null,
      failed: false,
      signature: null
    };
    this.signaturePad = null;
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
      if (data.error && data.error.errors && data.error.errors.length) {
        this.setState({
          message: `Error: ${data.error.errors[0].message}`,
          message2: "Something is wrong. Contact your system administrator",
          sent: true,
          failed: true
        });
        return;
      } else if (data.status === 0) {
        this.setState({
          message: "Failed to submit ticket",
          message2: "Something is wrong. Contact your system administrator",
          sent: true,
          failed: true
        });
        return;
      } else {
        this.setState({
          message: "Ticket has been submitted sucessfully",
          message2: "Go to 'View Repair Tickets' page to print out the ticket",
          sent: true
        });
        window.sessionStorage.clear();
        return;
      }
    });
  };

  submitSignature = () => {
    if (this.signaturePad.isEmpty())
      return new Error("Signature pad is empty!");
    const signature = this.signaturePad.toDataURL();
    const orderDataWithSignature = { ...this.state.orderData, signature };
    this.submitRepairOrder(orderDataWithSignature);
  };

  render() {
    return (
      <div className="signPadContainer">
        <div className="rimowaTop">
          <div className="rimowaLogoText">RIMOWA</div>
          <div className="rimowaSubtitle">Client Care</div>
          {this.state.submitStarted ? (
            <div
              className={classnames("rimowaTitle", {
                statusMsgSuccess: !this.state.failed,
                statusMsgFailed: this.state.failed
              })}
            >
              {this.state.message}
            </div>
          ) : (
            <div className="rimowaTitle">Sign your name below:</div>
          )}
        </div>
        <div className="rimowaMid">
          {!this.state.submitStarted ? (
            <div className="signPad">
              <SignaturePad
                ref={ref => (this.signaturePad = ref)}
                options={{ minWidth: 1, maxWidth: 3, penColor: "black" }}
              />
            </div>
          ) : (
            <div className="statusMessageContainer">
              <div className="statusMessage2">
                {!this.state.sent && <CircularProgress />} {this.state.message2}
              </div>
            </div>
          )}
        </div>
        <div className="rimowaBottom">
          {this.state.submitStarted ? (
            <div className="buttonWrapper">
              <WrappedButton href={ROUTES.HOME} label="Main menu" />
              <WrappedButton
                href={ROUTES.REPAIR_ORDERS.PATH}
                label="View Tickets"
              />
              <WrappedButton
                href={ROUTES.NEW_REPAIR_ORDER.NESTED.CLIENT}
                label="New ticket"
              />
              <WrappedButton
                onClick={() => this.printOrderInfo(this.state.orderData)}
                label="Print this ticket"
              />
            </div>
          ) : (
            <WrappedButton
              onClick={() => this.submitSignature()}
              label="Complete by submitting signature"
            />
          )}
        </div>
      </div>
    );
  }
}
