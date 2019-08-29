import React from "react";
import { Field, reduxForm } from "redux-form";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "../CustomInput";

let ClientForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
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
        <div className="row checkbox">
          <Field
            name="shipWhenComplete"
            defaultValue={false}
            component={({ input }) => (
              <FormControlLabel
                {...input}
                control={<Checkbox color="default" value="checkedG" />}
                label="Ship when complete (check the box if true)"
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

export default ClientForm;
