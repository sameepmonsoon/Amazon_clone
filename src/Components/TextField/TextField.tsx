// @ts-nocheck
import { forwardRef, useEffect, useState } from "react";
import "./TextField.scss";
type TextFieldProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  error?: string | FormikErrors<any> | string[] | FormikErrors<any>[];
  prefix?: string | number | JSX.Element;
  suffix?: string | number | JSX.Element;
  icon?: JSX.Element;
  defaultValue?: any;
  type?: string;
  incrementIcon?: any;
  decrementIcon?: any;
  value?: string | number;
  min?: string | number;
  hideNumberChange?: boolean;
  onChange?: (e: any) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  disabled?: boolean;
  maxLength?: number;
};
export function friendlyName(name: string) {
  if (name) {
    return name
      .trim()
      .replace("_id", "")
      .replace(/[\W_]+/g, " ")
      .split(" ")
      .map(
        (element) =>
          element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
      )
      .join(" ");
  }
  return "";
}
export const TextField = forwardRef(
  (
    {
      name,
      label,
      type,
      placeholder,
      error,
      prefix,
      suffix,
      icon,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      maxLength,
      hideNumberChange,
      min,
      value,
      disabled = false,
      ...rest
    }: TextFieldProps,
    ref
  ) => {
    const [defaultValueState, setDefaultValue] = useState("");
    const input = document.querySelector(`#input-${name}`);
    const theme = "light";
    const inputPrototype = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    function labelText() {
      const text = label || friendlyName(name);
      if (error) {
        return `${text} ${error}.`;
      }
      // modifications
      return text;
    }

    return (
      <div className="textfield-container">
        <div>
          <label error={error} theme={theme}>
            {labelText()}
          </label>
        </div>

        <div>
          <input
            ref={ref}
            id={`input-${name}`}
            name={name}
            value={value}
            placeholder={placeholder || friendlyName(name)}
            defaultValue={defaultValueState}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            prefix={!!prefix}
            min={min || 0}
            maxLength={maxLength || 35}
            type={type}
            theme={theme}
            disabled={disabled}
            {...rest}
          />
          {icon && (
            <div
              suffix={!!suffix}
              type={!!type}
              hideNumberChange={!!hideNumberChange}>
              {icon}
            </div>
          )}

          {suffix && (
            <div type={!!type} hideNumberChange={!!hideNumberChange}></div>
          )}
        </div>
      </div>
    );
  }
);
