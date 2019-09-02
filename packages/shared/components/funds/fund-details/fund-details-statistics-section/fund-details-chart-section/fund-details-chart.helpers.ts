import { PlatformCurrency } from "gv-api-web";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { ISelectChangeEvent } from "shared/components/select/select";
import { TChartCurrency } from "shared/modules/chart-currency-selector/chart-currency-selector";
import { platformCurrenciesSelector } from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum, HandlePeriodChangeType } from "shared/utils/types";

import {
  statisticCurrencyAction,
  statisticPeriodAction
} from "../../actions/fund-details.actions";
import {
  FundBalanceChartDataType,
  fundBalanceChartSelector
} from "../../reducers/balance-chart.reducer";
import { fundIdSelector } from "../../reducers/description.reducer";
import {
  FundProfitChartDataType,
  fundProfitChartSelector
} from "../../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../../reducers/statistic-currency.reducer";
import { statisticPeriodSelector } from "../../reducers/statistic-period.reducer";
import {
  getBalanceChart,
  getProfitChart
} from "../../services/fund-details.service";

export const convertToChartCurrency = ({
  name,
  color
}: PlatformCurrency): TChartCurrency => ({
  name: name as CurrencyEnum,
  color
});

export const platformChartCurrenciesSelector = createSelector<
  RootState,
  PlatformCurrency[],
  TChartCurrency[]
>(
  state => platformCurrenciesSelector(state),
  currencies => currencies.map(convertToChartCurrency)
);

type TUseFundChartStateData = () => {
  platformCurrencies: TChartCurrency[];
  profitChart?: FundProfitChartDataType;
  balanceChart?: FundBalanceChartDataType;
  selectedCurrencies: TChartCurrency[];
  setSelectedCurrencies: (currencies: TChartCurrency[]) => void;
};

export const useFundChartStateData: TUseFundChartStateData = () => {
  const dispatch = useDispatch();
  const id = useSelector(fundIdSelector);
  const period = useSelector(statisticPeriodSelector);
  const statisticCurrency = useSelector(statisticCurrencySelector);
  const platformCurrencies = useSelector(platformChartCurrenciesSelector);
  const profitChart = useSelector(fundProfitChartSelector);
  const balanceChart = useSelector(fundBalanceChartSelector);
  const [selectedCurrencies, setSelectedCurrencies] = useState<
    TChartCurrency[]
  >([platformCurrencies.find(({ name }) => name === statisticCurrency)!]);
  useEffect(
    () => {
      const currencies = selectedCurrencies.map(({ name }) => name);
      const opts = {
        id,
        period,
        currencies
      };
      dispatch(getBalanceChart(opts));
      dispatch(getProfitChart(opts));
    },
    [period, id, selectedCurrencies, dispatch]
  );
  return {
    platformCurrencies,
    profitChart,
    balanceChart,
    selectedCurrencies,
    setSelectedCurrencies
  };
};

type TUseFundChartStateValues = () => {
  selectedCurrencies: TChartCurrency[];
  selectCurrencies: TChartCurrency[];
  addCurrency: () => void;
  removeCurrency: (name: string) => void;
  changeCurrency: (i: number) => (event: ISelectChangeEvent) => void;
};

export const useFundChartStateValues: TUseFundChartStateValues = () => {
  const dispatch = useDispatch();
  const {
    platformCurrencies,
    selectedCurrencies,
    setSelectedCurrencies
  } = useFundChartStateData();
  const [selectCurrencies, setSelectCurrencies] = useState<TChartCurrency[]>(
    []
  );
  useEffect(
    () => {
      setSelectCurrencies(
        platformCurrencies.filter(
          ({ name }) =>
            !!!selectedCurrencies.find(currency => currency.name === name)
        )
      );
    },
    [platformCurrencies, selectedCurrencies]
  );

  const addCurrency = useCallback(
    () => {
      setSelectedCurrencies([...selectedCurrencies, selectCurrencies[0]]);
    },
    [selectedCurrencies, selectCurrencies]
  );
  const removeCurrency = useCallback(
    (name: string) => {
      setSelectedCurrencies([
        ...selectedCurrencies.filter(item => item.name !== name)
      ]);
    },
    [selectedCurrencies]
  );
  const changeCurrency = useCallback(
    (i: number) => (event: ISelectChangeEvent) => {
      const newSelectedCurrencies = selectedCurrencies.filter(
        ({ name }) => name !== event.target.value
      );
      newSelectedCurrencies[i] = platformCurrencies.find(
        ({ name }) => name === event.target.value
      )!;
      setSelectedCurrencies([...newSelectedCurrencies]);
      dispatch(statisticCurrencyAction(newSelectedCurrencies[0].name));
    },
    [selectedCurrencies, platformCurrencies, dispatch]
  );
  return {
    addCurrency,
    removeCurrency,
    changeCurrency,
    selectedCurrencies,
    selectCurrencies
  };
};

type TUseChartPeriod = () => {
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
};
export const useChartPeriod: TUseChartPeriod = () => {
  const period = useSelector(statisticPeriodSelector);
  const dispatch = useDispatch();
  const setPeriod = useCallback(
    period => {
      dispatch(statisticPeriodAction(period));
    },
    [dispatch]
  );
  return {
    period,
    setPeriod
  };
};

type TChartData<T> = {
  chart: T;
  selectedCurrencies: TChartCurrency[];
};

export const useChartData = <T>(
  chart: T,
  selectedCurrencies: TChartCurrency[]
): TChartData<T> => {
  const [chartData, setChartData] = useState<TChartData<T>>({
    chart,
    selectedCurrencies
  });
  useEffect(
    () => {
      setChartData({
        chart,
        selectedCurrencies: [...selectedCurrencies]
      });
    },
    [chart, selectedCurrencies]
  );
  return chartData;
};
