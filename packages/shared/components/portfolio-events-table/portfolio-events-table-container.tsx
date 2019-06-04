import * as React from "react";
import Surface from "shared/components/surface/surface";

import PortfolioEventsTable, {
  IPortfolioEventsTableOwnProps
} from "./portfolio-events-table";

const PortfolioEventsTableContainer: React.FC<Props> = ({
  tableTitle,
  className,
  fetchPortfolioEvents,
  dateRangeStartLabel,
  eventTypeFilterValues
}) => {
  return (
    <Surface className="dashboard-portfolio-events-all">
      <PortfolioEventsTable
        fetchPortfolioEvents={fetchPortfolioEvents}
        title={tableTitle}
        className={className}
        dateRangeStartLabel={dateRangeStartLabel}
        eventTypeFilterValues={eventTypeFilterValues}
      />
    </Surface>
  );
};

interface Props extends IPortfolioEventsTableOwnProps {
  tableTitle: string;
}

export default React.memo(PortfolioEventsTableContainer);
