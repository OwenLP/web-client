import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";

export const FundsIcon: React.FC<IIconProps> = props => (
  <Icon type={"funds"} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18">
      <g fill="none" fillRule="evenodd" strokeWidth="2">
        <path stroke="#15BBAF" strokeLinejoin="round" d="M1 16.3157895h17" />
        <path
          stroke="#14BEB4"
          d="M1.08614728 9.48159404l3.0300615-3.12722498L7.49988892 9.3471015l3.87941938-4.87842392 2.3131889 1.7985097 3.7510469-4.78384514"
        />
      </g>
    </svg>
  </Icon>
);
