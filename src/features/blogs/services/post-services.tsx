import { map } from "rxjs";
import { BlogType, NewBlog } from "../types";
import Axios from "axios-observable";

const axios = Axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

class PostServices {
  getPosts(q = "") {
    return axios.get(`/posts${q}`).pipe(
      map(({ data }: { data: BlogType[] }) => {
        if (data.length !== 0) {
          return data;
        } else {
          throw new Error();
        }
      })
    );
  }
  addPost(newData: NewBlog) {
    return axios.post("/posts", newData);
  }
  updatePost(q: string, updatedData: NewBlog) {
    return axios.put(`/posts${q}`, updatedData);
  }
  deletePost(q: string) {
    return axios.delete(`/posts${q}`);
  }
}
export const postServices = new PostServices();
