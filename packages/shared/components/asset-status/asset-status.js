import "./asset-status.scss";

import classnames from "classnames";
import React, { Fragment, PureComponent } from "react";
import Scrollbars from "react-custom-scrollbars";
import { translate } from "react-i18next";

import Popover from "../popover/popover";
import AssetStatusRequests from "./asset-status-requests";

const getStatusClassName = (status, className) => {
  return classnames("asset-status", className, {
    "asset-status__active": status === "Active",
    "asset-status__investing": status === "Investing",
    "asset-status__withdrawing": status === "Withdrawing",
    "asset-status__ended": status === "Ended",
    "asset-status__pending": status === "Pending"
  });
};

class AssetStatus extends PureComponent {
  state = {
    anchor: null
  };

  handleOpenDropdown = event => this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: null });

  render() {
    const { t, className, status, id, role, asset, onCancel } = this.props;
    return (
      <Fragment>
        <span
          className={getStatusClassName(status, className)}
          onClick={this.handleOpenDropdown}
        >
          {status ? t(`program-statuses.${status}`) : ""}
        </span>
        <Popover
          horizontal="right"
          vertical="bottom"
          anchorEl={this.state.anchor}
          noPadding
          onClose={this.handleCloseDropdown}
        >
          <Scrollbars autoHeight>
            <div className="dashboard-request-popover">
              <AssetStatusRequests
                id={id}
                role={role}
                asset={asset}
                handleCloseDropdown={this.handleCloseDropdown}
                onCancel={onCancel}
              />
            </div>
          </Scrollbars>
        </Popover>
      </Fragment>
    );
  }
}

export default translate()(AssetStatus);
