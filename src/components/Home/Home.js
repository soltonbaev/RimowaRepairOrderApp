import React from "react";
import "./Home.css";
import { ROUTES } from "../../constants/routes";
import WrappedButton from "../WrappedButton";

export default class Home extends React.Component {
  render() {
    return (
      <div className="homeContainer">
        <div className="rimowaLogoText">RIMOWA</div>
        <div>Client Care</div>
        <WrappedButton
          variant="outlined"
          className="button"
          href={ROUTES.NEW_REPAIR_ORDER.NESTED.CLIENT}
          label="Add repair order"
        />
        <WrappedButton
          variant="outlined"
          className="button"
          href={ROUTES.REPAIR_ORDERS.PATH}
          label="View all repair orders"
        />
      </div>
    );
  }
}
