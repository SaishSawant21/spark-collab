import { Layout } from "antd";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import AppHeader from "./components/Header";
import AppFooter from "./components/Footer";
import { useLocation } from "react-router-dom";

const { Content } = Layout;

const BoardLayout = ({ children }) => {
	const location = useLocation();
	const isViewer = location?.state?.role === 'viewer';
	return (
		<Layout className="h-screen overflow-hidden">
			<AppHeader
				showBoardSelector={true}
				showExport={true}
			/>

			<Layout className="min-h-0 flex-1">
				{!isViewer && <div className="hidden md:block">
					<LeftSidebar />
				</div>}
				<Layout className="min-h-0 min-w-0">
					<Content className={`min-h-0 overflow-hidden bg-slate-500 ${isViewer ? "pointer-events-none" : ""}`}>
						{children}
					</Content>

					<div className="hidden md:block">
						<AppFooter isCanvas={true} />
					</div>
				</Layout>
				{!isViewer &&
					<div className="hidden md:block">
						<RightSidebar />
					</div>
				}
			</Layout>
		</Layout>
	);
};
export default BoardLayout;
