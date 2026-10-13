
import {
    Button,
    Flex,
    Form,
    Input,
    message,
    Typography,
} from "antd";
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    LockOutlined,
    MailOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { messageContants } from "../../utils/constants";
import { sendForgotPasswordEmail } from "../../services/authService";

const { Title, Text } = Typography;

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async ({ email }) => {
        try {
            setLoading(true);

            const res = await sendForgotPasswordEmail({ email });

            if (res?.code === 200) {
                message.success(res.message);
                navigate("/login");
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

    return (
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
                        ACCOUNT RECOVERY
                    </span>

                    <Title className="!mb-5 !text-5xl !leading-tight !text-white xl:!text-6xl">
                        A fresh start
                        <span className="text-emerald-400"> is one step away.</span>
                    </Title>

                    <Text className="!text-base !leading-7 !text-slate-400">
                        Forgot your password? Don't worry. We'll help
                        you get back to your workspace and the ideas
                        you create with your team.
                    </Text>

                    <div className="mt-8 flex items-center gap-3 text-emerald-300">
                        <LockOutlined />
                        <Text className="!text-sm !text-slate-400">
                            Your account, protected.
                        </Text>
                    </div>
                </div>

                <Text className="relative !text-xs !text-slate-500">
                    Collaborate. Create. Connect.
                </Text>
            </div>

            {/* Recovery form */}
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
                                <MailOutlined />
                            </div>

                            <Text className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                                ACCOUNT RECOVERY
                            </Text>

                            <Title
                                level={2}
                                className="!mb-2 !mt-3 !text-3xl !font-semibold !tracking-tight !text-slate-900"
                            >
                                Forgot your password?
                            </Title>

                            <Text className="!text-sm !leading-6 !text-slate-500">
                                Enter the email address associated with
                                your account and we'll send you a reset link.
                            </Text>
                        </div>

                        <Form
                            layout="vertical"
                            onFinish={onSubmit}
                            requiredMark={false}
                            size="large"
                        >
                            <Form.Item
                                name="email"
                                label={
                                    <span className="font-medium text-slate-700">
                                        Email address
                                    </span>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: messageContants.requiredMsg,
                                    },
                                    {
                                        type: "email",
                                        message: "Please enter a valid email address",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={
                                        <MailOutlined className="!text-slate-400" />
                                    }
                                    autoComplete="email"
                                    placeholder="you@example.com"
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
                                Send reset link
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
                        <LockOutlined className="!text-slate-400" />
                        <Text className="!text-xs !text-slate-400">
                            Secure account recovery
                        </Text>
                    </div>
                </div>
            </div>
        </Flex>
    );
};

export default ForgotPassword;
