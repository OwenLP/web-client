import { FormikActions } from "formik";
import { GVTextField } from "gv-react-components";
import { GVTextFieldProps } from "gv-react-components/dist/gv-text-field";
import * as React from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";

class GVNumberFiled extends React.PureComponent<Props, State> {
  state = {
    init: true
  };
  handleOnChange = (value: NumberFormatValues) => {
    const { form, name, onChange } = this.props;
    if (onChange) onChange(value.value);
    this.setState({ init: false });
    form.setFieldValue(name, value.value);
  };
  render() {
    const { emptyInit, name, value, ...props } = this.props;
    const setEmpty = emptyInit && this.state.init;
    return (
      <GVTextField
        {...props}
        value={setEmpty ? "" : value}
        name={name}
        onValueChange={this.handleOnChange}
        InputComponent={NumberFormat}
      />
    );
  }
}
type Props = GVTextFieldProps & {
  form: FormikActions<void>;
  onChange(value: string): void;
  emptyInit: boolean;
};
interface State {
  init: boolean;
}

export default GVNumberFiled;
