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
import moment from "moment";

import OrderPreview from "../OrderPreviewTemplate";

import "./OrdersTable.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
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
    orderToPreview: null
  };

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
    const { orders } = this.props;
    return (
      <Paper className="root">
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
          <OrderPreview order={this.state.orderToPreview} />
          <WrappedButton
            className="printButton"
            onClick={() => this.printOrderInfo(this.state.orderToPreview)}
            label="Print"
          />
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
                  <DeleteIcon className="actionIcon delete" />
                  <EditIcon className="actionIcon edit" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
