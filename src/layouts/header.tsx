import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth-service";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Stack,
  Button,
} from "@mui/material";
import { useObservable } from "rxjs-hooks";
import { map } from "rxjs";
type NavProps = {
  title: string;
};
export const Header = (props: NavProps) => {
  let isAuthorized = false;
  isAuthorized = useObservable(
    () =>
      authService.currentUser$.pipe(
        map((res) => {
          return !!res;
        })
      ),
    isAuthorized
  );
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" color="inherit" underline="none">
            {props.title}
          </Link>
        </Typography>
        {isAuthorized && (
          <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/my_post")}>
              My Blogs
            </Button>
            <Button color="inherit" onClick={() => navigate("/add_post")}>
              Add Blog
            </Button>
          </Stack>
        )}
        {!isAuthorized && (
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </Stack>
        )}
        {isAuthorized && (
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                authService.logout();
                navigate("/");
              }}
            >
              Sign Out
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};
