import {
  Layout,
  Typography,
  Button,
  Card,
  Row,
  Col,
  Table,
  Space,
  Form,
  Input,
  Flex,
  Modal,
  message,
  Dropdown,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AppHeader from "../layouts/components/Header";
import { useContext, useState } from "react";
import { messageContants } from "../utils/constants";
import { BoardsContext } from "../context/BoardsContext";
import dayjs from "dayjs";
import { createBoard, deleteBoard, updateBoard } from "../services/boardService";
import { useNavigate } from "react-router-dom";
const { Header, Content } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  const [openCreateBoard, setOpenCreateBoard] = useState(false);
  const { boards, loading } = useContext(BoardsContext);
  const { loadBoards } = useContext(BoardsContext);
  const [editingBoard, setEditingBoard] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleDelete = (boardId) => {
    Modal.confirm({
      title: "Delete board?",
      content: "This action cannot be undone.",
      okText: "Delete",
      okButtonProps: {
        danger: true,
      },
      onOk: async () => {
        try {
          await deleteBoard(boardId);

          message.success("Board deleted successfully");

          // Update BoardsContext here
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
  const columns = [
    {
      title: "Board Name",
      dataIndex: "title",
      key: "title",
      render: (title, board) => <span className="text-blue-900 cursor-pointer"
        onClick={() => navigate(`/board/${board.id}`)}>
        {title}
      </span>
    },
    {
      title: "Last Modified",
      dataIndex: "updated_at",
      key: "modified",
      render: (date) => dayjs(date).format('DD/MM/YYYY')
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, board) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "open",
                label: "Open",
                onClick: () => navigate(`/ board / ${board.id}`),
              },
              {
                key: "edit",
                label: "Edit",
                onClick: () => {
                  setEditingBoard(board);
                  form.setFieldsValue({
                    title: board.title,
                    description: board.description,
                  });
                  setOpenCreateBoard(true);
                },
              },
              {
                key: "delete",
                label: "Delete",
                danger: true,
                onClick: () => {
                  handleDelete(board.id)
                },
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text">⋮</Button>
        </Dropdown>
      ),
    },
  ];
  const handleSubmit = async (values) => {
    try {
      if (editingBoard) {
        await updateBoard(editingBoard.id, values);

        message.success("Board updated successfully");
      } else {
        await createBoard(values);

        message.success("Board created successfully");
      }

      form.resetFields();
      setEditingBoard(null);
      setOpenCreateBoard(false);

      await loadBoards();
    } catch (error) {

      message.error(
        error?.response?.data?.message ||
        messageContants.somethingWerntWrong
      );
    }
  };
  return (
    <Layout className="min-h-screen">
      <AppHeader />
      <Content className="p-6 md:p-8">
        <div className="mb-6">
          <Title level={2} className="!mb-1">
            Dashboard
          </Title>

          <Text type="secondary">
            Your boards
          </Text>
        </div>

        {/* Board Cards */}
        <Row gutter={[16, 16]}>
          {/* Create Board */}
          <Col xs={24} sm={12} lg={8} xl={6}>
            <Card
              hoverable
              className="h-48 flex items-center justify-center"
              onClick={() => setOpenCreateBoard(true)}
            >
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                size="large"
              >
                Create Board
              </Button>
            </Card>
          </Col>

          {/* Temporary Boards */}
          {boards.map((board) => (
            <Col
              key={board.id}
              xs={24}
              sm={12}
              lg={8}
              xl={6}
            >
              <Card
                hoverable
                className="h-48"
              >
                <div className="h-24 bg-slate-100 rounded mb-4" />

                <Title level={5} className="!mb-1">
                  {board.name}
                </Title>

                <Text type="secondary">
                  Edited {board.modified}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Recent Boards */}
        <div className="mt-10">
          <Title level={4}>
            Recent Boards
          </Title>

          <Table
            rowKey="id"
            columns={columns}
            dataSource={boards}
            pagination={false}
          />
        </div>
      </Content>
      <Modal
        title={editingBoard ? "Edit Board" : "Create New Board"}
        open={openCreateBoard}
        onCancel={() => {
          setOpenCreateBoard(false);
          setEditingBoard(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Board Name"
            name="title"
            rules={[
              {
                required: true,
                message: messageContants.requiredMsg,
              },
            ]}
          >
            <Input placeholder="Enter board name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter board description"
            />
          </Form.Item>

          <Flex justify="end" gap={8}>
            <Button onClick={() => setOpenCreateBoard(false)}>
              Cancel
            </Button>

            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Flex>
        </Form>
      </Modal>
    </Layout>
  );
};
export default Dashboard;
