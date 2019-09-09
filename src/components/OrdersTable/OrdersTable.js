import React from "react";
import classnames from "classnames";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";

import OrderPreview from "../OrderPreviewTemplate";

import "./OrdersTable.css";
import { deleteOrders } from "../../store/reducer";
import ConfirmDialog from "../ConfirmDialog";
import { Popover } from "@material-ui/core";
import WrappedButton from "../WrappedButton";
import { getHTMLDBTemplate } from "../../templates/handlebar-template/handlebarPrintHMTL";

const TABLE_COLUMNS = [
  "Order placed",
  "Name",
  "Email",
  "Phone#",
  "Company name",
  "Items in order",
  "Order status",
  "Actions"
];

export default class CustomizedTables extends React.Component {
  state = {
    anchorEl: null,
    orderToPreview: null,
    deleteConfirmAnchor: null,
    deletingUID: null
  };

  showDeleteConfirm = (currentTarget, uid) =>
    this.setState({ deleteConfirmAnchor: currentTarget, deletingUID: uid });
  closeDeleteConfirm = () =>
    this.setState({ deleteConfirmAnchor: null, deletingUID: null });

  showPreview = (anchorEl, order) =>
    this.setState({ anchorEl, orderToPreview: order });

  handleClose = () => this.setState({ anchorEl: null, orderToPreview: null });

  async printOrderInfo(order) {
    const w = window.open();
    await w.document.write(getHTMLDBTemplate(order));
    w.print();
    w.close();
  }

  render() {
    const { orders, dispatch, ordersLoading } = this.props;
    return !ordersLoading && orders.length ? (
      <Paper className="root">
        <Popover
          className="confirmDelete"
          open={Boolean(this.state.deleteConfirmAnchor)}
          onClose={this.closeDeleteConfirm}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <ConfirmDialog
            title="Authorized action"
            onConfirm={e => {
              e.stopPropagation();
              this.closeDeleteConfirm();
              dispatch(deleteOrders(this.state.deletingUID));
            }}
            message="Deleting order requires confirmation!"
            onCancel={this.closeDeleteConfirm}
            confirmText="Confirm"
            cancelText="Cancel"
            confirmWithInput={true}
          />
        </Popover>
        <Popover
          className="popoverContainer"
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <div className="dbPrintPreview">
            <WrappedButton
              className="printButton"
              onClick={() => this.printOrderInfo(this.state.orderToPreview)}
              label="Print"
            />
            <OrderPreview order={this.state.orderToPreview} />
          </div>
        </Popover>
        <Table className="table">
          <TableHead className="head">
            <TableRow>
              {TABLE_COLUMNS.map(column => (
                <TableCell
                  key={column}
                  className="table"
                  style={{ color: "white" }}
                  align="center"
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow
                key={order.uid}
                style={{
                  backgroundColor:
                    order.orderStatus === "NEW"
                      ? "rgba(182, 234, 231, 0.87)"
                      : "white"
                }}
                className="tableRow"
                onClick={e => this.showPreview(e.currentTarget, order)}
              >
                <TableCell align="center">
                  {moment(order.creationDate).format("MMM DD YYYY")}
                </TableCell>
                <TableCell align="center">
                  {`${order.customer.firstName} ${order.customer.lastName}`}
                </TableCell>
                <TableCell align="center">{order.customer.email}</TableCell>
                <TableCell align="center">{order.customer.phone}</TableCell>
                <TableCell align="center">
                  {order.customer.companyName}
                </TableCell>
                <TableCell align="center">
                  {order.customer.customer_items.length}
                </TableCell>
                <TableCell align="center">
                  <div style={{ fontStyle: "italic", fontWeight: "bold" }}>
                    {order.orderStatus}
                  </div>
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    onClick={e => {
                      e.stopPropagation();
                      this.showDeleteConfirm(e.currentTarget, order.uid);
                    }}
                    className="actionIcon delete"
                  />
                  <EditIcon className="actionIcon edit" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    ) : !orders.length && !ordersLoading ? (
      <div
        style={{
          width: "100vw",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h2>Orders table empty.</h2>
      </div>
    ) : (
      <div
        style={{
          width: "100vw",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <CircularProgress />
      </div>
    );
  }
}
