import { useNavigate } from "react-router-dom";
import { GetPostProp } from "../types";
import {
  Box,
  Stack,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Paper,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { Subscription } from "rxjs";
import { postServices } from "../services/post-services";
import { useObservable } from "rxjs-hooks";
import { authService } from "../../../services/auth-service";

export const PostDetail = ({ post, limit = post.body.length }: GetPostProp) => {
  const navigate = useNavigate();
  const delSubRef = useRef<Subscription | null>();

  const currentUser = useObservable(() => authService.currentUser$);

  const description = post.body.slice(0, limit);
  const src = `https://picsum.photos/300/200?random=${post.title}`;

  const handleDelete = (id: number) => {
    delSubRef.current = postServices
      .deletePost(`/${id}`)
      .subscribe(() => navigate("/"));
  };

  useEffect(() => {
    return () => {
      if (delSubRef.current && !delSubRef.current.closed) {
        delSubRef.current.unsubscribe();
        delSubRef.current = null;
      }
    };
  }, []);

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
        {currentUser && post.userId === currentUser.id && (
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
