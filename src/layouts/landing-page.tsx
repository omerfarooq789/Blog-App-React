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
    <>
      <h1 className="text-center text-primary landing l-font">
        WELCOME TO MY BLOG APP
      </h1>
      <h1 className="text-center text-primary mt-5 l-font">
        Sign in To Continue
      </h1>
    </>
  );
};
