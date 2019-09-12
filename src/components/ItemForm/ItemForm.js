import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DatePicker from "../DatePicker";
import Input from "../CustomInput";
import { validator } from "../../utils";
import Select from "@material-ui/core/Select";
const { required, maxLength, minLength } = validator;

const maxLength12 = maxLength(12);
const minLength8 = minLength(8);

function inputField(props) {
  const { input, ...rest } = props;
  return <Input {...input} {...rest} />;
}

function datePicker({ input, ...rest }) {
  const { meta = {} } = rest;
  const { error, warning, pristine } = meta;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DatePicker
        {...input}
        {...meta}
        value={input.value ? input.value : null}
        label="Needs by"
      />
      {!pristine && (error || warning) ? (
        (error && (
          <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
        )) ||
        (warning && (
          <span style={{ color: "red", fontSize: "12px" }}>{warning}</span>
        ))
      ) : (
          <span style={{ height: "15px" }} />
        )}
    </div>
  );
}

function select({ input }) {
  return (
      <Select {...input} native value={input.value || ""}>
        <option value="">Origin (select an option)</option>
        <option value="WALK_IN">Walk in</option>
        <option value="SHIPPED">Shipped to store</option>
      </Select>
  );
}

const createItemForm = itemNum => {
  let ItemForm = props => {
    const { handleSubmit } = props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="itemForm">
          <div className="row">
            <div className="inputField">
              <Field
                name="needsBy"
                component={datePicker}
                validate={[required]}
              />
            </div>

            <div className="inputField">
              <div className="dropdownSpacer"></div>
              <div className="dropdownWrapper">
                <Field
                  name="walkinOrShipped"
                  defaultValue="WALK_IN"
                  margin="normal"
                  component={select}
                  validate={[required]}
                />
              </div>
            </div>
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
              validate={[required]}
            />
          </div>
          <div className="row">
            <div className="checkboxWrapper">
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
                    label="under warranty"
                  />
                )}
              />

              <Field
                name="replacementCaseIssued"
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
                    label="replacement case issued"
                  />
                )}
              />

              <Field
                name="damagedBy3rdParty"
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
                    label="damaged by 3rd party (airline)"
                  />
                )}
              />
            </div>
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
