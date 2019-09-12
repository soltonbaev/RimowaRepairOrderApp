import { connect } from "react-redux";
import RepairOrders from "./RepairOrders";

const mapStateToProps = (state, ownProps) => ({
  orders: state.repairOrders,
  ordersLoading: state.ordersLoading,
  authenticated: state.authenticated
});

export default connect(mapStateToProps)(RepairOrders);
