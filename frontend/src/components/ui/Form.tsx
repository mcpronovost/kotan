import type { Icon, IconProps } from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import { IconEye, IconEyeOff, IconSquareRounded, IconSquareRoundedCheck, IconCheck, IconX } from "@tabler/icons-react";
import { mokpClass } from "@/utils";
import MokpAlert from "./Alert";

interface TypeUiFormFieldChecklistItem {
  label: string;
  test: (value: string) => boolean;
}

interface TypeUiFormProps extends React.HTMLAttributes<HTMLElement> {
  loading: boolean;
  onSubmit: (value: string) => void;
  children: React.ReactNode;
}

interface TypeUiFormFieldProps extends React.HTMLAttributes<HTMLElement> {
  type: string;
  name: string;
  label?: string;
  hideLabel: boolean;
  placeholder?: string;
  required: boolean;
  helptext?: string;
  helplist?: TypeUiFormFieldChecklistItem[];
  icon?: Icon;
  value: string;
  error: string;
  onChange: (value: string) => void;
  children?: React.ReactNode;
}

interface TypeUiFormAlertProps extends React.HTMLAttributes<HTMLElement> {
  error?: string;
  errorTitle?: string;
  success?: string;
  successTitle?: string;
}

function MokpUiForm({ loading, onSubmit, children, ...props }: TypeUiFormProps) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit && !loading) {
      onSubmit(e);
    }
  };

  return (
    <form className="mokp-form" onSubmit={handleSubmit} disabled={loading} {...props}>
      {children}
    </form>
  );
}

function MokpUiFormField({
  type = "text",
  name,
  label,
  hideLabel = false,
  placeholder,
  required = false,
  helptext,
  helplist,
  icon: IconComponent,
  value,
  error,
  onChange = () => {},
  children,
  ...props
}: TypeUiFormFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [nativeError, setNativeError] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const errorMessage = error ?? nativeError;

  const getErrorMessage = (validity: ValidityState, type: string): string | undefined => {
    if (validity.valueMissing) return "Ce champ est requis";
    if (validity.typeMismatch) return "Format invalide (ex: email doit contenir un @)";
    if (validity.tooShort) return "Trop court";
    if (validity.tooLong) return "Trop long";
    if (validity.patternMismatch) return "Format invalide";
    return undefined;
  };

  const handleChange = (v: string) => {
    onChange(v);
    const input = inputRef.current;
    if (!input) return;
    input.checkValidity();
    setNativeError(getErrorMessage(input.validity, input.type));
  };

  return (
    <div className="mokp-form-field" {...props}>
      {!hideLabel ? (
        <label className="mokp-form-field-label" htmlFor={`field-${name}`}>
          {label}
          {required && <span className="mokp-form-field-required">*</span>}
        </label>
      ) : null}
      <div
        className={mokpClass(
          "mokp-form-field-input",
          ["checkbox"].includes(type) && "mokp-unbox",
          errorMessage && "mokp-invalid",
        )}
      >
        {IconComponent && (
          <div className="mokp-form-field-input-prepend">
            <IconComponent size={19} />
          </div>
        )}
        <div className="mokp-form-field-input-content">
          {type === "checkbox" ? (
            <div className="mokp-form-field-input-content-labeled">
              <input
                ref={inputRef}
                id={`field-${name}`}
                name={name}
                type={type}
                checked={value}
                onChange={(e) => handleChange(e)}
                aria-describedby={helptext ? `hint-${name}` : undefined}
              />
              <label htmlFor={`field-${name}`}>
                <span className="mokp-form-field-input-content-labeled-icon">
                  {value ? (
                    <IconSquareRoundedCheck size={22} color="var(--mokp-c-accent)" />
                  ) : (
                    <IconSquareRounded size={22} />
                  )}
                </span>
                <div>{children}</div>
              </label>
            </div>
          ) : (
            <input
              ref={inputRef}
              id={`field-${name}`}
              name={name}
              placeholder={placeholder}
              type={type === "password" && showPassword ? "text" : type}
              autoComplete="off"
              value={value}
              onChange={(e) => handleChange(e)}
              aria-describedby={helptext ? `hint-${name}` : undefined}
            />
          )}
        </div>
        {type === "password" ? (
          <div className="mokp-form-field-input-append mokp-clickable" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <IconEye size={19} /> : <IconEyeOff size={19} />}
          </div>
        ) : null}
      </div>
      {errorMessage ? (
        <div className="mokp-form-field-error" role="alert">
          <p>{errorMessage}</p>
        </div>
      ) : (value && helplist) ? (
        <ul className="mokp-form-field-helplist" id={`hint-${name}`}>
          {helplist.map((rule, i) => {
            const isValid = value ? rule.test(value) : false;
            return (
              <li key={i} className={isValid ? "mokp-valid" : undefined}>
                {isValid ? <IconCheck size={14} /> : <IconX size={14} />}
                <span>{rule.label}</span>
              </li>
            );
          })}
        </ul>
      ) : helptext ? (
        <div className="mokp-form-field-helptext">
          <p id={`hint-${name}`}>{helptext}</p>
        </div>
      ) : null}
    </div>
  );
}

function MokpUiFormAlert({ error, errorTitle, success, successTitle, ...props }: TypeUiFormAlertProps) {
  return (
    <>
      {error ? <MokpAlert title={errorTitle} message={error} variant="danger" ghost {...props} /> : null}
      {success ? <MokpAlert title={successTitle} message={success} variant="success" ghost {...props} /> : null}
    </>
  );
}

namespace MokpUiForm {
  export const Field = MokpUiFormField;
  export const Alert = MokpUiFormAlert;
}

export default MokpUiForm;
