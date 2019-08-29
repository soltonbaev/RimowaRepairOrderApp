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
      <div>
        REPAIR ORDERS:
        <OrdersTable orders={orders} />
      </div>
    );
  }
}
