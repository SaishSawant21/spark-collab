import { Flex, Layout, Typography } from "antd"
import { useContext } from "react";
import { BoardContext } from "../../context/BoardContext";
import PropertiesPanel from "../../components/properties/PropertiesPanel";
const { Sider } = Layout;
const RightSidebar = () => {
	const { selectedElementId,
		elements
	} = useContext(BoardContext);
	const selectedElement = elements.find(
		(item) => item.id === selectedElementId
	);
	return (
		<Sider
			width={320}
			theme="light"
			className="
				hidden
				lg:block
				!bg-white
				border-l
				border-slate-200
				overflow-y-auto
			"
		>
			<div className="flex min-h-full flex-col">
				{/* Header */}
				<div className="border-b border-slate-200 px-5 py-4">
					<Flex align="center" justify="space-between">
						<div>
							<Typography.Title
								level={5}
								className="!mb-0 !text-[15px] !font-semibold !text-slate-800"
							>
								Properties
							</Typography.Title>

							<Typography.Text className="!text-xs !text-slate-400">
								{selectedElement
									? "Edit selected element"
									: "Element inspector"}
							</Typography.Text>
						</div>

						{selectedElement && (
							<div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50">
								<span className="text-xs text-emerald-600">
									✦
								</span>
							</div>
						)}
					</Flex>
				</div>

				{/* Content */}
				<div className="flex-1 px-5 py-5">
					{selectedElement ? (
						<div className="space-y-5">
							<PropertiesPanel
								selectedElement={selectedElement}
							/>
						</div>
					) : (
						<Flex
							vertical
							justify="center"
							align="center"
							className="h-72 px-6 text-center"
						>
							<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100">
								<svg
									viewBox="0 0 24 24"
									className="h-6 w-6 text-slate-400"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.7"
								>
									<path
										d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-13Z"
									/>
									<path d="M8 8h8M8 12h5M8 16h3" />
								</svg>
							</div>

							<Typography.Text
								strong
								className="!mb-1 !text-sm !text-slate-700"
							>
								Nothing selected
							</Typography.Text>

							<Typography.Text className="!max-w-[210px] !text-xs !leading-5 !text-slate-400">
								Select an element on the canvas to view and edit
								its properties.
							</Typography.Text>
						</Flex>
					)}
				</div>
			</div>
		</Sider>
	)
}
export default RightSidebar;
