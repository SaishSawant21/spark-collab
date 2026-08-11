import { Layout, Flex, Typography, Button, Avatar, Dropdown } from "antd";
import {
  DownloadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BoardsContext } from "../../context/BoardsContext";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
  const { logout } = useContext(AuthContext);
  const { boards, loading } = useContext(BoardsContext);
  const navigate = useNavigate();
  const menuItems = [
    {
      key: "logout",
      label: "Logout",
      onClick: logout,
    },
  ]

  return (
    <Header className="!bg-white border-b border-slate-200 px-6">
      <Flex
        justify="space-between"
        align="center"
        className="h-full"
      >
        {/* Left */}
        <Flex align="center" gap={16}>
          <Title
            level={4}
            className="!m-0"
          >
            Spark Collab
          </Title>

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
              Select Board
            </Button>
          </Dropdown>
        </Flex>

        <Flex align="center" gap={12}>
          <Button>
            100%
          </Button>

          <Button
            type="primary"
            icon={<DownloadOutlined />}
          >
            Export
          </Button>
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