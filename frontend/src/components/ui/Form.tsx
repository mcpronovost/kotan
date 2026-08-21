import type { Icon, IconProps } from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { mokpClass } from "@/utils";

interface TypeUiFormProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

interface TypeUiFormFieldProps extends React.HTMLAttributes<HTMLElement> {
  type: string;
  name: string;
  label?: string;
  hideLabel: boolean;
  required: boolean;
  helptext?: string;
  icon?: Icon;
  value: string;
  error: string;
  onChange: (value: string) => void;
}

function MokpUiForm({ children, ...props }: TypeUiFormProps) {
  return (
    <form className="mokp-form" {...props}>
      {children}
    </form>
  );
}

function MokpUiFormField({
  type = "text",
  name,
  label,
  hideLabel = false,
  required = false,
  helptext,
  icon: IconComponent,
  value,
  error,
  onChange = () => {},
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
                onChange={(e) => handleChange(e.target.value)}
                aria-describedby={helptext ? `hint-${name}` : undefined}
              />
              <label>{label}</label>
            </div>
          ) : (
            <input
              ref={inputRef}
              id={`field-${name}`}
              name={name}
              type={type === "password" && showPassword ? "text" : type}
              autoComplete="off"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
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
      ) : helptext ? (
        <div className="mokp-form-field-helptext">
          <p id={`hint-${name}`}>{helptext}</p>
        </div>
      ) : null}
    </div>
  );
}

namespace MokpUiForm {
  export const Field = MokpUiFormField;
}

export default MokpUiForm;
