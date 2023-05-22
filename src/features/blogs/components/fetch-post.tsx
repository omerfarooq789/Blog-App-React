import { useEffect, useState } from "react";
import { BlogType, UserType } from "../..";
import { Post } from "..";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const API = `http://localhost:5000/posts`;

export const FetchPost = () => {
  const [empty, setEmpty] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState<BlogType[]>([]);

  const auth = localStorage.getItem("user");
  let user: UserType = {} as UserType;
  if (auth) {
    user = JSON.parse(auth);
  }

  useEffect(() => {
    let data: BlogType[];
    setLoading(true);
    const url = `${API}?userId=${user.id}`;
    axios
      .get(url)
      .then((res) => (data = res.data))
      .then(() => {
        if (data.length === 0) {
          setLoading(false);
          setEmpty(true);
        } else {
          setPosts(data);
          setLoading(false);
        }
      });
  }, [user.id]);

  return (
    <>
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
      {!empty &&
        posts.map((post: BlogType) => <Post post={post} key={post.id} />)}
    </>
  );
};
