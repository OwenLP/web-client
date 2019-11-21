import SettingsBlock from "components/settings-block/settings-block";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";

import ChangeBrokerForm, {
  ChangeBrokerFormOwnProps
} from "./change-broker-form";

const _ChangeBroker: React.FC<
  ChangeBrokerFormOwnProps & WithTranslation
> = props => (
  <SettingsBlock label={props.t("follow-settings.broker.title")}>
    <ChangeBrokerForm {...props} />
  </SettingsBlock>
);

const ChangeBroker = compose<
  React.ComponentType<ChangeBrokerFormOwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  React.memo
)(_ChangeBroker);

export default ChangeBroker;
