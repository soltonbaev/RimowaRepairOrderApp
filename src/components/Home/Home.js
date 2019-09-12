import React from "react";
import "./Home.css";
import { ROUTES } from "../../constants/routes";
import WrappedButton from "../WrappedButton";
import { Popover } from "@material-ui/core";
import ConfirmDialog from "../ConfirmDialog";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authConfirm: false
    };
    this.rootRef = null;
  }

  showAuthConfirm = () => {
    const { authenticated, history } = this.props;
    if (authenticated) return history.push(ROUTES.REPAIR_ORDERS.PATH);
    this.setState({ authConfirm: true });
  };
  closeAuthConfirm = () => this.setState({ authConfirm: false });

  onConfirm = () => {
    const { authenticate, history } = this.props;
    authenticate();
    setTimeout(() => history.push(ROUTES.REPAIR_ORDERS.PATH), 100);
  };

  render() {
    return (
      <div className="homeContainer bodyContainer">
        <div className="rimowaTop">
          <div className="rimowaLogoText">RIMOWA</div>
          <div className="rimowaSubtitle">Client Care</div>
        </div>
        <div className="rimowaMid" ref={ref => (this.rootRef = ref)}>
          <Popover
            className="confirmDelete"
            open={Boolean(this.state.authConfirm)}
            onClose={this.closeAuthConfirm}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            anchorEl={this.rootRef}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <ConfirmDialog
              title="Authorization required"
              message="To view the available tickets enter the password"
              onCancel={this.closeAuthConfirm}
              confirmText="Confirm"
              onConfirm={this.onConfirm}
              cancelText="Cancel"
              confirmWithInput={true}
            />
          </Popover>
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
              onClick={this.showAuthConfirm}
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
