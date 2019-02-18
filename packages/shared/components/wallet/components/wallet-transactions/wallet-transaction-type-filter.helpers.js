import { FilterType } from "shared/components/table/helpers/filtering.helpers";

export const composeDefaultTransactionTypeFilter = () => ({
  name: "txAction",
  composeRequestValue: value => value,
  defaultValue: undefined,
  type: FilterType.general
});

export const reduceFilters = filters => {
  return filters.map(filter => ({ value: filter, label: filter }));
};
