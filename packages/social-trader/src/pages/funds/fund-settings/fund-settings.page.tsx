import { IImageValue } from "components/form/input-image/input-image";
import AssetSettingsLoader from "modules/asset-settings/asset-settings.loader";
import AssetSettingsPage from "modules/asset-settings/asset-settings.page";
import { AssetDescriptionType } from "modules/asset-settings/asset-settings.types";
import { fundDescriptionSelector } from "pages/funds/fund-details/reducers/description.reducer";
import { dispatchFundDescriptionWithId } from "pages/funds/fund-details/services/fund-details.service";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import {
  createFundInfoSelector,
  fundAssetsSelector
} from "reducers/platform-reducer";
import { ASSET } from "shared/constants/constants";
import { SetSubmittingType } from "utils/types";

import FundSettings from "./fund-settings";
import { redirectToFund } from "./services/fund-settings.service";

const _FundSettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);
  const createFundInfo = useSelector(createFundInfoSelector);
  const description = useSelector(fundDescriptionSelector);
  const platformAssets = useSelector(fundAssetsSelector);
  const handleDispatchDescription = useCallback(() => {
    dispatch(
      dispatchFundDescriptionWithId(description!.id, undefined, currency)
    );
  }, []);
  return (
    <AssetSettingsPage
      redirectToAsset={redirectToFund}
      asset={ASSET.FUND}
      description={description as AssetDescriptionType}
      dispatchDescription={handleDispatchDescription}
      settingsBlocks={(editProgram, applyCloseAsset) => (
        <FundSettings
          createFundInfo={createFundInfo}
          reallocate={handleDispatchDescription}
          condition={!!description && !!platformAssets}
          platformAssets={platformAssets}
          closeAsset={applyCloseAsset}
          details={description!}
          editAsset={editProgram}
          loader={<AssetSettingsLoader />}
        />
      )}
    />
  );
};

export type TUpdateFundFunc = (
  values: {
    description?: string;
    logo?: IImageValue;
    investmentLimit?: number;
    stopOutLevel?: number;
    entryFee?: number;
    exitFee?: number;
  },
  setSubmitting: SetSubmittingType
) => void;

const FundSettingsPage = React.memo(_FundSettingsPage);
export default FundSettingsPage;
