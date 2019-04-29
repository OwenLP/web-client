import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";

const SERVER_DATE_RANGE_MIN_FILTER_NAME = "dateFrom";
const SERVER_DATE_RANGE_MAX_FILTER_NAME = "dateTo";
export const PROGRAM_TRADES_SORTING = "ByDateDesc";
export const PROGRAM_FOREX_TRADES_COLUMNS: SortingColumn[] = [
  {
    name: "direction-entry",
    sortingName: "ByDirection"
  },
  {
    name: "symbol",
    sortingName: "BySymbol"
  },
  {
    name: "volume",
    sortingName: "ByVolume"
  },
  {
    name: "price",
    sortingName: "ByPrice"
  },
  {
    name: "profit",
    sortingName: "ByProfit"
  },
  {
    name: "commission"
  },
  {
    name: "swap"
  },
  {
    name: "date",
    sortingName: "ByDate"
  },
  {
    name: "ticket",
    sortingName: "ByTicket"
  }
];
export const PROGRAM_TRADES_COLUMNS: SortingColumn[] = [
  {
    name: "direction-entry",
    sortingName: "ByDirection"
  },
  {
    name: "symbol",
    sortingName: "BySymbol"
  },
  {
    name: "volume",
    sortingName: "ByVolume"
  },
  {
    name: "price",
    sortingName: "ByPrice"
  },
  {
    name: "profit",
    sortingName: "ByProfit"
  },
  {
    name: "commission"
  },
  {
    name: "date",
    sortingName: "ByDate"
  }
];
export const PROGRAM_OPEN_POSITIONS_COLUMNS: SortingColumn[] = [
  {
    name: "date",
    sortingName: "ByDate"
  },
  {
    name: "symbol",
    sortingName: "BySymbol"
  },
  {
    name: "direction",
    sortingName: "ByDirection"
  },
  {
    name: "volume",
    sortingName: "ByVolume"
  },
  {
    name: "price",
    sortingName: "ByPrice"
  },
  {
    name: "priceCurrent",
    sortingName: "ByPriceCurrent"
  },
  {
    name: "profit",
    sortingName: "ByProfit"
  }
  /*{
    name: "profitPercent",
    sortingName: "ByProfitPercent"
  }*/
];

export const PROGRAM_TRADES_DEFAULT_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      composeApiRequestValue: composeRequestValueFunc(
        SERVER_DATE_RANGE_MIN_FILTER_NAME,
        SERVER_DATE_RANGE_MAX_FILTER_NAME
      )
    })
  }
];

export const PROGRAM_TRADES_FILTERS = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};
