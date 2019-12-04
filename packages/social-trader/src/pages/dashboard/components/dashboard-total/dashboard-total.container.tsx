import "./dashboard-total.scss";

import useApiRequest from "hooks/api-request.hook";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardTotal from "pages/dashboard/components/dashboard-total/dashboard-total";
import { getTotalLoaderData } from "pages/dashboard/dashboard.loaders-data";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

import { TDashboardTotal } from "../../dashboard.types";
import { getTotal } from "../../services/dashboard.service";

const _DashboardTotalContainer: React.FC<Props> = () => {
  const [t] = useTranslation();
  const currency = useSelector(currencySelector);
  const { data } = useApiRequest<TDashboardTotal>({
    fetchOnMount: true,
    fetchOnMountData: { currency },
    request: getTotal
  });
  return (
    <DashboardBlock
      label={t("dashboard-page.total.title")}
      // all={FINANCIAL_STATISTIC_ROUTE}
    >
      <DashboardTotal
        currency={currency}
        loaderData={getTotalLoaderData()}
        data={data!}
      />
    </DashboardBlock>
  );
};

interface Props {}

const DashboardTotalContainer = React.memo(_DashboardTotalContainer);
export default DashboardTotalContainer;
