import React from "react";
import classnames from "classnames";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

import "./OrdersTable.css";

const TABLE_COLUMNS = [
  "Order placed",
  "Name",
  "Email",
  "Phone#",
  "Company name",
  "Items in order"
];

export default class CustomizedTables extends React.Component {
  render() {
    const { orders } = this.props;
    return (
      <Paper className="root">
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
                    index % 2 === 0 ? "white" : "rgba(208, 208, 208, 0.87)"
                }}
              >
                <TableCell align="center">
                  {moment(order.date).format("MMM DD YYYY")}
                  <br />
                  {moment(order.date).format("hh:mm A")}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
