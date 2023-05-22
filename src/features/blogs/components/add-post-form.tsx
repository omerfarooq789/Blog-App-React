import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputField, TextareaField } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BlogType } from "../types";
import { UserType } from "../../auth";
import axios from "axios";
import { Button, Box } from "@mui/material";

type AddPostType = {
  title: string;
  blogBody: string;
};

export const AddPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogType>({} as BlogType);
  const [btnText, setBtnText] = useState("Add Post");
  let initialValues: AddPostType = {
    title: post.title || "",
    blogBody: post.body || "",
  };
  useEffect(() => {
    const getPosts = async () => {
      if (postId) {
        setBtnText("Loading...");
        const res = await axios.get(`http://localhost:5000/posts?id=${postId}`);
        const postData = res.data[0];
        setPost(postData);
        setBtnText("Update Post");
      }
    };

    getPosts();
  }, [postId]);
  const validationSchema = Yup.object({
    title: Yup.string().required("Required!"),
    blogBody: Yup.string().required("Required!"),
  });
  const onSubmit = async ({ title, blogBody }: AddPostType) => {
    if (postId) {
      const updatedPost = {
        title,
        body: blogBody,
        userId: post.userId,
      };
      await axios.put(`http://localhost:5000/posts/${postId}`, updatedPost);
      navigate("/");
    } else {
      const session: string | null = localStorage.getItem("user");
      let user: UserType = JSON.parse(session as string);
      // const postsColRef = collection(db, "posts");
      const newPost = {
        title,
        body: blogBody,
        userId: user.id,
      };
      try {
        await axios.post(`http://localhost:5000/posts`, newPost);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount
    >
      {() => {
        return (
          <Form>
            <InputField label="Title" type="text" name="title" />
            <TextareaField label="Blog Details" name="blogBody" />
            <Box textAlign={"center"}>
              <Button variant="contained" type="submit" size="large">
                {btnText}
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
