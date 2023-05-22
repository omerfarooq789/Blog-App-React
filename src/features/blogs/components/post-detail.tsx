import { useNavigate } from "react-router-dom";
import { GetPostProp } from "../types";
import { UserType } from "../../auth";
import axios from "axios";
import {
  Box,
  Stack,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

export const PostDetail = ({ post, limit = post.body.length }: GetPostProp) => {
  const navigate = useNavigate();
  const session: string | null = localStorage.getItem("user");

  let userDetail: UserType;
  userDetail = JSON.parse(session as string);

  const description = post.body.slice(0, limit);
  const src = `https://picsum.photos/300/200?random=${post.title}`;

  const handleDelete = async (id: number) => {
    try {
      // await deleteDoc(doc(db, "posts", id));
      await axios.delete(`http://localhost:5000/posts/${id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper elevation={4}>
      <Card>
        <CardMedia
          component="img"
          image={src}
          height="200"
          alt="Blog Image"
        ></CardMedia>
        <Box textAlign={"center"}>
          <CardContent>
            <Typography variant="h3" m={2} color={"primary"}>
              {post.title.toUpperCase()}
            </Typography>
            <Typography> {description} </Typography>
          </CardContent>
        </Box>
        {post.userId === userDetail.id && (
          <CardActions sx={{ justifyContent: "center" }}>
            <Stack direction="row" spacing={1} mb={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/edit_post/${post.id}`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </Button>
            </Stack>
          </CardActions>
        )}
      </Card>
    </Paper>
  );
};
