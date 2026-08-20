import { ConfigProvider } from "antd";
import AuthProvider from "./context/AuthProvider";
import BoardsProvider from "./context/BoardsProvider";
import AppRoutes from "./routes/AppRoutes";
import { sparkCollabTheme } from "./theme/theme";
function App() {

  return (
    <ConfigProvider theme={sparkCollabTheme}>
      <AuthProvider>
        <BoardsProvider>
          <AppRoutes />
        </BoardsProvider>
      </AuthProvider>
    </ConfigProvider>
  )
}
export default App;
