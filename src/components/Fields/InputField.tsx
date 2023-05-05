import { ErrorMessage, useField } from "formik";
import { ChangeEvent } from "react";
type FieldSetProps = {
  label: string;
  name: string;
  type: string;
  setErrorMsg?: React.Dispatch<React.SetStateAction<string>>;
};

export const InputField = ({ label, setErrorMsg, ...props }: FieldSetProps) => {
  const [field] = useField(props);
  const { name, type } = props;
  return (
    <div className="form-floating mb-4">
      <input
        className="form-control"
        {...field}
        type={type}
        onChange={(e: ChangeEvent) => {
          if (setErrorMsg) {
            setErrorMsg("");
          }
          field.onChange(e);
        }}
      />
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <ErrorMessage name={name} className="error" component="div" />
    </div>
  );
};
