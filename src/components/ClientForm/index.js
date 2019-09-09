import { connect } from "react-redux";
import ClientForm from "./ClientForm";

const clientFormError = state => {
  return state.form.client && state.form.client.syncErrors;
};
const mapStateToProps = (state, ownProps) => ({
  formError: clientFormError(state),
  state
});

export default connect(mapStateToProps)(ClientForm);
