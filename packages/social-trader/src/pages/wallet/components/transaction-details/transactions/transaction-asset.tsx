import GVProgramAvatar from "components/gv-program-avatar";
import Link, { ToType } from "components/link/link";
import { createToUrl, useToLink } from "components/link/link.helper";
import { TransactionAssetDetails } from "gv-api-web";
import * as React from "react";
import { FUND_DETAILS_FOLDER_ROUTE } from "routes/funds.routes";
import { FOLLOW_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import { PROGRAM_DETAILS_FOLDER_ROUTE } from "routes/programs.routes";
import {
  composeFollowDetailsUrl,
  composeFundsDetailsUrl,
  composeProgramDetailsUrl
} from "utils/compose-url";

const getAssetLink = (
  data: TransactionAssetDetails,
  title: string
): ToType | undefined => {
  switch (data.assetType) {
    case "Follow":
      return createToUrl(
        composeFollowDetailsUrl(data.url),
        FOLLOW_DETAILS_FOLDER_ROUTE,
        title
      );
    case "Fund":
      return createToUrl(
        composeFundsDetailsUrl(data.url),
        FUND_DETAILS_FOLDER_ROUTE,
        title
      );
    case "Program":
      return createToUrl(
        composeProgramDetailsUrl(data.url),
        PROGRAM_DETAILS_FOLDER_ROUTE,
        title
      );
  }
};

const _TransactionAsset: React.FC<Props> = ({ data, url }) => {
  const { contextTitle } = useToLink();
  const programLinkProps = getAssetLink(data, contextTitle);
  return (
    <div
      className={`transaction-asset transaction-asset--${data.assetType.toLowerCase()}`}
    >
      <Link to={programLinkProps}>
        <GVProgramAvatar
          url={url}
          level={
            data.programDetails && data.programDetails.level > 0
              ? data.programDetails.level
              : undefined
          }
          alt={data.title}
          color={data.color}
          levelProgress={
            data.programDetails && data.programDetails.levelProgress
          }
        />
      </Link>
      <div className="transaction-asset__description">
        <Link to={programLinkProps} className="transaction-asset__title">
          {data.title}
        </Link>
        <p className="transaction-asset__trader">{data.manager}</p>
      </div>
    </div>
  );
};

interface Props {
  data: TransactionAssetDetails;
  url?: string;
}

const TransactionAsset = React.memo(_TransactionAsset);
export default TransactionAsset;
