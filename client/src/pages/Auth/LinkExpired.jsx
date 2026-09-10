import { Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const LinkExpired = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-emerald-600">
						Spark Collab
					</h1>

					<p className="mt-2 text-sm text-slate-500">
						Password Reset
					</p>
				</div>

				<div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 text-center">
					<div className="flex justify-center mb-5">
						<div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50">
							<ExclamationCircleOutlined className="!text-2xl !text-red-500" />
						</div>
					</div>

					<h2 className="text-xl font-semibold text-slate-800">
						Link Expired
					</h2>

					<p className="mt-2 text-sm leading-6 text-slate-500">
						This password reset link is invalid or has expired.
						Please request a new password reset link.
					</p>

					<Button
						type="primary"
						size="large"
						block
						className="!mt-6 !bg-emerald-600 hover:!bg-emerald-700"
						onClick={() => navigate("/forgot-password")}
					>
						Request New Link
					</Button>

					<Button
						type="link"
						className="!mt-3 !px-0 !text-sm !font-normal !text-emerald-600"
						onClick={() => navigate("/login")}
					>
						Back to Login
					</Button>
				</div>
			</div>
		</div>
	);
};
export default LinkExpired;
