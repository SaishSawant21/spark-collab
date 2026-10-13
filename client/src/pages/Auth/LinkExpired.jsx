
import { Button, Flex, Typography } from "antd";
import {
	ArrowLeftOutlined,
	ArrowRightOutlined,
	ExclamationCircleOutlined,
	SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const LinkExpired = () => {
	const navigate = useNavigate();

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
					<span className="mb-5 inline-block rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1.5 text-xs font-medium tracking-wide text-red-300">
						LINK UNAVAILABLE
					</span>

					<Title className="!mb-5 !text-5xl !leading-tight !text-white xl:!text-6xl">
						Let's get you
						<span className="text-emerald-400"> back in.</span>
					</Title>

					<Text className="!text-base !leading-7 !text-slate-400">
						Reset links are time-sensitive to help keep your
						account secure. Request a new one and you'll be
						back to collaborating in no time.
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

			{/* Expired link message */}
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

					<div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10 lg:border-0 lg:p-8 lg:shadow-none">
						<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
							<ExclamationCircleOutlined className="!text-3xl !text-red-500" />
						</div>

						<Text className="text-sm font-semibold uppercase tracking-widest text-red-500">
							PASSWORD RESET
						</Text>

						<Title
							level={2}
							className="!mb-3 !mt-3 !text-3xl !font-semibold !tracking-tight !text-slate-900"
						>
							This link has expired
						</Title>

						<Text className="!text-sm !leading-6 !text-slate-500">
							This password reset link is invalid or has
							expired. Request a new link to securely reset
							your password.
						</Text>

						<Button
							type="primary"
							size="large"
							block
							icon={<ArrowRightOutlined />}
							iconPosition="end"
							className="!mt-8 !h-12 !rounded-xl !border-emerald-600 !bg-emerald-600 !font-semibold hover:!border-emerald-700 hover:!bg-emerald-700"
							onClick={() => navigate("/forgot-password")}
						>
							Request a new link
						</Button>

						<Button
							type="link"
							icon={<ArrowLeftOutlined />}
							className="!mt-4 !h-10 !font-medium !text-slate-500 hover:!text-emerald-700"
							onClick={() => navigate("/login")}
						>
							Back to login
						</Button>
					</div>

					<div className="mt-6 text-center">
						<Text className="!text-xs !text-slate-400">
							<SafetyCertificateOutlined /> Secure account recovery
						</Text>
					</div>
				</div>
			</div>
		</Flex>
	);
};
export default LinkExpired;
