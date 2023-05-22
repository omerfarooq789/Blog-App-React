import { Stack, TextField } from "@mui/material";
import { useField } from "formik";
type TextareaProps = {
  label: string;
  name: string;
};

export const TextareaField = ({ label, name }: TextareaProps) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    error: meta && meta.touched && meta.error ? true : false,
    helperText: meta && meta.touched && meta.error ? meta.error : "",
  };
  return (
    <Stack spacing={2} my={3}>
      <TextField label={label} {...configTextField} multiline rows={12} />
    </Stack>
  );
};
