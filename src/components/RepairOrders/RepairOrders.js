import React from "react";
import "./RepairOrders.css";
import OrdersTable from "../OrdersTable";
import { getOrders } from "../../store/reducer";
export default class RepairOrders extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getOrders());
  }
  render() {
    const { orders } = this.props;
    console.log(orders);
    return (
      <div className="tableContainer">
        <div className="tableLabel">REPAIR ORDERS:</div>
        <OrdersTable className="table" orders={orders} />
      </div>
    );
  }
}
