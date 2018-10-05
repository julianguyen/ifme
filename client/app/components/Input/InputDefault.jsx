// @flow
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import css from './Input.scss';
import 'react-toastify/dist/ReactToastify.css';

export const REQUIRES_DEFAULT = ['text', 'number', 'time', 'date', 'hidden'];
export const DEFAULT_WITH_LABEL = ['text', 'number', 'time', 'date'];

export type Props = {
  id: string,
  type: string,
  name?: string,
  value?: any,
  placeholder?: string,
  readOnly?: boolean,
  disabled?: boolean,
  required?: boolean,
  minLength?: number,
  maxLength?: number,
  min?: number,
  max?: number,
  hasError?: Function,
  myRef?: any,
  label?: string,
  onClick?: Function,
};

const copyToClipBoard = (e) => {
  e.target.select();
  document.execCommand('copy');
  // TODO: Once i18n and react are playing nicely this can be changed
  toast('Secret Share Link Copied!', { autoClose: 5000 });
};

// event.target.select(); document.execCommand("copy");
const onFocus = (required: ?boolean, hasError: ?Function) => {
  if (required && hasError) {
    hasError(false);
  }
};

const onBlur = (
  e: SyntheticEvent<HTMLInputElement>,
  required: ?boolean,
  hasError: ?Function,
) => {
  const { value } = e.currentTarget;
  if (required && hasError) {
    hasError(!value);
  }
};

export const InputDefault = (props: Props) => {
  const {
    id,
    type,
    name,
    placeholder,
    readOnly,
    disabled,
    required,
    minLength,
    maxLength,
    min,
    max,
    value,
    hasError,
    myRef,
    label,
    onClick,
  } = props;
  if (!REQUIRES_DEFAULT.includes(type)) return null;
  return (
    <><input
      className={css.default}
      id={id}
      type={type}
      name={name}
      defaultValue={value}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      min={min}
      max={max}
      onFocus={() => onFocus(required, hasError)}
      onBlur={(e: SyntheticEvent<HTMLInputElement>) => onBlur(e, required, hasError)
      }
      ref={myRef}
      aria-label={label}
      onClick={(e: SyntheticEvent<HTMLInputElement>) => copyToClipBoard(e)}
    />
      <ToastContainer />
    </>

  );
};
