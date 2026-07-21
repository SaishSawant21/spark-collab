import React, { useContext, useEffect } from 'react';
import { Button, Card, Flex } from 'antd';
import {
	SelectOutlined,
	BorderOutlined,
} from "@ant-design/icons";
import { BoardContext } from '../context/BoardContext';
import { TOOLS } from '../../../utils/constants';

const ToolBar = () => {
	const { selectedTool, setSelectedTool } = useContext(BoardContext);

	const buttonTypeSetter = (type) => {
		if (type === selectedTool) return 'primary';
		else return 'default';
	}
	return (
		<Card className='fixed top-4 left-1/2 -translate-x-1/2 z-50'
			styles={{
				body: {
					padding: 8,
				},
			}}>
			<Flex gap={8}>
				<Button
					icon={<SelectOutlined />}
					type={buttonTypeSetter(TOOLS.SELECT)}
					onClick={() => setSelectedTool(TOOLS.SELECT)} >
					Select
				</Button>
				<Button
					icon={<BorderOutlined />}
					type={buttonTypeSetter(TOOLS.RECTANGLE)}
					onClick={() => setSelectedTool(TOOLS.RECTANGLE)}>
					Rectangle
				</Button>
			</Flex>
		</Card>
	)
}
export default ToolBar;
