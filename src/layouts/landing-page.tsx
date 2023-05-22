import { Box, Typography } from "@mui/material";

export const LandingPage = () => {
  // const [user, setUser] = useState("");
  // const auth = new AuthService();
  // useEffect(() => {
  //   if (auth.isAuthenticated) {
  //     const session = localStorage.getItem("user");
  //     let userData: UserType = {} as UserType;
  //     if (session) userData = JSON.parse(session);
  //     setUser(userData.username);
  //   } else {
  //     setUser("Sign in To Continue");
  //   }
  // }, []);

  return (
    <Box textAlign={"center"} mt={25}>
      <Typography variant="h2" color={"primary"} mb={3}>
        WELCOME TO MY BLOG APP
      </Typography>
      <Typography variant="h2" color={"primary"}>
        Sign in To Continue
      </Typography>
    </Box>
  );
};
