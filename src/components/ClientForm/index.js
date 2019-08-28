import { connect } from "react-redux";
import ClientForm from "./ClientForm";

const mapStateToProps = (state, ownProps) => ({ state });

export default connect(mapStateToProps)(ClientForm);
