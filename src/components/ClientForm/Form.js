import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "../CustomInput";
import { validator } from "../../utils";
const { required, email: emailValidator } = validator;

function inputField(props) {
  const { input, ...rest } = props;
  return <Input {...input} {...rest} />;
}

let ClientForm = props => {
  const { handleSubmit } = props;
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="clientForm">
        <div className="row">
          <Field
            name="firstName"
            className="inputField"
            label="First Name"
            margin="normal"
            component={inputField}
            validate={[required]}
          />
          <Field
            name="lastName"
            className="inputField"
            label="Last Name"
            margin="normal"
            component={inputField}
            validate={[required]}
          />
        </div>
        <div className="row">
          <Field
            name="email"
            className="inputField"
            label="Email"
            margin="normal"
            component={inputField}
            validate={[required, emailValidator]}
          />
          <Field
            name="phone"
            className="inputField"
            label="Phone"
            margin="normal"
            component={inputField}
            validate={[required]}
          />
        </div>
        <div className="row">
          <Field
            name="companyName"
            className="inputField"
            label="Company Name"
            margin="normal"
            component={inputField}
          />
          <Field
            name="shippingAddress"
            className="inputField"
            label="Shipping Address"
            margin="normal"
            component={inputField}
          />
        </div>
        <div className="checkboxContainer">
          <Field
            name="shipWhenComplete"
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
                label="Ship when complete"
              />
            )}
          />
        </div>
      </div>
    </form>
  );
};

ClientForm = reduxForm({
  destroyOnUnmount: false,
  form: "client"
})(ClientForm);

ClientForm = connect(state => ({
  initialValues: state.form.client && state.form.client.values
}))(ClientForm);

export default ClientForm;
