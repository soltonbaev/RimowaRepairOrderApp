import { connect } from "react-redux";
import AssociateForm from "./AssociateForm";

const itemFormsValid = state => {
  const itemsStored = Object.keys(state.form).filter(
    key => key.indexOf("item") !== -1
  );
  const formErrorStates = itemsStored.map(item =>
    Boolean(state.form[item].syncErrors)
  );
  return formErrorStates.every(err => !err);
};

const itemsStored = state =>
  Object.keys(state.form).filter(key => key.indexOf("item") !== -1).length;

const mapStateToProps = (state, ownProps) => ({
  itemFormsValid: itemFormsValid(state),
  itemsStored: itemsStored(state),
  state
});

export default connect(mapStateToProps)(AssociateForm);
