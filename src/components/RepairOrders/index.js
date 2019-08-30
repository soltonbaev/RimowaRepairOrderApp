import { connect } from "react-redux";
import RepairOrders from "./RepairOrders";

const mapStateToProps = (state, ownProps) => ({
  orders: state.repairOrders
});

export default connect(mapStateToProps)(RepairOrders);
