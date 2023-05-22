import { Paper, Typography } from "@mui/material";
import { layoutProp } from "..";

export const Layout = ({ title, children }: layoutProp) => {
  return (
    <Paper
      sx={{
        width: "25vw",
        margin: "auto",
        marginTop: "60px",
        backgroundColor: "#eee",
        padding: "25px",
      }}
      elevation={4}
    >
      <Typography variant="h3" textAlign={"center"} color={"primary"}>
        {title.toUpperCase()}
      </Typography>
      {children}
    </Paper>
  );
};
