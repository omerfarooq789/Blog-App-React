import { useNavigate } from "react-router-dom";
import { GetPostProp } from "../types";
import { UserType } from "../../auth";
import axios from "axios";

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
    <div className="col text-center">
      <div className="card  h-100">
        <img className="card-img-top" src={src} height="200" alt="" />
        <div className="card-body mt-3">
          <h1 className="card-title">{post.title.toUpperCase()}</h1>
          <p className="card-text mt-5">{description}</p>
          {post.userId === userDetail.id && (
            <>
              <button
                className="btn btn-primary mt-3 me-3"
                onClick={() => navigate(`/edit_post/${post.id}`)}
              >
                Edit
              </button>
              <button
                className="btn btn-primary mt-3"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
