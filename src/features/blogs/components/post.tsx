import { Link, useNavigate } from "react-router-dom";
import { GetPostProp } from "../types";

export const Post = ({ post }: GetPostProp) => {
  const navigate = useNavigate();

  const description = post.body.slice(0, 80);
  const src = `https://picsum.photos/300/200?random=${post.title}`;
  const linkTo = `/details/${post.id}`;

  const handleDetailClick = () => {
    navigate(linkTo);
  };

  return (
    <div className="col-10 col-lg-3" id="col-change">
      <div className="card  h-100">
        <Link to={linkTo}>
          <img
            className="card-img-top img-hover"
            src={src}
            height="200"
            alt=""
          />
        </Link>
        <div className="card-body">
          <Link to={linkTo} style={{ textDecoration: "none", color: "black" }}>
            <h4 className="card-title title-hover">
              {post.title.toUpperCase()}
            </h4>
          </Link>
          <p className="card-text">{description}</p>
          <button
            className="btn btn-primary float-end read-more"
            id=""
            onClick={handleDetailClick}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};
