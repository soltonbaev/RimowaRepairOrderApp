import React from "react";
import classnames from "classnames";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getCustomers } from "../../store/reducer";

import "./OrdersTable.css";

const TABLE_COLUMNS = ["Name", "Email", "Phone#", "Company name"];

export default class CustomizedTables extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCustomers());
  }

  render() {
    const { rows } = this.props;
    return (
      <Paper className="root">
        <Table className="table">
          <TableHead className="head">
            <TableRow>
              {TABLE_COLUMNS.map(column => (
                <TableCell key={column} className="table" align="center">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell align="center">
                  {`${row.firstName} ${row.lastName}`}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.companyName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
