import {
	Layout,
	Typography,
	Button,
	Card,
	Row,
	Col,
	Table,
	Form,
	Input,
	Flex,
	Modal,
	message,
	Dropdown,
	Space,
	Tag,
} from "antd";
import { PlusOutlined, ShareAltOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { messageContants } from "../utils/constants";
import { BoardsContext } from "../context/BoardsContext";
import { AuthContext } from "./../context/AuthContext";
import {
	createBoard,
	deleteBoard,
	updateBoard,
} from "../services/boardService";
import AddMemberModal from "../components/AddMemberModal";

const { Content } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
	const [openCreateBoard, setOpenCreateBoard] = useState(false);
	const [editingBoard, setEditingBoard] = useState(null);
	const [sharingBoard, setSharingBoard] = useState(null);
	const [openShareModal, setOpenShareModal] = useState(false);
	const { boards, loading, loadBoards } =
		useContext(BoardsContext);
	const { user } = useContext(AuthContext);
	const [form] = Form.useForm();
	const navigate = useNavigate();

	// First two boards are treated as recently visited
	const recentBoards = boards.slice(0, 2);

	const handleDelete = (boardId) => {
		Modal.confirm({
			title: "Delete board?",
			content: "This action cannot be undone.",
			okText: "Delete",
			cancelText: "Cancel",
			okButtonProps: {
				danger: true,
			},

			onOk: async () => {
				try {
					await deleteBoard(boardId);

					message.success(
						"Board deleted successfully"
					);

					await loadBoards();
				} catch (error) {
					console.log(error);

					message.error(
						error?.response?.data?.message ||
						"Failed to delete board"
					);
				}
			},
		});
	};

	const handleEdit = (board) => {
		setEditingBoard(board);

		form.setFieldsValue({
			title: board.title,
			description: board.description,
		});

		setOpenCreateBoard(true);
	};

	const handleCloseModal = () => {
		setOpenCreateBoard(false);
		setEditingBoard(null);
		form.resetFields();
	};

	const handleSubmit = async (values) => {
		try {
			if (editingBoard) {
				await updateBoard(
					editingBoard.id,
					values
				);

				message.success(
					"Board updated successfully"
				);
			} else {
				await createBoard(values);

				message.success(
					"Board created successfully"
				);
			}

			handleCloseModal();

			await loadBoards();
		} catch (error) {
			console.log(error);

			message.error(
				error?.response?.data?.message ||
				messageContants.somethingWerntWrong
			);
		}
	};

	const columns = [
		{
			title: "Board Name",
			dataIndex: "title",
			key: "title",

			render: (title, board) => (
				<span
					className="cursor-pointer font-medium text-emerald-700 transition-colors hover:text-emerald-800"
					onClick={() =>
						navigate(`/board/${board.id}`, {
							state: {
								role: board?.role
							}
						})
					}
				>
					{title}
				</span>
			),
		},
		{
			title: "Last Modified",
			dataIndex: "updated_at",
			key: "modified",

			render: (date) =>
				dayjs(date).format("DD/MM/YYYY"),
		},
		{
			title: "Role",
			key: "role",
			render: (_, board) => {
				const roleConfig = {
					owner: {
						label: "Owner",
						color: "green",
					},
					editor: {
						label: "Editor",
						color: "blue",
					},
					viewer: {
						label: "Viewer",
						color: "default",
					},
				};

				const config = roleConfig[board.role];

				return (
					<Tag color={config?.color}>
						{config?.label || board.role}
					</Tag>
				);
			},
		},
		{
			title: "Actions",
			key: "actions",
			render: (_, board) => {
				const isOwner = board.owner_id === parseInt(user.id);

				if (!isOwner) {
					return null;
				}

				return (
					<Space>
						<Dropdown
							menu={{
								items: [
									{
										key: "edit",
										label: "Edit",
									},
									{
										key: "delete",
										label: "Delete",
									},
								],
							}}
						>
							...
						</Dropdown>

						<ShareAltOutlined
							className="cursor-pointer !text-slate-500 hover:!text-emerald-600"
							onClick={(e) => {
								e.stopPropagation();
								setSharingBoard(board);
								setOpenShareModal(true);
							}}
						/>
					</Space>
				);
			},
		}
	];

	return (
		<Content className="px-5 py-6 md:px-8 md:py-8">
			<div className="mb-8">
				<Title
					level={2}
					className="!mb-1 !text-2xl !font-semibold !text-slate-900 md:!text-3xl"
				>
					Dashboard
				</Title>

				<Text className="!text-slate-500">
					Manage and collaborate on your boards
				</Text>
			</div>

			<Row gutter={[20, 20]}>
				<Col xs={24} sm={12} lg={8}>
					<Card
						hoverable
						onClick={() => setOpenCreateBoard(true)}
						className="group !h-52 !cursor-pointer !overflow-hidden !rounded-xl !border !border-dashed !border-emerald-300 !bg-emerald-50/50 transition-all duration-200 hover:!border-emerald-400 hover:!bg-emerald-50"
						styles={{
							body: {
								height: "100%",
								padding: 0,
							},
						}}
					>
						<Flex
							vertical
							justify="center"
							align="center"
							className="h-full"
							gap={12}
						>
							<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 transition-transform duration-200 group-hover:scale-110">
								<PlusOutlined className="!text-lg !text-emerald-600" />
							</div>

							<div className="text-center">
								<div className="font-semibold text-slate-800">
									Create a board
								</div>

								<div className="mt-1 text-sm text-slate-500">
									Start a new collaboration
								</div>
							</div>
						</Flex>
					</Card>
				</Col>

				{/* Latest Two Boards */}
				{recentBoards.map((board) => (
					<Col
						key={board.id}
						xs={24}
						sm={12}
						lg={8}
					>
						<Card
							hoverable
							onClick={() => navigate(`/board/${board.id}`)}
							className="group !h-52 !cursor-pointer !overflow-hidden !rounded-xl !border-slate-200 !bg-white transition-all duration-200 hover:-translate-y-1 hover:!border-emerald-200 hover:shadow-lg hover:shadow-slate-200/60"
							styles={{
								body: {
									padding: 0,
								},
							}}
						>
							{/* Board Preview */}
							<div className="relative h-28 overflow-hidden border-b border-slate-100 bg-slate-50">
								<div className="absolute inset-0 opacity-50">
									<div className="absolute left-8 top-6 h-10 w-16 rounded border-2 border-emerald-300 bg-emerald-50" />

									<div className="absolute left-24 top-12 h-8 w-12 rounded border-2 border-slate-300 bg-white" />

									<div className="absolute left-16 top-20 h-5 w-20 rounded bg-emerald-100" />
								</div>

								{/* Recently Visited Label */}
								<div className="absolute right-3 top-3 rounded-md bg-white/80 px-2 py-1 text-xs font-medium text-slate-500 backdrop-blur-sm">
									Recently visited
								</div>
							</div>

							<div className="p-4">
								<Title
									level={5}
									className="!mb-1 !truncate !text-slate-800"
								>
									{board.title}
								</Title>

								<Text
									ellipsis={{ rows: 2 }}
									className="!mb-1 !block !text-sm !text-slate-500"
								>
									{board.description || "No description"}
								</Text>

								<Text className="!text-xs !text-slate-400">
									Modified{" "}
									{dayjs(board.updated_at).format("DD/MM/YYYY")}
								</Text>
							</div>
						</Card>
					</Col>
				))}
			</Row>

			<div className="mt-12">
				<div className="mb-4">
					<Title
						level={4}
						className="!mb-1 !text-lg !font-semibold !text-slate-800"
					>
						All Boards
					</Title>

					<Text className="!text-sm !text-slate-500">
						Manage all your boards
					</Text>
				</div>

				<div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
					<Table
						rowKey="id"
						columns={columns}
						dataSource={boards}
						loading={loading}
						pagination={false}
						className="[&_.ant-table-thead>tr>th]:!bg-slate-50 [&_.ant-table-thead>tr>th]:!text-slate-600"
					/>
				</div>
			</div>
			<AddMemberModal
				open={openShareModal}
				board={sharingBoard}
				onClose={() => {
					setOpenShareModal(false);
					setSharingBoard(null);
				}}
			/>
			<Modal
				title={
					<span className="text-lg font-semibold text-slate-800">
						{editingBoard
							? "Edit Board"
							: "Create New Board"}
					</span>
				}
				open={openCreateBoard}
				onCancel={handleCloseModal}
				footer={null}
				styles={{
					content: {
						borderRadius: 16,
					},
				}}
			>
				<Form
					layout="vertical"
					form={form}
					onFinish={handleSubmit}
					className="pt-3"
				>
					{/* Board Name */}
					<Form.Item
						label={
							<span className="font-medium text-slate-700">
								Board Name
							</span>
						}
						name="title"
						rules={[
							{
								required: true,
								message:
									messageContants.requiredMsg,
							},
						]}
					>
						<Input
							size="large"
							placeholder="Enter board name"
							className="!rounded-lg"
						/>
					</Form.Item>

					<Form.Item
						label={
							<span className="font-medium text-slate-700">
								Description
							</span>
						}
						name="description"
					>
						<Input.TextArea
							rows={4}
							placeholder="What is this board about?"
							className="!rounded-lg"
						/>
					</Form.Item>

					<Flex
						justify="end"
						gap={8}
						className="pt-2"
					>
						<Button
							onClick={handleCloseModal}
							className="!rounded-lg"
						>
							Cancel
						</Button>

						<Button
							type="primary"
							htmlType="submit"
							loading={loading}
							className="!rounded-lg !border-emerald-600 !bg-emerald-600 hover:!border-emerald-700 hover:!bg-emerald-700"
						>
							{editingBoard
								? "Save Changes"
								: "Create Board"}
						</Button>
					</Flex>
				</Form>
			</Modal>
		</Content>
	);
};
export default Dashboard;
