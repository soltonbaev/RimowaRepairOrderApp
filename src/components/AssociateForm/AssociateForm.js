import React from "react";
import "./AssociateForm.css";
import { formValueSelector } from "redux-form";
import { ROUTES } from "../../constants/routes";
import WrappedButton from "../WrappedButton";
import Input from "../CustomInput";
import createItemForm from "../ItemForm";
import uuid from "uuid/v4";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const ITEM_FORM_FIELDS = [
  "needsBy",
  "serialNumber",
  "lockCombo",
  "model",
  "reasonForRepair",
  "warranty"
];

export default class AssociateForm extends React.Component {
  state = {
    date: new Date(),
    items: [],
    tab: 0,
    submitted: false,
    associateName: ""
  };

  addItem = () => {
    const { items } = this.state;
    const Form = createItemForm(items.length + 1);
    this.setState(() => ({ items: [...items, <Form />] }));
  };

  componentDidMount() {
    const state = this.props.state;
    const itemsStored = Object.keys(state.form).filter(
      key => key.indexOf("item") !== -1
    ).length;
    if (itemsStored) {
      const items = [];
      for (let i = 0; i < itemsStored; i++) {
        const Form = createItemForm(i + 1);
        items.push(<Form />);
      }
      this.setState({ items });
    } else {
      this.addItem();
    }
  }

  getItemData = selector => {
    const item = {};

    ITEM_FORM_FIELDS.forEach(field => {
      console.log(this.props.state.form);
      console.log("field", field);
      item[field] = selector(this.props.state, field);
    });
    item.uid = uuid();
    item.ownerId = JSON.parse(window.sessionStorage.clientInfo).customerId;
    return item;
  };

  submitForm = () => {
    const { items, associateName } = this.state;
    let itemsData = [];
    if (!items.length) return itemsData;
    items.forEach((item, index) => {
      const selector = formValueSelector(`item-${index + 1}`);
      itemsData.push(this.getItemData(selector));
    });
    itemsData = itemsData.map(item => {
      return {
        ...item,
        warranty:
          item.warranty !== undefined || null || "" ? item.warranty : false
      };
    });
    window.sessionStorage.itemsList = JSON.stringify(itemsData);
    // window.sessionStorage.associateName = associateName;
    this.setState({ submitted: true });
  };

  tabChange = (e, tab) => {
    this.setState({ tab });
  };

  associateNameChange = e => {
    window.sessionStorage.associateName = e.target.value;
    this.setState({ associateName: e.target.value });
  };

  handleDateChange = date => {
    this.setState({ date });
  };

  render() {
    const { items, tab, submitted } = this.state;
    return (
      <div className="formContainer associateFormContainer">
        <div className="rimowaTop">
          <div className="rimowaLogoText">RIMOWA</div>
          <div className="rimowaSubtitle">Client Care</div>
          <div className="rimowaTitle">Associate to complete:</div>
        </div>
        <div className="rimowaMid">
         
          <div className="associateBodyContainer">
            <div className="row">
              <Input
                value={window.sessionStorage.associateName}
                className="inputField"
                onChange={this.associateNameChange}
                label="Associate Name"
                margin="normal"
              />
            </div>
            <div className="paperContainer">
              <Paper square>
                <Tabs
                  value={tab}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={this.tabChange}
                >
                  {items &&
                    items.map((item, index) => {
                      return (
                        <Tab
                          key={index}
                          label={`Item ${index + 1}`}
                          id={`Item-${index + 1}`}
                          value={index}
                        />
                      );
                    })}
                </Tabs>
                {/* <div className="row"> */}
                {items[tab]}
                {/* </div> */}
              </Paper>
            </div>
          </div>
        </div>
        <div className="rimowaBottom">
          <div className="row addItemButton">
          <WrappedButton
            href={ROUTES.NEW_REPAIR_ORDER.NESTED.CLIENT}
            label="< Go Back"
          />
            <WrappedButton onClick={this.addItem} label="Add another item" />
            <WrappedButton
              onClick={this.submitForm}
              href={ROUTES.NEW_REPAIR_ORDER.NESTED.SIGN}
              label="Save and Continue >"
            />
          </div>
        </div>
      </div>
    );
  }
}
