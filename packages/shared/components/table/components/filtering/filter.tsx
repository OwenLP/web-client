import "rc-slider/assets/index.css";

import "./filter.scss";

import * as React from "react";
import Popover, {
  HORIZONTAL_POPOVER_POS
} from "shared/components/popover/popover";
import { Nullable } from "shared/utils/types";

import FilterArrowIcon from "./filter-arrow-icon";
import { IUpdateFilterFunc } from "../table.types";

interface IFilterProps {
  label: string;
  value: any;
  renderValueText(value: any): string;
  updateFilter?: IUpdateFilterFunc;
  name: string;
}

interface IFilterState {
  anchor: Nullable<EventTarget>;
}

class Filter extends React.PureComponent<IFilterProps, IFilterState> {
  state = {
    anchor: null
  };

  handleOpenPopover = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    this.setState({ anchor: event.currentTarget });
  handleClosePopover = () => this.setState({ anchor: null });
  handleChangeFilter = (value: any) => {
    this.handleClosePopover();
    this.props.updateFilter &&
      this.props.updateFilter({ name: this.props.name, value });
  };

  render() {
    const { label, value, renderValueText, children } = this.props;
    const { anchor } = this.state;
    const child = React.cloneElement(children as React.ReactElement<any>, {
      value,
      changeFilter: this.handleChangeFilter,
      cancel: this.handleClosePopover
    });
    return (
      <>
        <div className="filter" onClick={this.handleOpenPopover}>
          <div className="filter__label">{label}</div>
          <div className="filter__value">{renderValueText(value)}</div>
          <FilterArrowIcon isOpen={anchor !== null} />
        </div>
        <Popover
          anchorEl={anchor}
          onClose={this.handleClosePopover}
          horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
          noPadding
        >
          {child}
        </Popover>
      </>
    );
  }
}

export default Filter;
