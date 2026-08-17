import { Layout, Flex, Typography, Button, Avatar, Dropdown } from "antd";
import {
  DownloadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BoardsContext } from "../../context/BoardsContext";
import { useNavigate, useParams } from "react-router-dom";
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
  const { stageRef, elements } = useContext(BoardContext);
  const navigate = useNavigate();
  const { boardId } = useParams();

  const currentBoard = boards.find(
    (board) => String(board.id) === String(boardId)
  );
  const menuItems = [
    {
      key: "logout",
      label: "Logout",
      onClick: logout,
    },
  ];

  return (
    <Header className="!bg-white border-b border-slate-200 px-6">
      <Flex
        justify="space-between"
        align="center"
        className="h-full"
      >
        {/* Left */}
        <Flex align="center" gap={16}>
          <Title level={4} className="!m-0">
            Spark Collab
          </Title>

          {showBoardSelector && (
            <Dropdown
              menu={{
                items: boards.map((board) => ({
                  key: board.id,
                  label: board.title,
                  onClick: () => navigate(`/board/${board.id}`),
                })),
              }}
              trigger={["click"]}
            >
              <Button loading={loading}>
                {currentBoard?.title || "Select Board"}
              </Button>
            </Dropdown>
          )}
        </Flex>

        {/* Right */}
        <Flex align="center" gap={12}>
          {showZoom && (
            <Button>
              100%
            </Button>
          )}

          {showExport && (
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => exportCanvas(stageRef.current, elements)}
            >
              Export
            </Button>
          )}

          <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
          >
            <Avatar
              className="cursor-pointer"
              icon={<UserOutlined />}
            />
          </Dropdown>
        </Flex>
      </Flex>
    </Header>
  );
};

export default AppHeader;