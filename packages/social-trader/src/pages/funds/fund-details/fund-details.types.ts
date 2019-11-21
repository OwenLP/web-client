import { IDialogProps } from "components/dialog/dialog";
import { FundDetailsFull } from "gv-api-web";
import React from "react";
import { ActionType, CurrencyEnum } from "utils/types";

import { SET_FUND_ID } from "./fund-details.constants";
import { FundIdState } from "./reducers/id.reducer";

export interface IDescriptionSection {
  WithdrawContainer: React.ComponentType<IFundWithdrawalContainerProps>;
  Controls: React.ComponentType<IFundControlsProps>;
}

export interface IFundWithdrawalContainerProps extends IDialogProps {
  id: string;
  accountCurrency: CurrencyEnum;
  assetCurrency: CurrencyEnum;
  onSubmit?: () => void;
}

export interface IFundControlsProps {
  isAuthenticated: boolean;
  fundDescription: FundDetailsFull;
}

export interface SetFundIdAction extends ActionType<FundIdState> {
  type: typeof SET_FUND_ID;
}
