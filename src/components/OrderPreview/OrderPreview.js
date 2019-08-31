import React from "react";
import "./OrderPreview.css";
import uuid from "uuid/v4";
import moment from "moment";
import { ROUTES } from "../../constants/routes";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import api from "../../api";
import WrappedButton from "../WrappedButton";

export default class OrderPreview extends React.Component {
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
    console.log(orderUID);
    const orderData = {
      uid: orderUID,
      creationDate: new Date(),
      ...clientInfo,
      items: orderItems,
      associateName
    };
    console.log("order", orderData);
    this.setState({ orderData });
  }

  submitRepairOrder = orderData => {
    api.orders.addOrder(orderData).then(data => {
      console.log(data);
    });
  };

  mockData = {
    uid: "dcd2b060-c7b7-4d8d-94f3-28ff851d8ca7",
    creationDate: "2019-08-28T23:38:33.324Z",
    firstName: "Denis",
    lastName: "Andreiev",
    email: "denis@gmail.com",
    phone: "123456789",
    companyName: "Company Name",
    shippingAddress: "Shipping Address 1",
    shipWhenComplete: true,
    customerId: "c3853e27-f827-4ebb-a26d-a6979fb54832",
    items: [
      {
        needsBy: "2019-08-30T23:31:00.000Z",
        serialNumber: "123454321",
        lockCombo: "9876",
        model: "SuitCase1",
        reasonForRepair: "broken wheel",
        warranty: true,
        uid: "2f0da2b7-29ab-4b02-9e52-20537d52db65",
        ownerId: "c3853e27-f827-4ebb-a26d-a6979fb54832"
      },
      {
        needsBy: "2019-08-29T23:32:00.000Z",
        serialNumber: "321456",
        lockCombo: "3214",
        model: "SuitCase2",
        reasonForRepair: "Broken lock",
        warranty: false,
        uid: "abf1e260-553f-44e4-b0e0-1a1ce354dcfc",
        ownerId: "c3853e27-f827-4ebb-a26d-a6979fb54832"
      }
    ],
    associateName: "Asociate Name "
  };

  render() {
    if (!this.state.orderData) return null;
    const {
      creationDate,
      firstName,
      lastName,
      email,
      phone,
      companyName,
      shippingAddress,
      shipWhenComplete,
      items
    } = this.state.orderData;
    return (
      <div className="previewContainer">
        <div className="orderPreviewTitle">REPAIR ORDER PREVIEW</div>
        <div className="clientInfo row">
          <Card className="orderCard">
            <Typography color="text" gutterBottom>
              Customer info:
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
            >{`Order created: ${moment(creationDate).format(
              "MMM DD YYYY"
            )}`}</Typography>
            <Typography
              color="textSecondary"
              gutterBottom
            >{`${firstName} ${lastName}`}</Typography>
            <Typography color="textSecondary" gutterBottom>
              {email}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {phone}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {shippingAddress}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {shipWhenComplete}
            </Typography>
            <div className="row">
              {items.map((item, index) => {
                const {
                  needsBy,
                  serialNumber,
                  lockCombo,
                  model,
                  reasonForRepair,
                  warranty,
                  uid
                } = item;
                return (
                  <Card className="orderCard">
                    <Typography color="text" gutterBottom>
                      {`Item-${index + 1}`}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {moment(needsBy).format("MMM DD YYYY")}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {serialNumber}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {lockCombo}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {model}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {reasonForRepair}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {warranty}
                    </Typography>
                  </Card>
                );
              })}
            </div>
            <WrappedButton
              label="Submit repair order"
              onClick={() => this.submitRepairOrder(this.state.orderData)}
            />
          </Card>
        </div>
      </div>
    );
  }
}
