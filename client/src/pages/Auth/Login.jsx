import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Flex,
	Form,
	Input,
	message,
	Typography,
} from "antd";
import { ArrowRightOutlined, LockOutlined } from "@ant-design/icons";
import { authenticateUser } from "../../services/authService";
import { messageContants } from "../../utils/constants";

const { Title, Text } = Typography;

const Login = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		try {
			setLoading(true);
			const res = await authenticateUser(values);

			if (res.code === 200) {
				message.success(res.message);
				navigate("/dashboard");
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

	const requiredRule = {
		required: true,
		message: messageContants.requiredMsg,
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
						YOUR SPACE TO CREATE
					</span>

					<Title className="!mb-5 !text-5xl !leading-tight !text-white xl:!text-6xl">
						Great ideas happen
						<span className="text-emerald-400"> together.</span>
					</Title>

					<Text className="!text-base !leading-7 !text-slate-400">
						Bring your team together, share ideas in real
						time, and turn your imagination into something
						amazing.
					</Text>

					<div className="mt-10 flex items-center gap-3">
						<div className="flex -space-x-2">
							{["S", "A", "R"].map((letter, index) => (
								<div
									key={letter}
									className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-950 text-xs font-semibold ${index === 0
											? "bg-emerald-200 text-emerald-900"
											: index === 1
												? "bg-teal-200 text-teal-900"
												: "bg-lime-200 text-lime-900"
										}`}
								>
									{letter}
								</div>
							))}
						</div>
						<Text className="!text-sm !text-slate-400">
							Ideas are better when shared.
						</Text>
					</div>
				</div>

				<Text className="relative !text-xs !text-slate-500">
					Collaborate. Create. Connect.
				</Text>
			</div>

			{/* Login form */}
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
						<div className="mb-8">
							<Text className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
								WELCOME BACK
							</Text>
							<Title level={2} className="!mb-2 !mt-3 !text-3xl !font-semibold !tracking-tight !text-slate-900">
								Sign in to your account
							</Title>
							<Text className="!text-sm !text-slate-500">
								Enter your details to continue to your workspace.
							</Text>
						</div>

						<Form
							layout="vertical"
							onFinish={onSubmit}
							requiredMark={false}
							size="large"
						>
							<Form.Item
								name="username"
								label={<span className="font-medium text-slate-700">Username</span>}
								rules={[requiredRule]}
							>
								<Input
									autoComplete="username"
									placeholder="Your username"
									className="!h-12 !rounded-xl"
								/>
							</Form.Item>

							<Form.Item
								name="password"
								label={<span className="font-medium text-slate-700">Password</span>}
								rules={[requiredRule]}
							>
								<Input.Password
									autoComplete="current-password"
									placeholder="Enter your password"
									className="!h-12 !rounded-xl"
								/>
							</Form.Item>

							<Flex justify="end" className="-mt-2 mb-5">
								<Button
									type="link"
									className="!px-0 !font-medium !text-emerald-700"
									onClick={() => navigate("/forgot-password")}
								>
									Forgot password?
								</Button>
							</Flex>

							<Button
								htmlType="submit"
								type="primary"
								block
								loading={loading}
								icon={!loading && <ArrowRightOutlined />}
								iconPosition="end"
								className="!h-12 !rounded-xl !border-emerald-600 !bg-emerald-600 !font-semibold shadow-sm hover:!border-emerald-700 hover:!bg-emerald-700"
							>
								Sign in
							</Button>
						</Form>

						<div className="my-7 flex items-center gap-3">
							<div className="h-px flex-1 bg-slate-200" />
							<Text className="!text-xs !text-slate-400">
								NEW TO SPARK COLLAB?
							</Text>
							<div className="h-px flex-1 bg-slate-200" />
						</div>

						<div className="text-center">
							<Text className="!text-sm !text-slate-600">
								Don't have an account?{" "}
							</Text>
							<Button
								type="link"
								className="!px-1 !font-semibold !text-emerald-700"
								onClick={() => navigate("/registration")}
							>
								Create account
							</Button>
						</div>
					</div>

					<div className="mt-6 flex items-center justify-center gap-2 text-slate-400">
						<LockOutlined />
						<Text className="!text-xs !text-slate-400">
							Secure sign in to your workspace
						</Text>
					</div>
				</div>
			</div>
		</Flex>
	);
};

export default Login;
