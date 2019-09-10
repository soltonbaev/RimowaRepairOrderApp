import { ACTION_PASS } from "../config";
export const isActionAlowed = pass => pass === ACTION_PASS;

export const validator = {
  required: value => (value ? undefined : "required*"),
  email: value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? "Invalid email address"
      : undefined,
  maxLength: max => value =>
    value && value.length > max
      ? `Must be ${max} characters or less`
      : undefined,
  minLength: min => value =>
    value && value.length < min
      ? `Must be at least ${min} characters`
      : undefined
};
