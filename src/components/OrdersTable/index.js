import { connect } from "react-redux";
import OrdersTable from "./OrdersTable";

const mapStateToProps = (state, ownProps) => ({
  rows: state.customers
});

export default connect(mapStateToProps)(OrdersTable);
