import "./manager.page.scss";

import { ManagerProfile } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import ManagerDescription from "shared/components/manager/manager-description/manager-description";
import ManagerHistorySection from "shared/components/manager/manager-history/manager-history-section";
import Page from "shared/components/page/page";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { AuthRootState } from "shared/utils/types";

const _ManagerPage: React.FC<Props> = ({
  managerProfile,
  isAuthenticated,
  t
}) => (
  <Page title={`${t("manager-page.title")} ${managerProfile.username}`}>
    <div className="manager">
      <div className="manager__description">
        <ManagerDescription managerProfile={managerProfile} />
      </div>
      <div className="manager__history">
        <ManagerHistorySection
          isAuthenticated={isAuthenticated}
          managerId={managerProfile.id}
          title={managerProfile.username}
        />
      </div>
    </div>
  </Page>
);

interface Props extends StateProps, WithTranslation, OwnProps {}

interface OwnProps {
  managerProfile: ManagerProfile;
}

interface StateProps {
  isAuthenticated: boolean;
}

const mapStateToProps = (state: AuthRootState): StateProps => ({
  isAuthenticated: isAuthenticatedSelector(state)
});

const ManagerPage = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  connect(mapStateToProps),
  withLoader,
  translate(),
  React.memo
)(_ManagerPage);
export default ManagerPage;
