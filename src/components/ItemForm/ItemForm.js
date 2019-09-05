import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DatePicker from "../DatePicker";
import Input from "../CustomInput";
const createItemForm = itemNum => {
  let ItemForm = props => {
    const { handleSubmit } = props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="itemForm">
          <div className="row">
            <Field
              name="needsBy"
              component={({ input }) => {
                return (
                  <DatePicker
                    {...input}
                    value={input.value ? input.value : null}
                    label="Needs by"
                  />
                );
              }}
            />
          </div>
          <div className="row">
            <Field
              name="serialNumber"
              component={({ input }) => (
                <Input
                  {...input}
                  className="inputField"
                  label="Serial Number #"
                  margin="normal"
                />
              )}
            />
            <Field
              name="lockCombo"
              component={({ input }) => (
                <Input
                  {...input}
                  className="inputField"
                  label="Lock Combo"
                  margin="normal"
                />
              )}
            />
          </div>
          <div className="row">
            <Field
              name="model"
              component={({ input }) => (
                <Input
                  {...input}
                  className="inputField"
                  label="Model"
                  margin="normal"
                />
              )}
            />
            <Field
              name="reasonForRepair"
              component={({ input }) => (
                <Input
                  {...input}
                  className="inputField"
                  label="Reason for repair"
                  margin="normal"
                />
              )}
            />
          </div>
          <div className="checkboxContainer">
            <Field
              name="warranty"
              defaultValue={false}
              component={({ input }) => (
                <FormControlLabel
                  {...input}
                  control={
                    <Checkbox
                      checked={input.value}
                      color="default"
                      value="checkedG"
                    />
                  }
                  label="check the box if under warranty"
                />
              )}
            />
          </div>
        </div>
      </form>
    );
  };

  ItemForm = reduxForm({
    destroyOnUnmount: false,
    form: `item-${itemNum}`
  })(ItemForm);

  ItemForm = connect(state => ({
    initialValues: state.form[`item-${itemNum}`] && state.form[`item-${itemNum}`].values
  }))(ItemForm);

  return ItemForm;
};
export default createItemForm;
