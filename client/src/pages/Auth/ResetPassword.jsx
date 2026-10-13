
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Flex,
  Form,
  Input,
  message,
  Spin,
  Typography,
} from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  resetPassword,
  verifyResetPasswordToken,
} from "../../services/authService";
import { messageContants } from "../../utils/constants";

const { Title, Text } = Typography;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const verifyCalled = useRef(false);
  const token = searchParams.get("token");

  const verifyToken = async () => {
    if (!token) {
      message.error("Invalid or missing reset token.");
      navigate("/link-expired", { replace: true });
      return;
    }

    try {
      setPageLoader(true);
      await verifyResetPasswordToken(token);
    } catch (error) {
      message.error(
        error?.response?.data?.message ||
        messageContants.somethingWerntWrong
      );
      navigate("/link-expired", { replace: true });
    } finally {
      setPageLoader(false);
    }
  };

  const handleResetPassword = async (values) => {
    if (!token) {
      message.error("Invalid or missing reset token.");
      return;
    }

    try {
      setLoading(true);
      const res = await resetPassword({
        token,
        password: values.password,
      });

      if (res?.code === 200) {
        message.success(res.message);
        navigate("/login", { replace: true });
      }
    } catch (error) {
      message.error(
        error?.response?.data?.message ||
        messageContants.somethingWerntWrong
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
    <Spin spinning={pageLoader} tip="Verifying reset link...">
      <Flex className="min-h-screen bg-white">
        {/* Branding panel */}
        <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-950 p-12 text-white lg:flex xl:p-16">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" />

          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400 text-2xl font-bold text-slate-950">
              ✦
            </div>
            <Text className="!text-xl !font-semibold !text-white">
              Spark Collab
            </Text>
          </div>

          <div className="relative max-w-lg">
            <span className="mb-5 inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium tracking-wide text-emerald-300">
              SECURE YOUR ACCOUNT
            </span>

            <Title className="!mb-5 !text-5xl !leading-tight !text-white xl:!text-6xl">
              A stronger password.
              <span className="text-emerald-400">
                {" "}A fresh start.
              </span>
            </Title>

            <Text className="!text-base !leading-7 !text-slate-400">
              Choose a strong, unique password to protect
              your account and get back to collaborating
              with your team.
            </Text>

            <div className="mt-8 flex items-center gap-3">
              <SafetyCertificateOutlined className="!text-xl !text-emerald-400" />
              <Text className="!text-sm !text-slate-400">
                Your workspace, protected.
              </Text>
            </div>
          </div>

          <Text className="relative !text-xs !text-slate-500">
            Collaborate. Create. Connect.
          </Text>
        </div>

        {/* Reset form */}
        <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-5 py-10 lg:w-1/2 lg:bg-white">
          <div className="w-full max-w-md">
            <div className="mb-9 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-xl font-bold text-emerald-700">
                ✦
              </div>
              <Text className="!text-lg !font-semibold !text-slate-900">
                Spark Collab
              </Text>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 lg:border-0 lg:p-8 lg:shadow-none">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate("/login")}
                className="!mb-7 !px-0 !text-slate-500 hover:!text-emerald-700"
              >
                Back to login
              </Button>

              <div className="mb-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl text-emerald-700">
                  <LockOutlined />
                </div>

                <Text className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                  PASSWORD RESET
                </Text>

                <Title
                  level={2}
                  className="!mb-2 !mt-3 !text-3xl !font-semibold !tracking-tight !text-slate-900"
                >
                  Create a new password
                </Title>

                <Text className="!text-sm !leading-6 !text-slate-500">
                  Use a strong password you don't use
                  for other accounts.
                </Text>
              </div>

              <Form
                layout="vertical"
                onFinish={handleResetPassword}
                requiredMark={false}
                size="large"
              >
                <Form.Item
                  name="password"
                  label={
                    <span className="font-medium text-slate-700">
                      New password
                    </span>
                  }
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
                    prefix={
                      <LockOutlined className="!text-slate-400" />
                    }
                    autoComplete="new-password"
                    placeholder="Enter new password"
                    className="!h-12 !rounded-xl"
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label={
                    <span className="font-medium text-slate-700">
                      Confirm password
                    </span>
                  }
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          !value ||
                          getFieldValue("password") === value
                        ) {
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
                    prefix={
                      <LockOutlined className="!text-slate-400" />
                    }
                    autoComplete="new-password"
                    placeholder="Confirm new password"
                    className="!h-12 !rounded-xl"
                  />
                </Form.Item>

                <Button
                  htmlType="submit"
                  type="primary"
                  block
                  loading={loading}
                  icon={!loading && <ArrowRightOutlined />}
                  iconPosition="end"
                  className="!mt-2 !h-12 !rounded-xl !border-emerald-600 !bg-emerald-600 !font-semibold shadow-sm hover:!border-emerald-700 hover:!bg-emerald-700"
                >
                  Reset password
                </Button>
              </Form>

              <div className="mt-7 text-center">
                <Text className="!text-sm !text-slate-500">
                  Remembered your password?{" "}
                </Text>
                <Button
                  type="link"
                  className="!px-1 !font-semibold !text-emerald-700"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              <SafetyCertificateOutlined className="!text-slate-400" />
              <Text className="!text-xs !text-slate-400">
                Secure password recovery
              </Text>
            </div>
          </div>
        </div>
      </Flex>
    </Spin>
  );
};

export default ResetPassword;
