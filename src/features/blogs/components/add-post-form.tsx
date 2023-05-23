import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputField, TextareaField } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { BlogType, NewBlog } from "../types";
import { Button, Box } from "@mui/material";
import { postServices } from "../services/post-services";
import { Subscription } from "rxjs";
import { useObservable } from "rxjs-hooks";
import { authService } from "../../../services/auth-service";

type AddPostType = {
  title: string;
  blogBody: string;
};

export const AddPostForm = () => {
  const { postId } = useParams();
  const subscriptionRef = useRef<Subscription | null>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogType>({} as BlogType);
  const [btnText, setBtnText] = useState("Add Post");
  const currentUser = useObservable(() => authService.currentUser$);

  let initialValues: AddPostType = {
    title: post.title || "",
    blogBody: post.body || "",
  };
  useEffect(() => {
    let subscription: Subscription;
    if (postId) {
      setBtnText("Loading");
      subscription = postServices
        .getPosts(`?id=${postId}`)
        .subscribe((data) => {
          setPost(data[0]);
          setBtnText("Update Post");
        });
    }

    return () => {
      if (subscription && !subscription.closed) {
        subscription.unsubscribe();
      }
    };
  }, [postId]);
  const validationSchema = Yup.object({
    title: Yup.string().required("Required!"),
    blogBody: Yup.string().required("Required!"),
  });
  const onSubmit = ({ title, blogBody }: AddPostType) => {
    if (postId) {
      const updatedPost: NewBlog = {
        title,
        body: blogBody,
        userId: post.userId,
      };
      subscriptionRef.current = postServices
        .updatePost(`/${postId}`, updatedPost)
        .subscribe(() => {
          navigate("/");
        });
    } else {
      if (currentUser) {
        const newPost: NewBlog = {
          title,
          body: blogBody,
          userId: currentUser.id,
        };
        subscriptionRef.current = postServices
          .addPost(newPost)
          .subscribe(() => {
            navigate("/");
          });
      }
    }
  };

  useEffect(() => {
    return () => {
      if (subscriptionRef.current && !subscriptionRef.current.closed) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, []);

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
