import { DetailsInfo } from "components/details/details-description-section/details-description/details-info.block";
import { DetailsSettingsButtons } from "components/details/details-description-section/details-description/details-settings-buttons.block";
import { ToType } from "components/link/link";
import * as React from "react";
import { managerToPathCreator } from "routes/manager.routes";

import { DetailsFullType, PersonalDetailsType } from "../../details.types";
import { DetailsLimitsAvatar } from "./details-limits-avatar.block";

const _DetailsDescription: React.FC<Props> = ({
  showSettings,
  personalDetails,
  description,
  AssetDetailsExtraBlock,
  notificationsUrl,
  settingsUrl
}) => {
  const logo =
    "logo" in description ? description.logo : description.brokerDetails.logo;
  const title = "title" in description ? description.title : description.login;
  return (
    <div className="asset-details-description__main">
      <DetailsLimitsAvatar
        logo={logo}
        level={"level" in description ? description.level : undefined}
        levelProgress={
          "levelProgress" in description ? description.levelProgress : undefined
        }
        title={title}
        color={"color" in description ? description.color : undefined}
        totalAvailableInvestment={
          "totalAvailableInvestment" in description
            ? description.totalAvailableInvestment
            : undefined
        }
        currency={"level" in description ? description.currency : undefined}
      />
      <DetailsInfo
        title={title}
        to={
          "owner" in description
            ? managerToPathCreator(description.owner.url, title)
            : undefined
        }
        username={
          "owner" in description ? description.owner.username : undefined
        }
        socialLinks={
          "owner" in description ? description.owner.socialLinks : undefined
        }
        description={
          "description" in description ? description.description : undefined
        }
      >
        {AssetDetailsExtraBlock && <AssetDetailsExtraBlock />}
      </DetailsInfo>
      <DetailsSettingsButtons
        showSettings={showSettings}
        personalDetails={personalDetails}
        id={description.id}
        notificationsUrl={notificationsUrl}
        settingsUrl={settingsUrl}
      />
    </div>
  );
};

interface Props {
  showSettings?: boolean;
  notificationsUrl?: ToType;
  settingsUrl: ToType;
  AssetDetailsExtraBlock?: React.ComponentType<any>;
  description: DetailsFullType;
  personalDetails?: PersonalDetailsType;
}

const DetailsDescription = React.memo(_DetailsDescription);
export default DetailsDescription;
