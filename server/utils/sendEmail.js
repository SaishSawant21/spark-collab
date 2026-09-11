import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import dotenv from "dotenv";

dotenv.config({ path: "env.local" });

const mailerSend = new MailerSend({
  apiKey: process.env.MAIL_SEND_TOKEN,
});

export const sendResetPasswordEmail = async (email, resetToken) => {
  const resetUrl =
    `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  const sentFrom = new Sender(
    "noreply@test-3m5jgrox5jzgdpyo.mlsender.net",
    "Spark Collab"
  );

  const recipient = [
    new Recipient(email),
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipient)
    .setSubject("Reset your Spark Collab password")
    .setHtml(`
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
    `)
    .setText(`
      Reset your Spark Collab password

      We received a request to reset your Spark Collab password.

      Reset your password:
      ${resetUrl}

      This link will expire in 30 minutes.

      If you didn't request this, you can safely ignore this email.
    `);

  await mailerSend.email.send(emailParams);
};
