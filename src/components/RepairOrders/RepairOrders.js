import React from "react";
import "./RepairOrders.css";
import OrdersTable from "../OrdersTable";
import { getCustomers } from "../../store/reducer";

export default class RepairOrders extends React.Component {
  componentDidMount() {
    this.props.dispatch(getCustomers());
  }
  render() {
    console.log(this.props.rows);
    return (
      <div>
        REPAIR ORDERS:
        <OrdersTable rows={this.props.rows} />
      </div>
    );
  }
}
