import { TFunction } from "i18next";
import { AnyObjectType } from "utils/types";
import { number, Schema, string } from "yup";

export interface Rule {
  value: number | string | RegExp;
  message: string;
}

// eslint-disable-next-line no-control-regex
export const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

export const generateRules = ({
  min,
  minLength,
  lessThan,
  max,
  maxLength,
  moreThan,
  pattern,
  required
}: {
  min?: Rule;
  minLength?: Rule;
  lessThan?: Rule;
  max?: Rule;
  maxLength?: Rule;
  moreThan?: Rule;
  pattern?: Rule;
  required?: string;
}) => {
  return {
    validate: (value: any) => {
      if (required && !value) return required;
      if (min !== undefined && value < min.value) return min.message;
      if (moreThan !== undefined && value <= moreThan.value)
        return moreThan.message;
      if (
        minLength !== undefined &&
        value &&
        value.trim().length < minLength.value
      )
        return minLength.message;
      if (lessThan !== undefined && value >= lessThan.value)
        return lessThan.message;
      if (max !== undefined && value > max.value) return max.message;
      if (
        maxLength !== undefined &&
        value &&
        value.trim().length > maxLength.value
      )
        return maxLength.message;
      if (
        pattern !== undefined &&
        !((pattern.value as unknown) as RegExp).test(value)
      )
        return pattern.message;
      return true;
    }
  };
};

export const lessThan = (limit: number, message?: string) => (
  value: number
) => {
  if (!value || value >= limit) return message || false;
  return true;
};

export const convertShapeToRules = (shape: Schema<any>) => ({
  validate: (value: any) => {
    try {
      shape.validateSync(value);
    } catch (e) {
      return e.message;
    }
  }
});

export const minMaxNumberRules = ({
  t,
  min = 0,
  max
}: {
  t: TFunction;
  min?: number;
  max: number;
}) => {
  return generateRules({
    required: t("validations.required"),
    min: {
      message: t("validations.min", {
        min
      }),
      value: min
    },
    max: {
      message: t("validations.max", {
        max
      }),
      value: max
    }
  });
};

export const emailValidator = string()
  .email("Invalid email address.")
  .required("Email is required.");

export const passwordValidator = (t: TFunction) =>
  string()
    .min(
      6,
      t("auth:password-restore.validators.password-is-short", {
        count: 6
      })
    )
    .required(t("auth:password-restore.validators.password-required"));

export const ethGvtWalletValidator = string().matches(
  /^0x[a-fA-F0-9]{40}$/,
  "Invalid wallet address"
);

export const btcWalletValidator = string().matches(
  /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
  "Invalid wallet address"
);

export const assetTitleShape = (t: TFunction) => {
  return string()
    .trim()
    .required(t("validations.title-required"))
    .min(4, t("validations.title-is-short"))
    .max(20, t("validations.title-is-long"))
    .matches(
      /^[-a-zA-Z0-9\s]{4,20}$/,
      t("validations.title-is-latin-and-numbers")
    );
};

export const assetTitleRules = (t: TFunction) => ({
  required: t("validations.title-required"),
  minLength: {
    value: 4,
    message: t("validations.title-is-short")
  },
  maxLength: {
    value: 20,
    message: t("validations.title-is-long")
  },
  pattern: {
    value: /^[-a-zA-Z0-9\s]{4,20}$/,
    message: t("validations.title-is-latin-and-numbers")
  }
});

export const assetDescriptionShape = (t: TFunction) => {
  return string()
    .trim()
    .required(t("validations.description-required"))
    .min(20, t("validations.description-is-short"))
    .max(500, t("validations.description-is-long"));
};

export const signalSuccessFeeShape = (
  t: TFunction,
  min: number,
  max: number
) => {
  return number()
    .min(min, t("validations.success-fee-min"))
    .required(t("validations.success-fee-required"))
    .max(
      max,
      t("validations.success-fee-max", {
        max
      })
    );
};

export const signalVolumeFeeShape = (
  t: TFunction,
  min: number = 0,
  max: number = 0.1
) => {
  return number()
    .required(t("validations.signal-volume-fee-required"))
    .min(
      min,
      t("validations.signal-volume-fee-min", {
        min
      })
    )
    .max(
      max,
      t("validations.signal-volume-fee-max", {
        max
      })
    );
};

export const entryFeeShape = (t: TFunction, max: number) =>
  number()
    .required(t("validations.entry-fee-required"))
    .min(0, t("validations.entry-fee-min"))
    .max(
      max,
      t("validations.entry-fee-max", {
        max
      })
    );

export const successFeeShape = (t: TFunction, max: number) =>
  number()
    .required(t("validations.success-fee-required"))
    .min(0, t("validations.success-fee-min"))
    .max(
      max,
      t("validations.success-fee-max", {
        max
      })
    );

export const exitFeeShape = (t: TFunction, max: number) =>
  number()
    .required(t("validations.exit-fee-required"))
    .min(0, t("validations.exit-fee-min"))
    .max(
      max,
      t("validations.exit-fee-max", {
        max
      })
    );

export const twoFactorRules = (t: TFunction) => ({
  pattern: {
    value: /^\d{6}$/,
    message: t("validations.two-factor-6digits")
  },
  required: t("profile-page:2fa-page.code-required")
});

export const depositAmountValidator = ({
  t,
  minValue,
  minText,
  max
}: {
  t: TFunction;
  minValue: number;
  minText?: number | string;
  max: number;
}) =>
  number()
    .required(t("validations.amount-required"))
    .min(
      minValue,
      t("validations.amount-is-zero", {
        min: minText || minValue
      })
    )
    .max(max, t("validations.amount-is-large"));

export const getConfirmPasswordValidationRules = ({
  t,
  watch
}: {
  t: TFunction;
  watch: () => AnyObjectType;
}) => {
  return {
    required: t("auth:password-restore.validators.confirm-password-required"),
    validate: (value: string) => {
      const { password } = watch();
      return value !== password
        ? t("auth:password-restore.validators.password-dont-match")
        : true;
    }
  };
};
