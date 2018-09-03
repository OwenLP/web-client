import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as dashboardProgramsService from "../../../services/dashboard-programs.service";
import DashboardPrograms from "./dashboard-programs";

class DashboardProgramsContainer extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.getPrograms();
  }

  render() {
    const { isPending, data, filters, service, paging, sorting } = this.props;
    return (
      <DashboardPrograms
        isPending={isPending}
        data={data || {}}
        sorting={{
          value: sorting,
          updateSorting: service.changeSorting
        }}
        filtering={{
          ...filters.filtering,
          updateFilter: service.programsChangeFilter
        }}
        paging={{
          total: paging.totalPages,
          current: paging.currentPage,
          updatePaging: service.changePage
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  const { itemsData, sorting, paging } = state.dashboard.programs;
  const { isPending, data } = itemsData;
  return { isPending, data, sorting, paging };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(dashboardProgramsService, dispatch)
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const filters = {}; // dispatchProps.service.getProgramsFilters();
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    filters
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DashboardProgramsContainer);
