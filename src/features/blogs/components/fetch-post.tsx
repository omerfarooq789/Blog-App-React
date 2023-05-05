import { useEffect, useState } from "react";
import { BlogType, UserType } from "../..";
import { Post } from "..";
import { useAuth } from "../../../hooks/auth-context";
import axios from "axios";

const API = `http://localhost:5000/posts`;

export const FetchPost = () => {
  const [empty, setEmpty] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState<BlogType[]>([]);

  const auth = useAuth();
  let user: UserType = {} as UserType;
  if (auth.user) {
    user = JSON.parse(auth.user);
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
        <h1 className="text-center text-primary l-font">Loading.........</h1>
      )}
      {empty && (
        <h1 className="text-center text-primary">No Blogs Available</h1>
      )}
      {!empty &&
        posts.map((post: BlogType) => <Post post={post} key={post.id} />)}
    </>
  );
};
