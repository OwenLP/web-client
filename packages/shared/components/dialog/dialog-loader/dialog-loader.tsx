import "../dialog.scss";

import * as React from "react";
import { DialogBottom } from "shared/components/dialog/dialog-bottom";

import { DialogLoaderButton, DialogLoaderHeader, DialogLoaderInput, DialogLoaderStat } from "./dialog-loader-elements";

export const DialogLoader: React.FC = () => (
  <React.Fragment>
    <div className="dialog__top">
      <DialogLoaderHeader />
      <div className="dialog-field">
        <DialogLoaderStat />
      </div>
    </div>
    <DialogBottom>
      <div className="dialog__wrapper">
        <DialogLoaderInput />
      </div>
      <div className="dialog__wrapper">
        <DialogLoaderInput />
      </div>
      <div className="dialog__buttons">
        <DialogLoaderButton />
      </div>
    </DialogBottom>
  </React.Fragment>
);
