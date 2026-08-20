import { Layout } from "antd";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import AppHeader from "./components/Header";
import AppFooter from "./components/Footer";

const { Content } = Layout;

const BoardLayout = ({ children }) => {
	return (
		<Layout className="h-screen overflow-hidden">
			<AppHeader
				showBoardSelector={true}
				showExport={true}
				showZoom={true}
			/>

			<Layout className="flex-1 min-h-0">
				<LeftSidebar />

				<Layout className="min-w-0 min-h-0">
					<Content className="min-h-0 overflow-hidden bg-slate-500">
						{children}
					</Content>

					<AppFooter isCanvas={true} />
				</Layout>

				<RightSidebar />
			</Layout>
		</Layout>
	);
};
export default BoardLayout;
