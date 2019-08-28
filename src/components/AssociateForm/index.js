import { connect } from "react-redux";
import AssociateForm from "./AssociateForm";

const mapStateToProps = (state, ownProps) => ({ state });

export default connect(mapStateToProps)(AssociateForm);
