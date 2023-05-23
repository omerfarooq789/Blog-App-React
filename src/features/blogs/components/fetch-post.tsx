import { useEffect, useState } from "react";
import { BlogType, UserType } from "../..";
import { Post } from "..";
import { Box, Grid, Typography } from "@mui/material";
import { postServices } from "../services/post-services";
import { authService } from "../../../services/auth-service";
import { useObservable } from "rxjs-hooks";

export const FetchPost = () => {
  const [empty, setEmpty] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState<BlogType[]>([]);

  const currentUser = useObservable(() => authService.currentUser$);
  let user: UserType = {} as UserType;
  if (currentUser) {
    user = currentUser;
  }

  useEffect(() => {
    setLoading(true);

    const subscription = postServices.getPosts(`?userId=${user.id}`).subscribe({
      next: (data) => {
        setPosts(data);
        setLoading(false);
      },
      error: () => {
        setEmpty(true);
        setLoading(false);
      },
    });

    return () => {
      if (subscription && !subscription.closed) {
        subscription.unsubscribe();
      }
    };
  }, [user.id]);

  return (
    <Box textAlign="center">
      {isLoading && (
        <Typography variant="h2" textAlign={"center"} color={"primary"}>
          Loading.........
        </Typography>
      )}
      {empty && (
        <Typography variant="h2" textAlign={"center"} color={"primary"}>
          No Blogs Available
        </Typography>
      )}
      <Grid container spacing={5}>
        {!empty &&
          posts.map((post: BlogType) => <Post post={post} key={post.id} />)}
      </Grid>
    </Box>
  );
};
