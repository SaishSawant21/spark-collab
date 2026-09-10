import { useEffect, useRef, useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword, verifyResetPasswordToken } from "../../services/authService";
import { messageContants } from "./../../utils/constants";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const verifyCalled = useRef(false);
  const token = searchParams.get("token");

  const verifyToken = async () => {
    try {
      setPageLoader(true);
      await verifyResetPasswordToken(token);
    } catch (error) {
      message.error(error?.response?.data?.message || messageContants?.somethingWerntWrong);
      navigate('/link-expired');
    } finally {
      setPageLoader(false);
    }
  }
  const handleResetPassword = async (values) => {
    if (!token) {
      message.error("Invalid or missing reset token.");
      return;
    }
    try {
      setLoading(true);
      let payload = {
        token: token,
        password: values?.password
      }
      const res = await resetPassword(payload);
      if (res?.code === 200) {
        message.success(res?.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);

      message.error(
        error?.response?.data?.message ||
        messageContants?.somethingWerntWrong
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (verifyCalled.current) return;
    verifyCalled.current = true;
    verifyToken();
  }, []);

  return (
    <Spin spinning={pageLoader}>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-600">
              Spark Collab
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Reset your password
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-800">
                Create a new password
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter your new password below.
              </p>
            </div>

            <Form
              layout="vertical"
              onFinish={handleResetPassword}
              requiredMark={false}
            >
              <Form.Item
                label="New Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your new password",
                  },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter new password"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error("Passwords do not match")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm new password"
                  size="large"
                />
              </Form.Item>

              <Form.Item className="!mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  size="large"
                  className="!bg-emerald-600 hover:!bg-emerald-700"
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-6 text-center">
              <Button
                type="link"
                className="!px-0 !text-sm !font-normal !text-emerald-600"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};
export default ResetPassword;
