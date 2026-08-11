import AuthProvider from "./context/AuthProvider";
import BoardsProvider from "./context/BoardsProvider";
import AppRoutes from "./routes/AppRoutes";

function App() {

  return (
    <AuthProvider>
      <BoardsProvider>
        <AppRoutes />
      </BoardsProvider>
    </AuthProvider>
  )
}
export default App;
