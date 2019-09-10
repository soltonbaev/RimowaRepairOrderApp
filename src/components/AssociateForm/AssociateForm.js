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
    associateName: "",
    associateNameVisited: false
  };

  addItem = () => {
    const { items } = this.state;
    const Form = createItemForm(items.length + 1);
    this.setState(() => ({ items: [...items, <Form />] }));
  };

  componentDidMount() {
    const { itemsStored } = this.props;
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
      item[field] = selector(this.props.state, field);
    });
    item.uid = uuid();
    item.ownerId = JSON.parse(window.sessionStorage.clientInfo).customerId;
    return item;
  };

  submitForm = () => {
    const { items } = this.state;
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
  };

  tabChange = (e, tab) => {
    this.setState({ tab });
  };

  associateNameChange = e => {
    window.sessionStorage.associateName = e.target.value;
    this.setState({ associateName: e.target.value });
  };

  onAssociateNameBlur = e => this.setState({ associateNameVisited: true });

  handleDateChange = date => {
    this.setState({ date });
  };

  render() {
    const { items, tab, associateName, associateNameVisited } = this.state;
    const { itemFormsValid } = this.props;
    return (
      <div className="formContainer bodyContainer associateFormContainer">
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
                label={
                  !this.state.associateName && associateNameVisited
                    ? "required"
                    : "Associate Name"
                }
                margin="normal"
                required
                onBlur={this.onAssociateNameBlur}
                error={!this.state.associateName && associateNameVisited}
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
                {items[tab]}
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
              disabled={!itemFormsValid || !associateName.length}
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
