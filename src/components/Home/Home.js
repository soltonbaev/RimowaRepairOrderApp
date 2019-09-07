import React from "react";
import "./Home.css";
import { ROUTES } from "../../constants/routes";
import WrappedButton from "../WrappedButton";

export default class Home extends React.Component {
  render() {
    return (
      <div className="homeContainer bodyContainer">
        <div className="rimowaTop">
          <div className="rimowaLogoText">RIMOWA</div>
          <div className="rimowaSubtitle">Client Care</div>
        </div>
        <div className="rimowaMid">
          <div className="rimowaTitle">
            Welcome <br />
            <br />
            to Rimowa's repair ticket <br />
            <br />
            management web app
          </div>
          <div className="buttonWrapper">
            <WrappedButton
              variant="outlined"
              className="button"
              href={ROUTES.REPAIR_ORDERS.PATH}
              label="View tickets"
            />
            <WrappedButton
              variant="outlined"
              className="button"
              href={ROUTES.NEW_REPAIR_ORDER.NESTED.CLIENT}
              label="new ticket"
            />
          </div>
        </div>
        <div className="rimowaBottom"></div>
      </div>
    );
  }
}
