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
	LeftOutlined,
	ShareAltOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BoardsContext } from "../../context/BoardsContext";
import {
	useNavigate,
	useParams,
	useLocation,
} from "react-router-dom";
import { exportCanvas } from "../../utils/canvasUtils";
import { BoardContext } from "../../context/BoardContext";
import AddMemberModal from "../../components/AddMemberModal";

const { Header } = Layout;
const { Title } = Typography;
const DesktopHeader = ({
	showBoardSelector,
	showExport,
	showDashboardButton,
	currentBoard,
	boards,
	loading,
	navigate,
	menuItems,
	stageRef,
	elements,
	isBoardOwner,
	open,
	setOpen
}) => {

	return (
		<Header className="!h-16 !border-b !border-slate-200 !bg-white !px-5">
			<Flex
				justify="space-between"
				align="center"
				className="h-full"
			>
				<Flex
					align="center"
					gap={16}
					className="min-w-0"
				>
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
						<Title
							level={5}
							className="!m-0 !text-[16px] !font-semibold !text-slate-800"
						>
							Spark Collab
						</Title>
					</Flex>

					{showDashboardButton && (
						<>
							<div className="h-7 w-px bg-slate-200" />

							<Button
								type="text"
								icon={<ArrowLeftOutlined />}
								onClick={() =>
									navigate("/dashboard")
								}
								className="!h-9 !rounded-lg !px-2.5 !text-slate-500 hover:!bg-emerald-50 hover:!text-emerald-600"
							>
								Dashboard
							</Button>
						</>
					)}
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
				<Flex
					align="center"
					gap={8}
					className="shrink-0"
				>
					{isBoardOwner && (
						<Button
							type="text"
							icon={<ShareAltOutlined />}
							className="!h-9 !rounded-lg !text-slate-500 hover:!bg-emerald-50 hover:!text-emerald-600"
							onClick={(e) => {
								e.stopPropagation();
								setOpen(true);
							}}
						/>
					)}
					{showExport && (
						<Button
							type="primary"
							icon={<DownloadOutlined />}
							onClick={() =>
								stageRef?.current &&
								exportCanvas(
									stageRef.current,
									elements
								)
							}
							className="!h-9 !rounded-lg !border-emerald-600 !bg-emerald-600 !px-4 !font-medium"
						>
							Export
						</Button>
					)}
					<div className="mx-2 h-7 w-px bg-slate-200" />

					<Dropdown
						menu={{ items: menuItems }}
						trigger={["click"]}
					>
						<button
							type="button"
							className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-slate-50"
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
			<AddMemberModal
				open={open}
				board={currentBoard}
				onClose={() => {
					setOpen(false);
				}}
			/>
		</Header>
	);
};

const MobileHeader = ({
	currentBoard,
	showDashboardButton,
	navigate,
	menuItems,
	isBoardOwner,
	open,
	setOpen
}) => {
	return (
		<Header className="!h-14 !border-b !border-slate-200 !bg-white !px-3">
			<Flex
				align="center"
				justify="space-between"
				className="h-full"
			>
				{showDashboardButton ? (
					<Button
						type="text"
						icon={<LeftOutlined />}
						onClick={() =>
							navigate("/dashboard")
						}
						className="!h-10 !w-10 !rounded-lg"
					/>
				) : (
					<div className="w-10" />
				)}

				<div className="min-w-0 flex-1 px-2 text-center">
					<span className="block truncate text-sm font-semibold text-slate-800">
						{currentBoard?.title || "Spark Collab"}
					</span>
				</div>
				{isBoardOwner && (
					<Button
						type="text"
						icon={<ShareAltOutlined />}
						className="!h-9 !rounded-lg !text-slate-500 hover:!bg-emerald-50 hover:!text-emerald-600"
						onClick={(e) => {
							e.stopPropagation();
							setOpen(true);
						}}
					/>
				)}
				<Dropdown
					menu={{ items: menuItems }}
					trigger={["click"]}
				>
					<button
						type="button"
						className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full"
					>
						<Avatar
							size={30}
							className="!bg-emerald-100 !text-emerald-600"
							icon={<UserOutlined />}
						/>
					</button>
				</Dropdown>
			</Flex>
			<AddMemberModal
				open={open}
				board={currentBoard}
				onClose={() => {
					setOpen(false);
				}}
			/>
		</Header>
	);
};

const AppHeader = ({
	showBoardSelector = false,
	showExport = false,
}) => {
	const { user, logout } = useContext(AuthContext);
	const { boards, loading } = useContext(BoardsContext);
	const [openShareModal, setOpenShareModal] = useState(false);
	const boardContext = useContext(BoardContext);
	const stageRef = boardContext?.stageRef;
	const elements = boardContext?.elements;
	const navigate = useNavigate();
	const location = useLocation();
	const { boardId } = useParams();

	const dashboardDisabledRoutes = [
		"/dashboard",
		"/login",
		"/registration",
	];

	const showDashboardButton = !dashboardDisabledRoutes.includes(
		location.pathname
	);

	const currentBoard = boards.find(
		(board) =>
			String(board.id) === String(boardId)
	);

	const isBoardOwner = parseInt(currentBoard?.owner_id) === parseInt(user?.id);

	const menuItems = [
		{
			key: "myprofile",
			label: "My Profile",
			onClick: () =>
				navigate("/my-profile"),
		},
		{
			key: "logout",
			label: "Logout",
			onClick: logout,
		},
	];

	return (
		<>
			<div className="hidden md:block">
				<DesktopHeader
					showBoardSelector={showBoardSelector}
					showExport={showExport}
					showDashboardButton={
						showDashboardButton
					}
					currentBoard={currentBoard}
					boards={boards}
					loading={loading}
					navigate={navigate}
					menuItems={menuItems}
					stageRef={stageRef}
					elements={elements}
					isBoardOwner={isBoardOwner}
					open={openShareModal}
					setOpen={setOpenShareModal}
				/>
			</div>

			<div className="block md:hidden">
				<MobileHeader
					currentBoard={currentBoard}
					showDashboardButton={
						showDashboardButton
					}
					navigate={navigate}
					menuItems={menuItems}
					isBoardOwner={isBoardOwner}
					open={openShareModal}
					setOpen={setOpenShareModal}
				/>
			</div>
		</>
	);
};
export default AppHeader;
