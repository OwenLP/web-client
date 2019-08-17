import "./profile-widget.scss";

import classNames from "classnames";
import { ProfileHeaderViewModel } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import GVButton from "shared/components/gv-button";
import { DetailsIcon } from "shared/components/icon/details-icon";
import { LogoutIcon } from "shared/components/icon/logout-icon";
import { SettingsIcon } from "shared/components/icon/settings-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS
} from "shared/components/popover/popover";
import {
  PROFILE_ROUTE,
  SECURITY_ROUTE,
  SETTINGS_ROUTE
} from "shared/components/profile/profile.constants";
import FilterArrowIcon from "shared/components/table/components/filtering/filter-arrow-icon";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useAnchor from "shared/hooks/anchor.hook";

const _ProfileWidget: React.FC<Props> = ({
  t,
  profileHeader,
  logout,
  className
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  return (
    <div className={classNames("profile-widget", className)}>
      <div className="profile-widget__content" onClick={setAnchor}>
        <ProfileAvatar
          url={profileHeader.avatar}
          alt={profileHeader.email}
          className="profile-widget__avatar"
        />
        <FilterArrowIcon isOpen={!!anchor} />
      </div>
      <Popover
        anchorEl={anchor}
        onClose={clearAnchor}
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      >
        <div className="profile-menu">
          <div className="profile-menu__header">{profileHeader.email}</div>
          <div className="profile-menu__container">
            <div className="profile-menu__item profile-menu__item--details">
              <Link to={PROFILE_ROUTE} onClick={clearAnchor}>
                <DetailsIcon />
                {t("profile-widget.personal-details")}
              </Link>
            </div>
            <div className="profile-menu__item profile-menu__item--settings">
              <Link to={SETTINGS_ROUTE} onClick={clearAnchor}>
                <SettingsIcon />
                {t("profile-widget.settings")}
              </Link>
            </div>
            <div className="profile-menu__item profile-menu__item--settings">
              <Link to={SECURITY_ROUTE} onClick={clearAnchor}>
                <div style={{ opacity: 0 }}>
                  <SettingsIcon />
                </div>
                {t("profile-widget.security")}
              </Link>
            </div>
            <div className="profile-menu__item profile-menu__item--logout">
              <GVButton variant="text" onClick={logout}>
                <>
                  <LogoutIcon />
                  {t("profile-widget.logout")}
                </>
              </GVButton>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

interface OwnProps {
  profileHeader: ProfileHeaderViewModel;
  logout(): void;
  className?: string;
}

interface Props extends WithTranslation, OwnProps {}

const ProfileWidget = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  translate(),
  React.memo
)(_ProfileWidget);

export default ProfileWidget;
