import { Dispatch } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import signalApi from "shared/services/api-client/signal-api";
import authService from "shared/services/auth-service";

import * as actions from "../actions/copytrading-tables.actions";

export const getCopytradingOpenTrades = (filters: any) => {
  const authorization = authService.getAuthArg();
  return actions.fetchCopytradingOpenTrades(authorization, filters);
};

export const getCopytradingTradesHistory = (filters: any) => {
  const authorization = authService.getAuthArg();
  return actions.fetchCopytradingTradesHistory(authorization, filters);
};

export interface ICopytradingTradesCounts {
  openTradesCount?: number;
  historyCount?: number;
}
export const fetchCopytradingTradesCount = (): Promise<
  ICopytradingTradesCounts
> => {
  const authorization = authService.getAuthArg();
  const filtering = { take: 0 };
  return Promise.all([
    signalApi.v10SignalTradesOpenGet(authorization, filtering),
    signalApi.v10SignalTradesGet(authorization, filtering)
  ]).then(([openTradesData, historyData]) => ({
    openTradesCount: openTradesData.total,
    historyCount: historyData.total
  }));
};

export const closeCopytradingTrade = (id: string, onSuccess: () => void) => (
  dispatch: Dispatch
) => {
  const authorization = authService.getAuthArg();
  return signalApi
    .v10SignalTradesByIdClosePost(id, authorization)
    .then(() => {
      onSuccess();
      dispatch(
        alertMessageActions.success(
          "investor.dashboard-page.trades.close-trade-confirm.success-message",
          true
        )
      );
    })
    .catch(() => {
      dispatch(
        alertMessageActions.error(
          "investor.dashboard-page.trades.close-trade-confirm.error-message",
          true
        )
      );
    });
};
