import { useContext } from "react";
import {
	Button,
	Drawer,
	Typography,
} from "antd";
import {
	AppstoreOutlined,
	RedoOutlined,
	UndoOutlined,
	CloseOutlined,
} from "@ant-design/icons";
import { BoardContext } from "../../context/BoardContext";
import Toolbar from "./toolbar/ToolBar";
import PropertiesPanel from "../../components/properties/PropertiesPanel";

const { Text } = Typography;

const MobileCanvasControllers = ({
	open,
	setOpen,
	selectedElement,
}) => {
	const {
		undo,
		redo,
	} = useContext(BoardContext);

	return (
		<>
			<Button
				type="primary"
				shape="circle"
				size="large"
				icon={<AppstoreOutlined />}
				onClick={() => setOpen(true)}
				className="!absolute !bottom-5 !right-5 !z-20 !flex !h-12 !w-12 !items-center !justify-center !border-emerald-600 !bg-emerald-600 !shadow-lg hover:!border-emerald-700 hover:!bg-emerald-700 active:!scale-95 md:!hidden"
			/>

			<Drawer
				open={open}
				onClose={() => setOpen(false)}
				placement="bottom"
				height="75vh"
				closeIcon={null}
				styles={{
					header: {
						display: "none",
					},
					body: {
						padding: 0,
					},
				}}
			>
				<div className="flex h-full flex-col">
					<div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
						<div>
							<div className="font-semibold text-slate-800">
								Controls
							</div>

							<div className="text-xs text-slate-400">
								Tools and properties
							</div>
						</div>

						<Button
							type="text"
							shape="circle"
							icon={<CloseOutlined />}
							onClick={() =>
								setOpen(false)
							}
							className="!text-slate-500 hover:!bg-slate-100 hover:!text-slate-800"
						/>
					</div>

					<div className="min-h-0 flex-1 overflow-y-auto">
						<div className="border-b border-slate-200 p-4">
							<div className="mb-3 text-sm font-semibold text-slate-700">
								History
							</div>
							<div className="grid grid-cols-2 gap-2">
								<Button
									block
									icon={<UndoOutlined />}
									onClick={undo}
									className="!h-10 !rounded-lg !text-slate-600 hover:!border-emerald-300 hover:!text-emerald-600"
								>
									Undo
								</Button>
								<Button
									block
									icon={<RedoOutlined />}
									onClick={redo}
									className="!h-10 !rounded-lg !text-slate-600 hover:!border-emerald-300 hover:!text-emerald-600"
								>
									Redo
								</Button>
							</div>
						</div>
						<div className="border-b border-slate-200 p-4">
							<div className="mb-3 text-sm font-semibold text-slate-700">
								Tools
							</div>
							<div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
								<Toolbar />
							</div>
						</div>

						<div className="p-4">
							<div className="mb-3 text-sm font-semibold text-slate-700">
								Properties
							</div>

							{selectedElement ? (
								<PropertiesPanel
									selectedElement={selectedElement}
								/>
							) : (
								<div className="rounded-xl bg-slate-50 px-4 py-8 text-center">
									<Text type="secondary">
										Select an element to edit its
										properties.
									</Text>
								</div>
							)}
						</div>
					</div>
				</div>
			</Drawer>
		</>
	);
};
export default MobileCanvasControllers;
