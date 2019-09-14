import React from "react";
import "./RepairOrders.css";
import { Redirect } from "react-router-dom";
import OrdersTable from "../OrdersTable";
import { getOrders } from "../../store/reducer";
import WrappedButton from "../WrappedButton";
import { API_URL } from "../../config";
import { ROUTES } from "../../constants/routes";

export default class RepairOrders extends React.Component {
  state = {
    hideExportNew: true
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getOrders());
  }

  componentDidUpdate() {
    const { orders } = this.props;
    if (!orders) return;
    if (orders.map(order => order.orderStatus).includes("NEW")) {
      this.state.hideExportNew !== false &&
        this.setState({ hideExportNew: false });
    } else {
      this.state.hideExportNew !== true &&
        this.setState({ hideExportNew: true });
    }
  }

  render() {
    const { orders, dispatch, ordersLoading, authenticated } = this.props;
    if (!authenticated) return <Redirect to={ROUTES.HOME} />;
    return (
      <div className="tableContainer">
        <div className="rimowaLogoText">RIMOWA</div>
        <div className="rimowaSubtitle">
          <h3>Client Care</h3>
        </div>
        <div className="tableWrapper">
          <div className="labelButtonContainer">
            <div className="homeButton">
              <WrappedButton href={ROUTES.HOME} label="Main menu" />
            </div>
            <div className="tableLabel">REPAIR TICKETS</div>
            <div className="exportButton">
              <WrappedButton
                disabled={this.state.hideExportNew}
                onClick={() => setTimeout(() => dispatch(getOrders()), 2000)}
                href={`${API_URL}/exportNew`}
                label="Export NEW records"
              />
            </div>
          </div>
          <OrdersTable
            className="table"
            orders={orders}
            ordersLoading={ordersLoading}
          />
        </div>
      </div>
    );
  }
}
