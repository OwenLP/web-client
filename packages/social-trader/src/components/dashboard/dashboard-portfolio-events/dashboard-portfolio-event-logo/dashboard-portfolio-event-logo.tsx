import clsx from "clsx";
import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import ImageBase from "components/avatar/image-base";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Crashable from "decorators/crashable";
import { AssetDetails } from "gv-api-web";
import SocialLink from "media/social-link.svg";
import React from "react";
import { getAssetLink } from "utils/compose-url";

import styles from "./dashboard-portfolio-event-logo.module.scss";

interface Props {
  assetDetails: AssetDetails;
  icon: string;
  withAsset?: boolean;
}

const _PortfolioEventLogo: React.FC<Props> = ({
  withAsset = true,
  assetDetails,
  icon
}) => {
  const { contextTitle } = useToLink();
  const to = getAssetLink(
    assetDetails.url,
    assetDetails.assetType,
    contextTitle
  );
  const renderAvatar = () => (
    <AssetAvatar
      size={"full"}
      url={assetDetails.logoUrl}
      alt={assetDetails.title}
      color={assetDetails.color}
    />
  );
  return (
    <div
      className={clsx(styles["portfolio-event-logo"], {
        [styles["portfolio-event-logo--with-asset"]]: icon && withAsset
      })}
    >
      {withAsset &&
        ((assetDetails.url && (
          <Link to={to} className={styles["portfolio-event-logo__photo"]}>
            {renderAvatar()}
          </Link>
        )) || (
          <div className={styles["portfolio-event-logo__photo"]}>
            {renderAvatar()}
          </div>
        ))}
      {icon && (
        <div
          className={clsx(styles["portfolio-event-logo__type"], {
            [styles["portfolio-event-logo__type--with-asset"]]: withAsset
          })}
        >
          <ImageBase src={icon} alt={"event logo"} defaultImage={SocialLink} />
        </div>
      )}
    </div>
  );
};

const PortfolioEventLogo = React.memo(Crashable(_PortfolioEventLogo));
export default PortfolioEventLogo;
