import inputImageShape from "components/form/input-image/input-image.validation";
import { Broker, ProgramMinInvestAmount } from "gv-api-web";
import { TFunction } from "i18next";
import {
  currencyShape,
  investmentLimitShape,
  periodLengthShape,
  stopOutLevelShape
} from "pages/convert-asset/components/convert-asset-settings.helpers";
import { convertToCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import {
  assetDescriptionShape,
  assetTitleShape,
  entryFeeShape,
  successFeeShape
} from "utils/validators/validators";
import { lazy, number, object } from "yup";

import {
  CREATE_PROGRAM_FIELDS,
  ICreateProgramSettingsFormValues
} from "./create-program-settings";

const createProgramSettingsValidationSchema = ({
  minInvestAmounts,
  maxManagementFee,
  maxSuccessFee,
  hasInvestmentLimit,
  rate,
  available,
  broker,
  t
}: {
  minInvestAmounts: Array<ProgramMinInvestAmount>;
  maxManagementFee: number;
  maxSuccessFee: number;
  hasInvestmentLimit: boolean;
  rate: number;
  available: number;
  t: TFunction;
  broker: Broker;
}) => {
  return lazy<ICreateProgramSettingsFormValues>(values => {
    const currency = values[CREATE_PROGRAM_FIELDS.currency];
    const accountType = safeGetElemFromArray(
      broker.accountTypes,
      ({ id }) => values[CREATE_PROGRAM_FIELDS.brokerAccountTypeId] === id
    );
    const minDepositCreateAssetArray = safeGetElemFromArray(
      minInvestAmounts,
      ({ serverType }) => serverType === accountType.type
    ).minDepositCreateAsset;

    const minDepositAmount = safeGetElemFromArray(
      minDepositCreateAssetArray,
      amountWithCurrency => amountWithCurrency.currency === currency
    ).amount;

    const minDeposit = convertToCurrency(minDepositAmount, rate);

    const minDepositText = parseFloat(
      formatCurrencyValue(minDeposit, currency)
    );
    return object<ICreateProgramSettingsFormValues>().shape({
      [CREATE_PROGRAM_FIELDS.currency]: currencyShape(t),
      [CREATE_PROGRAM_FIELDS.periodLength]: periodLengthShape(t),
      [CREATE_PROGRAM_FIELDS.stopOutLevel]: stopOutLevelShape(t),
      [CREATE_PROGRAM_FIELDS.entryFee]: entryFeeShape(t, maxManagementFee),
      [CREATE_PROGRAM_FIELDS.successFee]: successFeeShape(t, maxSuccessFee),
      [CREATE_PROGRAM_FIELDS.investmentLimit]: investmentLimitShape(
        hasInvestmentLimit,
        t
      ),
      [CREATE_PROGRAM_FIELDS.logo]: inputImageShape(t),
      [CREATE_PROGRAM_FIELDS.title]: assetTitleShape(t),
      [CREATE_PROGRAM_FIELDS.description]: assetDescriptionShape(t),
      [CREATE_PROGRAM_FIELDS.depositAmount]: number()
        .required(t("validations.amount-required"))
        .min(
          minDeposit,
          t("validations.amount-is-zero", {
            min: minDepositText
          })
        )
        .max(available, t("validations.amount-is-large"))
    });
  });
};

export default createProgramSettingsValidationSchema;
