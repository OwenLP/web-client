import "./asset-status.scss";

import AssetStatusRequests from "components/asset-status/asset-status-requests";
import { AssetInvestmentRequest } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { getInRequestsLoadersData } from "pages/dashboard/dashboard.loaders-data";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { getAssetRequests } from "./services/asset-status.service";
import { PopoverContentListItem } from "components/popover/popover-content";

const _AssetStatusRequestsContainer: React.FC<Props> = ({
  id,
  onCancel,
  handleCloseDropdown
}) => {
  const [t] = useTranslation();
  const { data: requests } = useApiRequest<AssetInvestmentRequest[]>({
    request: getAssetRequests,
    fetchOnMount: true,
    fetchOnMountData: id
  });

  const handleCancel = useCallback(() => {
    handleCloseDropdown();
    if (onCancel) onCancel();
  }, []);

  return (
    <PopoverContentListItem>
      {t("program-details-page.description.requests-completed")}
    </PopoverContentListItem>
  );

  return (
    <AssetStatusRequests
      loaderData={getInRequestsLoadersData()}
      data={requests!}
      handleCancel={handleCancel}
    />
  );
};

interface Props {
  id: string;
  onCancel: () => void;
  handleCloseDropdown: () => void;
}

const AssetStatusRequestsContainer = React.memo(_AssetStatusRequestsContainer);
export default AssetStatusRequestsContainer;
