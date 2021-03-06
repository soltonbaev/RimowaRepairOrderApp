import React from "react";
import classnames from "classnames";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";

import OrderPreview from "../OrderPreviewTemplate";
import OrdersStatus from "../OrderStatusDialog";

import "./OrdersTable.css";
import { deleteOrders } from "../../store/reducer";
import ConfirmDialog from "../ConfirmDialog";
import { Popover } from "@material-ui/core";
import WrappedButton from "../WrappedButton";
import { getHTMLDBTemplate } from "../../templates/handlebar-template/handlebarPrintHMTL";

const TABLE_COLUMNS = [
  "Date added",
  "Name",
  "Email",
  "Phone",
  "Company Name",
  "Items",
  "Status",
  "Actions"
];

export default class CustomizedTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      orderToPreview: null,
      deleteConfirmAnchor: null,
      deletingUID: null,
      statusSelectAnchor: null,
      selectedStatus: null,
      statusChangeUID: null
    };
    this.rootRef = null;
  }

  showDeleteConfirm = (currentTarget, uid) =>
    this.setState({ deleteConfirmAnchor: currentTarget, deletingUID: uid });
  closeDeleteConfirm = () =>
    this.setState({ deleteConfirmAnchor: null, deletingUID: null });

  showPreview = (anchorEl, order) =>
    this.setState({ anchorEl, orderToPreview: order });

  handleClose = () => this.setState({ anchorEl: null, orderToPreview: null });

  showStatusSelect = (anchor, status, uid) => {
    this.setState({
      statusSelectAnchor: anchor,
      selectedStatus: status,
      statusChangeUID: uid
    });
  };

  hideStatusSelect = () =>
    this.setState({ statusSelectAnchor: null, selectedStatus: null });

  async printOrderInfo(order) {
    const w = window.open();
    await w.document.write(getHTMLDBTemplate(order));
    w.print();
    w.close();
  }

  render() {
    const { orders, dispatch, ordersLoading } = this.props;
    return !ordersLoading && orders.length ? (
      <Paper className="root" ref={ref => (this.rootRef = ref)}>
        <OrdersStatus
          selectedValue={this.state.selectedStatus}
          uid={this.state.statusChangeUID}
          anchor={this.state.statusSelectAnchor}
          onClose={this.hideStatusSelect}
        />
        <Popover
          className="confirmDelete"
          open={Boolean(this.state.deleteConfirmAnchor)}
          onClose={this.closeDeleteConfirm}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center"
          }}
          anchorEl={this.rootRef}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <ConfirmDialog
            title="Delete this ticket?"
            onConfirm={e => {
              e.stopPropagation();
              this.closeDeleteConfirm();
              dispatch(deleteOrders(this.state.deletingUID));
            }}
            message="This action will permanently erase the ticket"
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
            vertical: "center",
            horizontal: "center"
          }}
          anchorEl={this.rootRef}
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
                <TableCell >
                  {`${order.customer.firstName} ${order.customer.lastName}`}
                </TableCell>
                <TableCell >{order.customer.email}</TableCell>
                <TableCell >{order.customer.phone}</TableCell>
                <TableCell >
                  {order.customer.companyName}
                </TableCell>
                <TableCell align="center">
                  {order.customer.customer_items.length}
                </TableCell>
                <TableCell className="ticketStatus">
                <div className="statusWrapper">
                <ArrowDropDownCircleOutlinedIcon style={{padding: "0 5px 0 5px"}}/>
                  <div
                    onClick={e => {
                      e.stopPropagation();
                      this.showStatusSelect(
                        e.currentTarget,
                        order.orderStatus,
                        order.uid
                      );
                    }}
                    
                  >
                    
                    {order.orderStatus}
                  </div>
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
        <div className="rimowaTitle">There are no tickets in the database</div>
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
