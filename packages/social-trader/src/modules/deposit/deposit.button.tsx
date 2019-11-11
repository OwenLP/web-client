import FundDepositContainer from "modules/fund-deposit/fund-deposit";
import ProgramDeposit from "modules/program-deposit/program-deposit";
import React from "react";
import { useSelector } from "react-redux";
import InvestmentUnauthPopup from "shared/components/details/details-description-section/investment-unauth-popup/investment-unauth-popup";
import GVButton from "shared/components/gv-button";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { useTranslation } from "shared/i18n";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { CurrencyEnum } from "shared/utils/types";

const _DepositButton: React.FC<Props> = ({
  ownAsset,
  entryFee,
  type,
  id,
  currency,
  broker,
  availableToInvest
}) => {
  const [t] = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const [
    isOpenDepositPopup,
    setIsOpenDepositPopup,
    setIsDepositClosePopup
  ] = useIsOpen();
  const [
    isOpenUnAuthInvestPopup,
    setIsOpenUnAuthInvestPopup,
    setIsCloseUnAuthInvestPopup
  ] = useIsOpen();
  let deposit;
  switch (type) {
    case ASSET.FUND:
      deposit = (
        <FundDepositContainer
          entryFee={entryFee}
          availableToInvest={availableToInvest}
          open={isOpenDepositPopup}
          id={id}
          onClose={setIsDepositClosePopup}
        />
      );
      break;
    default:
      deposit = (
        <ProgramDeposit
          entryFee={entryFee}
          availableToInvest={availableToInvest}
          broker={broker}
          currency={currency}
          open={isOpenDepositPopup}
          id={id}
          onClose={setIsDepositClosePopup}
        />
      );
  }
  const label = ownAsset ? t("buttons.deposit") : t("buttons.invest");
  const openPopupMethod = isAuthenticated
    ? setIsOpenDepositPopup
    : setIsOpenUnAuthInvestPopup;
  return (
    <>
      <GVButton className="table-cards__button" onClick={openPopupMethod}>
        {label}
      </GVButton>
      {deposit}
      <InvestmentUnauthPopup
        message={t("program-details-page.description.unauth-popup")}
        title={""}
        currency={currency}
        availableToInvest={availableToInvest}
        asset={ASSET.PROGRAM}
        open={isOpenUnAuthInvestPopup}
        onClose={setIsCloseUnAuthInvestPopup}
      />
    </>
  );
};

interface Props {
  ownAsset?: boolean;
  entryFee?: number;
  availableToInvest?: number;
  broker: string;
  type: ASSET;
  id: string;
  currency: CurrencyEnum;
}

const DepositButton = React.memo(_DepositButton);
export default DepositButton;
