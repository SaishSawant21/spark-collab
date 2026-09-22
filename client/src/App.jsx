import { ConfigProvider } from "antd";
import AppRoutes from "./routes/AppRoutes";
import { sparkCollabTheme } from "./theme/theme";
function App() {

  return (
    <ConfigProvider theme={sparkCollabTheme}>
      <AppRoutes />
    </ConfigProvider>
  )
}
export default App;
