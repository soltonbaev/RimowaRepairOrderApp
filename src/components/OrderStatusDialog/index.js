import OrderStatus from "./OrderStatus";
import { connect } from "react-redux";
import { updateOrderStatus } from "../../store/reducer";

const mapStateToProps = (state, ownProps) => ({
  state
});

const mapDispatchToProps = dispatch => ({
  changeStatus: (newStatus, uid) => dispatch(updateOrderStatus(newStatus, uid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderStatus);
