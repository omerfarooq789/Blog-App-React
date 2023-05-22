import { Link, useNavigate } from "react-router-dom";
import { GetPostProp } from "../types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export const Post = ({ post }: GetPostProp) => {
  const navigate = useNavigate();

  const description = post.body.slice(0, 80);
  const src = `https://picsum.photos/300/200?random=${post.title}`;
  const linkTo = `/details/${post.id}`;

  const handleDetails = () => {
    navigate(linkTo);
  };

  return (
    <Grid item xs={3}>
      <Paper elevation={2}>
        <Card>
          <Link to={linkTo}>
            <CardMedia
              component="img"
              image={src}
              height="200"
              alt="Blog Image"
              sx={{ "&:hover": { opacity: 0.7 } }}
            ></CardMedia>
          </Link>
          <Box textAlign={"center"}>
            <CardContent>
              <Typography variant="h5" m={2}>
                <Link
                  to={linkTo}
                  style={{ textDecoration: "none", color: "primary" }}
                >
                  {post.title.toUpperCase()}
                </Link>
              </Typography>
              <Typography> {description} </Typography>
            </CardContent>
          </Box>
          <CardActions sx={{ justifyContent: "end" }}>
            <Stack direction="row" spacing={1} mb={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleDetails}
              >
                Read More
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </Paper>
    </Grid>
    // <div className="col-10 col-lg-3" id="col-change">
    //   <div className="card  h-100">
    //     <Link to={linkTo}>
    //       <img
    //         className="card-img-top img-hover"
    //         src={src}
    //         height="200"
    //         alt=""
    //       />
    //     </Link>
    //     <div className="card-body">
    //       <Link to={linkTo} style={{ textDecoration: "none", color: "black" }}>
    //         <h4 className="card-title title-hover">
    //           {post.title.toUpperCase()}
    //         </h4>
    //       </Link>
    //       <p className="card-text">{description}</p>
    //       <button
    //         className="btn btn-primary float-end read-more"
    //         id=""
    //         onClick={handleDetails}
    //       >
    //         Read More
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};
