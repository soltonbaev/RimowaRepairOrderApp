import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "../CustomInput";

let ClientForm = props => {
  const { handleSubmit } = props;
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="clientForm">
        <div className="row">
          <Field
            name="firstName"
            component={({ input }) => (
              <Input
                {...input}
                className="inputField"
                label="First Name"
                margin="normal"
              />
            )}
          />
          <Field
            name="lastName"
            component={({ input }) => (
              <Input
                {...input}
                className="inputField"
                label="Last Name"
                margin="normal"
              />
            )}
          />
        </div>
        <div className="row">
          <Field
            name="email"
            component={({ input }) => (
              <Input
                {...input}
                className="inputField"
                label="Email"
                margin="normal"
              />
            )}
          />
          <Field
            name="phone"
            component={({ input }) => (
              <Input
                {...input}
                className="inputField"
                label="Phone"
                margin="normal"
              />
            )}
          />
        </div>
        <div className="row">
          <Field
            name="companyName"
            component={({ input }) => (
              <Input
                {...input}
                className="inputField"
                label="Company Name"
                margin="normal"
              />
            )}
          />
          <Field
            name="shippingAddress"
            component={({ input }) => (
              <Input
                {...input}
                className="inputField"
                label="Shipping Address"
                margin="normal"
              />
            )}
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
                    checked={input.value}
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
