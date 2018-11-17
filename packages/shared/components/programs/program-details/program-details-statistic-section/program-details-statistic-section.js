import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import React, { PureComponent } from "react";

import { DEFAULT_PERIOD } from "shared/components/chart/chart-period/chart-period.helpers";

import ProgramDetailsChartSection from "./program-details-chart-section/program-details-chart-section";
import ProgramDetailsStatistic from "./program-details-statistics/program-details-statistics";

class ProgramDetailsStatisticSection extends PureComponent {
  state = {
    statisticData: { data: null, isPending: true },
    profitChartData: { data: null, isPending: true },
    balanceChartData: { data: null, isPending: true },
    period: DEFAULT_PERIOD,
    prevProps: null
  };

  static getDerivedStateFromProps(props, state) {
    let newState = {};
    if (state.prevProps !== props) {
      newState.prevProps = props;
      newState.statisticData = props.statisticData;
      newState.profitChartData = props.profitChartData;
      newState.balanceChartData = props.balanceChartData;
      return newState;
    }

    return state;
  }

  handlePeriodChange = period => {
    const { programId, currency, getProgramStatistic } = this.props;

    getProgramStatistic(programId, currency, period).then(data => {
      this.setState({ period, ...data });
    });
  };

  render() {
    const { statisticData, profitChartData, balanceChartData } = this.state;
    const { period } = this.state;
    if (!profitChartData.data) return null;
    return (
      <div className="details-statistic-section">
        <div className="details-statistic-section__statistic">
          <ProgramDetailsStatistic
            statisticData={statisticData}
            profitChartData={profitChartData}
            period={period}
          />
        </div>
        <div className="details-statistic-section__chart">
          <ProgramDetailsChartSection
            profitChartData={profitChartData}
            balanceChartData={balanceChartData}
            period={period}
            onPeriodChange={this.handlePeriodChange}
          />
        </div>
      </div>
    );
  }
}

export default ProgramDetailsStatisticSection;
