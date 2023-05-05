import { ErrorMessage, Field } from "formik";
type TextareaProps = {
  label: string;
  name: string;
};

export const TextareaField = ({ label, name }: TextareaProps) => {
  return (
    <div className=" form-floating mb-4">
      <Field className="form-control" as="textarea" name={name} id={name} />
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <ErrorMessage name={name} className="error" component="div" />
    </div>
  );
};
