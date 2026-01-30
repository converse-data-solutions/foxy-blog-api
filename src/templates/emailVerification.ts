export const emailVerificationTemplate = (
  name: string,
  verifyUrl: string
) => `
  <div style="font-family: Arial; line-height: 1.6">
    <h2>Hello ${name} 👋</h2>

    <p>Thanks for signing up for <b>Blog App</b>.</p>

    <p>Please verify your email by clicking the button below:</p>

    <a href="${verifyUrl}"
       style="
         display:inline-block;
         padding:12px 20px;
         background:#4f46e5;
         color:#fff;
         text-decoration:none;
         border-radius:6px;
         margin-top:10px;
       ">
       Verify Email
    </a>

    <p style="margin-top:20px">
      This link will expire in <b>15 minutes</b>.
    </p>

    <p>If you didn’t create an account, you can safely ignore this email.</p>

    <br />
    <p>— Blog App Team</p>
  </div>
`;
