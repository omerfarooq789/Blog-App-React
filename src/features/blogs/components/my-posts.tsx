import { Box, Grid } from "@mui/material";
import { FetchPost } from "..";

export const MyPosts = () => {
  return (
    <Box pr={10} pl={10} pt={5}>
      <Grid container spacing={5}>
        <FetchPost />
      </Grid>
    </Box>
  );
};
