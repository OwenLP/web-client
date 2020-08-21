import { DetailsInfo } from "components/details/details-description-section/details-description/details-info.block";
import { DetailsSettingsButtons } from "components/details/details-description-section/details-description/details-settings-buttons.block";
import { PersonalDetailsType } from "components/details/details.types";
import { mediaBreakpointTablet } from "components/gv-styles/gv-media";
import { ToType } from "components/link/link";
import { ASSET } from "constants/constants";
import { ProgramDetailsFull, SocialLinkViewModel } from "gv-api-web";
import * as React from "react";
import { managerToPathCreator } from "routes/manager.routes";
import styled from "styled-components";
import { CurrencyEnum } from "utils/types";

import { DetailsLimitsAvatar } from "./details-limits-avatar.block";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mediaBreakpointTablet(`
    flex-wrap: nowrap;
    justify-content: flex-start;
  `)}
`;

interface Props {
  className?: string;
  descriptionTitle?: string;
  personalDetails?: PersonalDetailsType;
  isOwnAsset?: boolean;
  id: string;
  logo: string;
  title: string;
  color?: string;
  currency?: CurrencyEnum;
  subtitleUrl?: string;
  subtitle?: string;
  socialLinks?: SocialLinkViewModel[];
  programDetails?: ProgramDetailsFull;
  asset?: ASSET;
  notificationsUrl?: ToType;
  settingsUrl?: ToType;
  AssetDetailsExtraBlock?: React.ComponentType<any>;
  description?: string;
}

const _DetailsDescription: React.FC<Props> = ({
  className,
  descriptionTitle,
  personalDetails,
  isOwnAsset,
  id,
  logo,
  title,
  color,
  currency,
  subtitleUrl,
  subtitle,
  socialLinks,
  programDetails,
  asset,
  description,
  AssetDetailsExtraBlock,
  notificationsUrl,
  settingsUrl
}) => {
  return (
    <Container>
      <DetailsLimitsAvatar
        logo={logo}
        level={programDetails ? programDetails.level : undefined}
        levelProgress={
          programDetails ? programDetails.levelProgress : undefined
        }
        title={title}
        color={color}
        totalAvailableInvestment={
          programDetails ? programDetails.totalAvailableInvestment : undefined
        }
        currency={currency}
      />
      <DetailsInfo
        descriptionTitle={descriptionTitle}
        title={title}
        subtitleUrl={
          subtitleUrl ? managerToPathCreator(subtitleUrl, title) : undefined
        }
        subtitle={subtitle}
        socialLinks={socialLinks}
        description={description}
      >
        {AssetDetailsExtraBlock && <AssetDetailsExtraBlock />}
      </DetailsInfo>
      {personalDetails && (
        <DetailsSettingsButtons
          isOwnAsset={isOwnAsset}
          asset={asset}
          personalDetails={personalDetails}
          id={id}
          notificationsUrl={notificationsUrl}
          settingsUrl={settingsUrl}
        />
      )}
    </Container>
  );
};

const DetailsDescription = React.memo(_DetailsDescription);
export default DetailsDescription;
