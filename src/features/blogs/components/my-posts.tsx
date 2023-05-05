import { FetchPost } from "..";

export const MyPosts = () => {
  return (
    <>
      <div className="container-fluid pt-5 pb-5">
        <div id="cont">
          <div className="row g-3" id="blog-posts">
            <FetchPost />
          </div>
        </div>
      </div>
    </>
  );
};
