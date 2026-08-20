import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "./components/Header";
import AppFooter from "./components/Footer";

const { Content } = Layout;

const AppLayout = () => {
	return (
		<Layout className="min-h-screen !bg-slate-50">
			<AppHeader />

			<Content className="min-h-0 flex-1 !bg-slate-50">
				<Outlet />
			</Content>

			<AppFooter />
		</Layout>
	);
};
export default AppLayout;
