import { connect } from "react-redux";
import { authenticate, unauthenticate } from "../../store/actions";
import Home from "./Home";

const mapStateToProps = (state, ownProps) => ({
  authenticated: state.authenticated
});

const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authenticate()),
  unauthenticate: () => dispatch(unauthenticate())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
