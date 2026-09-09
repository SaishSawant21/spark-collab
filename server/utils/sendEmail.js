import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config({ path: "env.local" });
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendResetPasswordEmail = async (email, resetToken) => {
  const resetUrl =
    `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  await resend.emails.send({
    from: "Spark Collab <onboarding@resend.dev>",
    to: email,
    subject: "Reset your Spark Collab password",
    html: `
      <h2>Reset your password</h2>

      <p>
        We received a request to reset your Spark Collab password.
      </p>

      <p>
        Click the button below to reset your password.
      </p>

      <a
        href="${resetUrl}"
        style="
          display: inline-block;
          padding: 10px 20px;
          background: #059669;
          color: white;
          text-decoration: none;
          border-radius: 6px;
        "
      >
        Reset Password
      </a>

      <p>
        This link will expire in 30 minutes.
      </p>

      <p>
        If you didn't request this, you can safely ignore this email.
      </p>
    `,
  });
}
