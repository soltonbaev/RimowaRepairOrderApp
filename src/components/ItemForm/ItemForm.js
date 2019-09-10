import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DatePicker from "../DatePicker";
import Input from "../CustomInput";
import { validator } from "../../utils";
const { required, maxLength, minLength } = validator;

const maxLength12 = maxLength(12);
const minLength8 = minLength(8);

function inputField(props) {
  const { input, ...rest } = props;
  return <Input {...input} {...rest} />;
}

function datePicker({ input, ...rest }) {
  const { meta = {} } = rest;
  const { error, warning } = meta;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DatePicker
        {...input}
        {...meta}
        value={input.value ? input.value : null}
        label="Needs by"
      />
      {error || warning ? (
        (error && <span style={{ color: "red", fontSize: "12px" }}>{error}</span>) ||
        (warning && <span style={{ color: "red", fontSize: "12px" }}>{warning}</span>)
      ) : (
        <span style={{ height: "15px" }} />
      )}
    </div>
  );
}

const createItemForm = itemNum => {
  let ItemForm = props => {
    const { handleSubmit } = props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="itemForm">
          <div className="row">
            <Field
              name="needsBy"
              component={datePicker}
              validate={[required]}
            />
          </div>
          <div className="row">
            <Field
              name="serialNumber"
              className="inputField"
              label="Serial Number #"
              margin="normal"
              component={inputField}
              validate={[required, maxLength12, minLength8]}
            />
            <Field
              name="lockCombo"
              className="inputField"
              label="Lock Combo"
              margin="normal"
              component={inputField}
              validate={[required]}
            />
          </div>
          <div className="row">
            <Field
              name="model"
              className="inputField"
              label="Model"
              margin="normal"
              component={inputField}
            />
            <Field
              name="reasonForRepair"
              className="inputField"
              label="Reason for repair"
              margin="normal"
              component={inputField}
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
                      checked={Boolean(input.value)}
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
    initialValues:
      state.form[`item-${itemNum}`] && state.form[`item-${itemNum}`].values
  }))(ItemForm);

  return ItemForm;
};
export default createItemForm;
