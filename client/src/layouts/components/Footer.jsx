import { Layout, Flex, Button, Tooltip } from "antd";
import {
  UndoOutlined,
  RedoOutlined,
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { BoardContext } from "../../context/BoardContext";

const { Footer } = Layout;

const AppFooter = () => {
  const { pathname } = useLocation();
  const { undo, redo,
    scale, zoomIn, zoomOut,
    resetView
  } = useContext(BoardContext);
  const isCanvas = pathname.startsWith("/board/");

  return (
    <Footer className="!bg-white !p-3 border-t border-slate-200">
      {isCanvas ? (
        <Flex justify="space-between" align="center">
          <Flex gap={8}>
            <Tooltip title={'Undo'}>
              <Button icon={<UndoOutlined />} onClick={undo} />
            </Tooltip>
            <Tooltip title={'Redo'}>
              <Button icon={<RedoOutlined />} onClick={redo} />
            </Tooltip>
          </Flex>

          <Flex align="center" gap={8}>
            <Button
              icon={<MinusOutlined />}
              onClick={zoomOut}
            />

            <span>{Math.round(scale * 100)}%</span>

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
      ) : (
        <Flex justify="center">
          <span className="text-slate-500">
            © 2026 Spark Collab
          </span>
        </Flex>
      )}
    </Footer>
  );
};
export default AppFooter;
