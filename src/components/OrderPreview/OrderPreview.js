import React from "react";
import "./OrderPreview.css";
import uuid from "uuid/v4";
import moment from "moment";
import { ROUTES } from "../../constants/routes";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import { formValueSelector } from "redux-form";
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
    const orderData = {
      uid: uuid(),
      date: new Date(),
      ...clientInfo,
      items: orderItems,
      associateName
    };
    console.log("order", orderData);
    this.setState({ orderData });
  }

  mockData = {
    uid: "f86f8794-6d11-4665-9c98-4dc518c930ab",
    date: "2019-08-27T21:35:52.126Z",
    firstName: "Denys",
    lastName: "Andreiev",
    email: "denisandreev64@gmail.com",
    phone: "9292532329",
    companyName: "company name",
    shippingAddress: "1914 Bay Ridge parkway apt. 1R",
    shipWhenComplete: true,
    items: [
      {
        needsBy: "2019-08-29T21:34:00.000Z",
        serialNumber: "123",
        lockCombo: "1234",
        model: "model1",
        reasonForRepair: "broken wheel",
        warranty: true,
        uid: "7902b9f6-79ad-4cdc-aac3-ff23f3f2361e"
      },
      {
        needsBy: "2019-08-30T21:35:00.000Z",
        serialNumber: "12345",
        lockCombo: "5689",
        model: "model2",
        reasonForRepair: "handle broken",
        warranty: true,
        uid: "902f4ae5-85bf-4094-a087-d32b9b94bc01"
      }
    ],
    associateName: "associate 123"
  };

  render() {
    if (!this.state.orderData) return null;
    const {
      date,
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
            >{`Order created: ${moment(date).format(
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
          </Card>
        </div>
      </div>
    );
  }
}
