import React from "react";
import { Field, reduxForm } from "redux-form";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DatePicker from "../DatePicker";
import Input from "../CustomInput";
const createItemForm = itemNum => {
  // const required = value => (value ? undefined : "Required");
  let ItemForm = props => {
    const { handleSubmit } = props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="itemForm">
          <div className="row">
            <Field
              name="needsBy"
              // validate={[required]}
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
              // validate={[required]}
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
              // validate={[required]}
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
              // validate={[required]}
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
              // validate={[required]}
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
          <div className="row checkbox">
            <Field
              name="warranty"
              // validate={[required]}
              defaultValue={false}
              component={({ input }) => (
                <FormControlLabel
                  {...input}
                  control={<Checkbox color="default" value="checkedG" />}
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
    form: `item-${itemNum}` || "item"
  })(ItemForm);

  return ItemForm;
};
export default createItemForm;
