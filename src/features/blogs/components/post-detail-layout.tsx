import { useEffect, useState } from "react";
import { BlogType } from "..";
import { useParams } from "react-router-dom";
import { PostDetail } from "..";
import axios from "axios";
import { Box } from "@mui/material";

export const PostDetailLayout = () => {
  const { postId } = useParams();

  const [post, setPost] = useState<BlogType>({} as BlogType);

  useEffect(() => {
    const getPosts = async () => {
      if (postId) {
        const res = await axios.get(`http://localhost:5000/posts?id=${postId}`);
        const postData = res.data[0];
        setPost(postData);
      }
    };
    getPosts();
  }, [postId]);
  return (
    <Box width={"70vw"} m="auto" mt={8}>
      {post.body ? <PostDetail post={post} /> : null}
    </Box>
  );
};
