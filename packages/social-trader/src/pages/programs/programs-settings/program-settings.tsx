import "./program-settings.scss";

import withLoader, { WithLoaderProps } from "decorators/with-loader";
import {
  BrokersProgramInfo,
  ProgramCreateAssetPlatformInfo,
  ProgramFollowDetailsFull
} from "gv-api-web";
import AssetEdit from "modules/asset-settings/asset-edit";
import { CLOSEABLE_ASSET } from "modules/asset-settings/close-asset/close-asset";
import CloseAssetBlock from "modules/asset-settings/close-asset/close-asset-block";
import ClosePeriodBlock from "modules/asset-settings/close-period/close-period-block";
import InvestmentFees from "modules/asset-settings/investment-fees";
import React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import { ASSET } from "shared/constants/constants";
import { SetSubmittingType } from "utils/types";

import CancelChangeBroker from "./cancel-change-broker/cancel-change-broker";
import ChangeBroker from "./change-broker/change-broker";
import { ChangeBrokerFormValues } from "./change-broker/change-broker-form";
import ChangePassword from "./change-password/change-password";
import InvestmentLimit from "./investment-limit";
import { TUpdateProgramFunc } from "./program-settings.page";
import SignalingEdit from "./signaling-edit";
import StopOutLevel from "./stop-out-level";
import TradesUpdating from "./trades-updating";
import TwoFactorConfirm from "./two-factor-confirm";

const _ProgramSettings: React.FC<Props> = ({
  updateDescription,
  createProgramInfo: { maxSuccessFee, maxEntryFee },
  cancelChangeBroker,
  brokersInfo,
  description,
  changeBroker,
  editProgram,
  closeProgram
}) => {
  const [t] = useTranslation();
  const { programDetails } = description;
  const signalSuccessFee = description.signalSettings
    ? description.signalSettings.signalSuccessFee
    : undefined;
  const signalVolumeFee = description.signalSettings
    ? description.signalSettings.signalVolumeFee
    : undefined;
  const isSignalProgram = !!description.followDetails;
  return (
    <>
      <TwoFactorConfirm
        condition={programDetails.personalDetails.showTwoFactorButton}
        id={description.id}
      />
      <ClosePeriodBlock
        condition={programDetails.personalDetails.ownerActions.canClosePeriod}
        id={description.id}
        closePeriod={updateDescription}
      />
      <ChangePassword
        condition={
          programDetails.personalDetails.ownerActions.canChangePassword &&
          programDetails.personalDetails.ownerActions.canClose
        }
        title={description.title}
        id={description.id}
      />
      <CancelChangeBroker
        condition={!!programDetails.personalDetails.migration}
        isSignalProgram={isSignalProgram}
        brokerFrom={
          brokersInfo.brokers.find(
            broker =>
              !!broker.accountTypes.find(
                accountType =>
                  accountType.id === brokersInfo.currentAccountTypeId
              )
          )!
        }
        migration={programDetails.personalDetails.migration}
        onSubmit={cancelChangeBroker}
        currentAccountTypeId={brokersInfo.currentAccountTypeId}
        leverage={programDetails.leverageMax}
      />
      <ChangeBroker
        condition={
          !programDetails.personalDetails.migration &&
          brokersInfo.brokers.length > 1
        }
        isSignalProgram={isSignalProgram}
        onSubmit={changeBroker}
        id={description.id}
        brokers={brokersInfo.brokers}
        currentAccountTypeId={brokersInfo.currentAccountTypeId}
        currentLeverage={programDetails.leverageMax}
      />
      <InvestmentFees
        asset={ASSET.PROGRAM}
        maxSuccessFee={maxSuccessFee}
        maxEntryFee={maxEntryFee}
        entryFee={programDetails.entryFeeSelected}
        successFee={programDetails.successFeeCurrent}
        onSubmit={editProgram}
      />
      <TradesUpdating
        condition={!isSignalProgram}
        tradesDelay={programDetails.tradesDelay}
        onSubmit={editProgram}
      />
      <StopOutLevel
        stopOutLevel={programDetails.stopOutLevelCurrent}
        onSubmit={editProgram}
      />
      <InvestmentLimit
        currency={programDetails.currency}
        investmentLimit={programDetails.availableInvestmentLimit}
        onSubmit={editProgram}
      />
      <AssetEdit
        title={description.title}
        logo={{ src: description.logo }}
        description={description.description}
        onSubmit={editProgram}
      />
      <SignalingEdit
        id={description.id}
        isSignalProgram={isSignalProgram}
        onApply={updateDescription}
        signalSuccessFee={signalSuccessFee}
        signalVolumeFee={signalVolumeFee}
      />
      <CloseAssetBlock
        label={t("asset-settings.close-program.title")}
        asset={CLOSEABLE_ASSET.PROGRAM}
        canCloseAsset={programDetails.personalDetails.ownerActions.canClose}
        id={description.id}
        closeAsset={closeProgram}
      />
    </>
  );
};

interface Props {
  createProgramInfo: ProgramCreateAssetPlatformInfo;
  description: ProgramFollowDetailsFull;
  brokersInfo: BrokersProgramInfo;
  updateDescription: VoidFunction;
  closeProgram: VoidFunction;
  changeBroker: (
    values: ChangeBrokerFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  editProgram: TUpdateProgramFunc;
  cancelChangeBroker: VoidFunction;
}

const ProgramSettings = compose<React.ComponentType<Props & WithLoaderProps>>(
  withLoader,
  React.memo
)(_ProgramSettings);
export default ProgramSettings;
