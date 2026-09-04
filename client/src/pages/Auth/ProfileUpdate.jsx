import { Button, Flex, Form, Input, message, Typography } from "antd";
import { messageContants } from "../../utils/constants";
import { getProfile, updateUserProfile } from "../../services/authService";
import { useState, useEffect } from "react";

const ProfileUpdate = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [initialProfile, setInitialProfile] = useState({});
	const requiredRule = {
		required: true,
		message: messageContants.requiredMsg,
	};

	const fetchProfile = async () => {
		try {
			const res = await getProfile();
			if (res?.code === 200) {
				const userData = res?.data;
				const profileData = {
					username: userData?.username,
					email: userData?.email,
				};
				// Store initial values for comparison later
				setInitialProfile(profileData);
				form.setFieldsValue(profileData);
			}
		} catch (error) {
			console.log(error)
			message.error(error?.response?.data?.message || messageContants.somethingWerntWrong);
		}
	};

	const updateProfile = async (values) => {
		try {
			setLoading(true);

			// Build payload containing only changed or newly entered fields
			const payload = {};

			if (values.username !== initialProfile.username) {
				payload.username = values.username;
			}
			if (values.email !== initialProfile.email) {
				payload.email = values.email;
			}
			if (values.password) {
				payload.password = values.password;
			}

			// Stop API call if nothing was modified
			if (Object.keys(payload).length === 0) {
				message.info("No changes made to update");
				return;
			}

			const res = await updateUserProfile(payload);
			if (res?.code === 200) {
				message.success(res?.message || "Profile updated successfully");
				// Refresh component state with new saved profile values
				setInitialProfile((prev) => ({ ...prev, ...payload }));
				form.setFieldsValue({ password: "", confirm_password: "" });
				fetchProfile();
			}
		} catch (error) {
			message.error(error?.response?.data?.message || messageContants.somethingWerntWrong);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	return (
		<div className="min-h-screen w-full bg-slate-50 px-4 py-6 sm:px-6 sm:py-8">
			<div className="mx-auto w-full max-w-2xl">
				<div className="mb-5 sm:mb-6">
					<Typography.Title
						level={2}
						className="!mb-1 !text-2xl !font-semibold !text-slate-900"
					>
						Profile
					</Typography.Title>

					<Typography.Text className="!text-slate-500">
						Manage your account information and security
					</Typography.Text>
				</div>

				<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-8">					{/* Account Header */}
					<Flex
						align="center"
						gap={14}
						className="mb-7 rounded-xl bg-emerald-50 px-4 py-4"
					>
						<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100">
							<span className="text-lg font-semibold text-emerald-600">
								✦
							</span>
						</div>

						<div>
							<div className="font-semibold text-slate-800">
								Account Information
							</div>

							<div className="text-sm text-slate-500">
								Update your personal details below
							</div>
						</div>
					</Flex>

					<Form
						form={form}
						onFinish={updateProfile}
						layout="vertical"
						requiredMark={false}
					>
						<div className="mb-6">
							<div className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
								Account details
							</div>

							<div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
								<Form.Item
									name="username"
									label={
										<span className="font-medium text-slate-700">
											Username
										</span>
									}
									rules={[requiredRule]}
								>
									<Input
										size="large"
										placeholder="Enter your username"
										className="!rounded-lg"
									/>
								</Form.Item>

								<Form.Item
									name="email"
									label={
										<span className="font-medium text-slate-700">
											Email
										</span>
									}
									rules={[
										requiredRule,
										{
											type: "email",
											message:
												messageContants.InavlidEmail,
										},
									]}
								>
									<Input
										size="large"
										placeholder="Enter your email"
										className="!rounded-lg"
									/>
								</Form.Item>
							</div>
						</div>

						<div className="border-t border-slate-100 pt-6">
							<div className="mb-4">
								<div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
									Security
								</div>

								<div className="mt-1 text-sm text-slate-500">
									Leave these fields empty if you don't want
									to change your password.
								</div>
							</div>

							<div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
								<Form.Item
									name="password"
									label={
										<span className="font-medium text-slate-700">
											New Password
										</span>
									}
								>
									<Input.Password
										size="large"
										placeholder="Enter new password"
										className="!rounded-lg"
									/>
								</Form.Item>

								<Form.Item
									name="confirm_password"
									label={
										<span className="font-medium text-slate-700">
											Confirm Password
										</span>
									}
									dependencies={["password"]}
									rules={[
										({ getFieldValue }) => ({
											validator(_, value) {
												const password =
													getFieldValue("password");

												if (password && !value) {
													return Promise.reject(
														new Error(
															messageContants.requiredMsg
														)
													);
												}

												if (
													value &&
													password !== value
												) {
													return Promise.reject(
														new Error(
															"Passwords do not match"
														)
													);
												}

												return Promise.resolve();
											},
										}),
									]}
								>
									<Input.Password
										size="large"
										placeholder="Confirm new password"
										className="!rounded-lg"
									/>
								</Form.Item>
							</div>
						</div>

						<div className="mt-3 border-t border-slate-100 pt-5">
							<Flex justify="end">
								<Button
									htmlType="submit"
									type="primary"
									size="large"
									loading={loading}
									className="!h-11 !rounded-lg !border-emerald-600 !bg-emerald-600 !px-7 !font-medium hover:!border-emerald-700 hover:!bg-emerald-700"
								>
									Save Changes
								</Button>
							</Flex>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
};
export default ProfileUpdate;
