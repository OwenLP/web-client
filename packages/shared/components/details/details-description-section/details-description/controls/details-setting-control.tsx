import "./details-description-control.scss";

import React from "react";
import { SettingsIcon } from "shared/components/icon/settings-icon";
import Link, { ToType } from "shared/components/link/link";

import DetailsDescriptionControl from "./details-description-control";

const _DetailsSettingControl: React.FC<Props> = ({ to, text }) => {
  return (
    <DetailsDescriptionControl
      tag={Link}
      to={to}
      className="details-description-control--button"
      text={text}
    >
      <SettingsIcon className="details-description-control__icon" />
    </DetailsDescriptionControl>
  );
};

export interface Props {
  to: ToType;
  text: string;
}

const DetailsSettingControl = React.memo(_DetailsSettingControl);
export default DetailsSettingControl;
