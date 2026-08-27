import { Button, Flex, Layout, Tooltip } from "antd";
import {
	UndoOutlined,
	RedoOutlined,
	MinusOutlined,
	PlusOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { BoardContext } from "../../context/BoardContext";

const { Footer } = Layout;

const CanvasFooter = () => {
	const {
		scale,
		undo,
		redo,
		zoomIn,
		zoomOut,
		resetView,
	} = useContext(BoardContext);

	return (
		<div className="hidden md:block">
			<Flex
				justify="space-between"
				align="center"
				className="h-full"
			>
				<Flex gap={8}>
					<Tooltip title="Undo">
						<Button
							icon={<UndoOutlined />}
							onClick={undo}
						/>
					</Tooltip>
					<Tooltip title="Redo">
						<Button
							icon={<RedoOutlined />}
							onClick={redo}
						/>
					</Tooltip>
				</Flex>
				<Flex align="center" gap={8}>
					<Button
						icon={<MinusOutlined />}
						onClick={zoomOut}
					/>
					<span className="min-w-12 text-center text-sm font-medium text-slate-600">
						{Math.round(scale * 100)}%
					</span>
					<Button
						icon={<PlusOutlined />}
						onClick={zoomIn}
					/>
					<Button onClick={resetView}>
						Reset View
					</Button>
				</Flex>
				<Button
					danger
					icon={<DeleteOutlined />}
				>
					Delete
				</Button>
			</Flex>
		</div>
	);
};

const AppFooter = ({ isCanvas = false }) => {
	return (
		<Footer className="!border-t !border-slate-200 !bg-white !px-4 !py-3">
			{isCanvas ? (
				<CanvasFooter />
			) : (
				<Flex justify="center" align="center">
					<span className="text-xs text-slate-400">
						© 2026 Spark Collab
					</span>
				</Flex>
			)}
		</Footer>
	);
};
export default AppFooter;
