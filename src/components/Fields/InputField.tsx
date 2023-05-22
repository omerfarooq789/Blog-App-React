import { Stack, TextField } from "@mui/material";
import { useField } from "formik";
import { ChangeEvent } from "react";
type FieldSetProps = {
  label: string;
  name: string;
  type: string;
  setErrorMsg?: React.Dispatch<React.SetStateAction<string>>;
};

export const InputField = ({
  label,
  setErrorMsg,
  name,
  ...props
}: FieldSetProps) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...props,
    error: meta && meta.touched && meta.error ? true : false,
    helperText: meta && meta.touched && meta.error ? meta.error : "",
    onChange: (e: ChangeEvent) => {
      if (setErrorMsg) {
        setErrorMsg("");
      }
      field.onChange(e);
    },
  };

  return (
    <Stack spacing={2} my={3}>
      <TextField label={label} {...configTextField} />
    </Stack>
  );
};
