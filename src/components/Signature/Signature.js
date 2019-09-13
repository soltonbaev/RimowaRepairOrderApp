import React from "react";
import "./Signature.css";
import { Redirect } from "react-router-dom";
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
      signature: null,
      emptyOrder: false
    };
    this.signaturePad = null;
  }

  async printOrderInfo(order) {
    const w = window.open();
    await w.document.write(getPDFTemplate(order));
    w.print();
    w.close();
  }

  componentDidMount() {
    window.html2canvas = html2canvas;
    if (!window.sessionStorage.length)
      return this.setState({ emptyOrder: true });
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
        localStorage["persist:root"] = "";
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
    return this.state.emptyOrder ? (
      <Redirect to={ROUTES.HOME} />
    ) : (
      <div className="signPadContainer bodyContainer">
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
            <div className="rimowaTitle">sign your name in the box below:</div>
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
              <WrappedButton href={ROUTES.HOME} label="< Main menu" />
              {/* <WrappedButton
                className="printTicket"
                onClick={() => this.printOrderInfo(this.state.orderData)}
                label="Print this ticket"
              /> */}
              {/* <WrappedButton
                className="viewTickets"
                href={ROUTES.REPAIR_ORDERS.PATH}
                label="View Tickets"
              /> */}
              <WrappedButton
                href={ROUTES.NEW_REPAIR_ORDER.NESTED.CLIENT}
                label="New ticket >"
              />
            </div>
          ) : (
            <div className="buttonWrapper">
              <WrappedButton
                href={ROUTES.NEW_REPAIR_ORDER.NESTED.ASSOCIATE}
                label="< Go Back"
              />
              <WrappedButton
                onClick={() => this.signaturePad.clear()}
                label="Clear signpad"
              />
              <WrappedButton
                className="finalSubmitWrapper"
                onClick={() => this.submitSignature()}
                label="SUBMIT THE TICKET"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
