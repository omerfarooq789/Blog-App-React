import { useEffect, useState } from "react";
import { BlogType } from "..";
import { useParams } from "react-router-dom";
import { PostDetail } from "..";
import { Box } from "@mui/material";
import { postServices } from "../services/post-services";
import { Subscription } from "rxjs";

export const PostDetailLayout = () => {
  const { postId } = useParams();

  const [post, setPost] = useState<BlogType>({} as BlogType);

  useEffect(() => {
    let subscription: Subscription;
    if (postId) {
      subscription = postServices
        .getPosts(`?id=${postId}`)
        .subscribe((data) => setPost(data[0]));
    }

    return () => {
      if (subscription && !subscription.closed) {
        subscription.unsubscribe();
      }
    };
  }, [postId]);
  return (
    <Box width={"70vw"} m="auto" mt={8}>
      {post.body ? <PostDetail post={post} /> : null}
    </Box>
  );
};
