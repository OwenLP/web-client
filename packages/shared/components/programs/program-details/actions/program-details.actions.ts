import {
  CancelablePromise,
  InvestmentEventViewModels,
  ProgramBalanceChart,
  ProgramDetailsFull,
  ProgramPeriodsViewModel,
  ProgramProfitCharts,
  ProgramsLevelsInfo,
  SignalProviderSubscribers,
  TradesViewModel
} from "gv-api-web";
import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "shared/components/chart/chart-period/chart-period.helpers";
import { TStatisticCurrencyAction } from "shared/components/details/reducers/statistic-currency.reducer";
import { TStatisticPeriodAction } from "shared/components/details/reducers/statistic-period.reducer";
import { EVENTS_ACTION_TYPE } from "shared/components/portfolio-events-table/portfolio-events-table.constants";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import platformApi from "shared/services/api-client/platform-api";
import programsApi from "shared/services/api-client/programs-api";
import { ActionType, ApiAction, CurrencyEnum } from "shared/utils/types";

import {
  FETCH_LEVEL_PARAMETERS,
  FETCH_PROGRAM_BALANCE_CHART,
  FETCH_PROGRAM_DESCRIPTION,
  FETCH_PROGRAM_PROFIT_CHART,
  PROGRAM_FINANCIAL_STATISTIC,
  PROGRAM_OPEN_POSITIONS,
  PROGRAM_PERIOD_HISTORY,
  PROGRAM_SUBSCRIPTIONS,
  PROGRAM_TRADES,
  SET_PROGRAM_ID,
  SET_PROGRAM_STATISTIC_CURRENCY,
  SET_PROGRAM_STATISTIC_PERIOD
} from "../program-details.constants";
import { ProgramIdState } from "../reducers/id.reducer";
import {
  EVENT_LOCATION,
  fetchPortfolioEventsWithoutTable
} from "../services/program-details.service";

const sendProgramChartRequest = (
  { start, end }: ChartDefaultPeriod,
  id: string,
  currency: CurrencyEnum
): CancelablePromise<ProgramProfitCharts> =>
  programsApi.getProgramProfitChart(id, {
    dateFrom: start,
    dateTo: end,
    maxPointCount: 100,
    currency
  });

export const statisticCurrencyAction = (
  currency: CurrencyEnum
): TStatisticCurrencyAction => ({
  type: SET_PROGRAM_STATISTIC_CURRENCY,
  payload: currency
});

export const statisticPeriodAction = (
  period: ChartDefaultPeriod
): TStatisticPeriodAction => ({
  type: SET_PROGRAM_STATISTIC_PERIOD,
  payload: period
});

export const fetchEventsAction = (
  assetId: string,
  eventLocation: EVENT_LOCATION,
  filters?: ComposeFiltersAllType
): ActionType<CancelablePromise<InvestmentEventViewModels>> => ({
  type: EVENTS_ACTION_TYPE,
  payload: fetchPortfolioEventsWithoutTable(eventLocation, {
    ...filters,
    assetId
  })
});

export const fetchProgramProfitChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currencies: CurrencyEnum[]
): ApiAction<ProgramProfitCharts> => ({
  type: FETCH_PROGRAM_PROFIT_CHART,
  payload: programsApi.getProgramProfitPercentCharts(id, {
    dateFrom: period.start,
    dateTo: period.end,
    currencies
  })
});

export const fetchProgramBalanceChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currency: CurrencyEnum
): ApiAction<ProgramBalanceChart> => ({
  type: FETCH_PROGRAM_BALANCE_CHART,
  payload: programsApi.getProgramBalanceChart(id, {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  })
});

export const fetchProgramDescriptionAction = (
  id: string,
  authorization: string
): ApiAction<ProgramDetailsFull> => ({
  type: FETCH_PROGRAM_DESCRIPTION,
  payload: programsApi.getProgramDetails(id, { authorization })
});

export const fetchLevelParametersAction = (
  currency: CurrencyEnum
): ApiAction<ProgramsLevelsInfo> => ({
  type: FETCH_LEVEL_PARAMETERS,
  payload: platformApi.getProgramLevels({ currency })
});

export const fetchOpenPositionsAction = (
  id: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<TradesViewModel>> => ({
  type: PROGRAM_OPEN_POSITIONS,
  payload: programsApi.getProgramOpenTrades(id, filters)
});

export const fetchTradesAction = (
  id: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<TradesViewModel>> => ({
  type: PROGRAM_TRADES,
  payload: programsApi.getProgramTrades(id, filters)
});

export const fetchPeriodHistoryAction = (
  id: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<ProgramPeriodsViewModel>> => ({
  type: PROGRAM_PERIOD_HISTORY,
  payload: programsApi.getProgramPeriods(id, filters)
});

export const fetchFinancialStatisticAction = (
  id: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<ProgramPeriodsViewModel>> => ({
  type: PROGRAM_FINANCIAL_STATISTIC,
  payload: programsApi.getProgramPeriods(id, filters)
});

export const fetchSubscriptionsAction = (
  id: string,
  authorization: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<SignalProviderSubscribers>> => ({
  type: PROGRAM_SUBSCRIPTIONS,
  payload: programsApi.getProgramSubscribers(id, authorization, filters)
});

export interface SetProgramIdAction extends ActionType<ProgramIdState> {
  type: typeof SET_PROGRAM_ID;
}
export const setProgramIdAction = (id: string): SetProgramIdAction => ({
  type: SET_PROGRAM_ID,
  payload: id
});
