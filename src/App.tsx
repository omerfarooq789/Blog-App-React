import "./assets/styles.css";

import { Header } from "./layouts";
import { AuthProvider } from "./hooks/auth-context";
import { AppRoutes } from "./Routes";

const App = () => {
  return (
    <AuthProvider>
      <Header title={"Blog App"} />
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
