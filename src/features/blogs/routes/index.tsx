import { Route, Routes } from "react-router-dom";
import { MyPosts, AddPostLayout, PostDetailLayout } from "../";

export const BlogRoutes = () => {
  return (
    <Routes>
      <Route path="my_post" element={<MyPosts />} />
      <Route path="add_post" element={<AddPostLayout />} />
      <Route path="edit_post/:postId" element={<AddPostLayout />} />
      <Route path="details/:postId" element={<PostDetailLayout />} />
    </Routes>
  );
};
