import {
	Layout,
	Flex,
	Typography,
	Button,
	Avatar,
	Dropdown,
} from "antd";

import {
	DownloadOutlined,
	UserOutlined,
	ArrowLeftOutlined,
} from "@ant-design/icons";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BoardsContext } from "../../context/BoardsContext";
import {
	useNavigate,
	useParams,
	useLocation,
} from "react-router-dom";
import { exportCanvas } from "../../utils/canvasUtils";
import { BoardContext } from "../../context/BoardContext";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = ({
	showBoardSelector = false,
	showZoom = false,
	showExport = false,
}) => {
	const { logout } = useContext(AuthContext);
	const { boards, loading } = useContext(BoardsContext);

	const boardContext = useContext(BoardContext);

	const stageRef = boardContext?.stageRef;
	const elements = boardContext?.elements;

	const navigate = useNavigate();
	const location = useLocation();
	const { boardId } = useParams();

	// Routes where Dashboard button should NOT appear
	const dashboardDisabledRoutes = [
		"/dashboard",
		"/login",
		"/registration",
	];

	const showDashboardButton =
		!dashboardDisabledRoutes.includes(
			location.pathname
		);

	const currentBoard = boards.find(
		(board) => String(board.id) === String(boardId)
	);

	const menuItems = [
		{
			key: "myprofile",
			label: "My Profile",
			onClick: () => navigate("/my-profile"),
		},
		{
			key: "logout",
			label: "Logout",
			onClick: logout,
		},
	];

	return (
		<Header className="!h-16 !border-b !border-slate-200 !bg-white !px-5">
			<Flex
				justify="space-between"
				align="center"
				className="h-full"
			>
				{/* =========================
            Left
        ========================== */}
				<Flex
					align="center"
					gap={16}
					className="min-w-0"
				>
					{/* Brand */}
					<Flex
						align="center"
						gap={10}
						className="shrink-0"
					>
						<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
							<span className="text-lg font-bold text-emerald-600">
								✦
							</span>
						</div>

						<div className="hidden sm:block">
							<Title
								level={5}
								className="!m-0 !text-[16px] !font-semibold !text-slate-800"
							>
								Spark Collab
							</Title>
						</div>
					</Flex>

					{/* Dashboard Navigation */}
					{showDashboardButton && (
						<>
							<div className="h-7 w-px bg-slate-200" />

							<Button
								type="text"
								icon={<ArrowLeftOutlined />}
								onClick={() =>
									navigate("/dashboard")
								}
								className="!h-9 !shrink-0 !rounded-lg !px-2.5 !text-slate-500 hover:!bg-emerald-50 hover:!text-emerald-600"
							>
								<span className="hidden md:inline">
									Dashboard
								</span>
							</Button>
						</>
					)}

					{/* Board Selector */}
					{showBoardSelector && (
						<>
							<div className="h-7 w-px bg-slate-200" />

							<Dropdown
								menu={{
									items: boards.map((board) => ({
										key: board.id,

										label: (
											<div className="flex items-center gap-2 py-1">
												<div className="h-2 w-2 rounded-full bg-emerald-500" />

												<span>
													{board.title}
												</span>
											</div>
										),

										onClick: () =>
											navigate(
												`/board/${board.id}`
											),
									})),
								}}
								trigger={["click"]}
							>
								<Button
									type="text"
									loading={loading}
									className="!h-10 !max-w-60 !rounded-lg !px-3 hover:!bg-slate-100"
								>
									<Flex
										align="center"
										gap={8}
										className="min-w-0"
									>
										<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-50">
											<span className="text-xs font-semibold text-emerald-600">
												✦
											</span>
										</div>

										<span className="max-w-40 truncate font-medium text-slate-700">
											{currentBoard?.title ||
												"Select Board"}
										</span>

										<span className="shrink-0 text-xs text-slate-400">
											⌄
										</span>
									</Flex>
								</Button>
							</Dropdown>
						</>
					)}
				</Flex>

				{/* =========================
            Right
        ========================== */}
				<Flex
					align="center"
					gap={8}
					className="shrink-0"
				>
					{/* Zoom */}
					{showZoom && (
						<Button
							type="text"
							className="!h-9 !rounded-lg !px-3 !text-slate-600 hover:!bg-slate-100"
						>
							<span className="font-medium">
								100%
							</span>
						</Button>
					)}

					{/* Export */}
					{showExport && (
						<Button
							type="primary"
							icon={<DownloadOutlined />}
							onClick={() =>
								exportCanvas(
									stageRef.current,
									elements
								)
							}
							className="!h-9 !rounded-lg !border-emerald-600 !bg-emerald-600 !px-4 !font-medium shadow-sm hover:!border-emerald-700 hover:!bg-emerald-700"
						>
							<span className="hidden sm:inline">
								Export
							</span>
						</Button>
					)}

					{/* Divider */}
					<div className="mx-2 h-7 w-px bg-slate-200" />

					{/* User Menu */}
					<Dropdown
						menu={{ items: menuItems }}
						trigger={["click"]}
					>
						<button
							type="button"
							className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-slate-50 transition-all hover:border-emerald-300 hover:bg-emerald-50"
						>
							<Avatar
								size={30}
								className="!bg-emerald-100 !text-emerald-600"
								icon={<UserOutlined />}
							/>
						</button>
					</Dropdown>
				</Flex>
			</Flex>
		</Header>
	);
};

export default AppHeader;