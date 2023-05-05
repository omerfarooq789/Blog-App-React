import { useEffect, useState } from "react";
import { BlogType } from "..";
import { useParams } from "react-router-dom";
import { PostDetail } from "..";
import axios from "axios";

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
    <div className="container-fluid pt-5 pb-5">
      <div className="container">
        {post.body ? <PostDetail post={post} /> : null}
      </div>
    </div>
  );
};
