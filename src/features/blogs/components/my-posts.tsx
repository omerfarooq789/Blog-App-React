import { Box } from "@mui/material";
import { FetchPost } from "..";

export const MyPosts = () => {
  return (
    <Box pr={10} pl={10} pt={5}>
      <FetchPost />
    </Box>
  );
};
