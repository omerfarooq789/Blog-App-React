import { Paper } from "@mui/material";
import { AddPostForm } from "..";

export const AddPostLayout = () => {
  return (
    <Paper
      sx={{
        width: "60vw",
        margin: "auto",
        marginTop: "60px",
        backgroundColor: "#eee",
        padding: "25px",
      }}
      elevation={2}
    >
      <AddPostForm />
    </Paper>
  );
};
