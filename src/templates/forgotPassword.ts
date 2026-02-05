export const forgotPasswordTemplate = (
  name: string,
  resetUrl: string
) => `
  <div style="font-family: Arial; line-height: 1.6">
    <h2>Hello ${name} 👋</h2>

    <p>We received a request to reset your password for <b>Blog App</b>.</p>

    <p>Click the button below to create a new password:</p>

    <a href="${resetUrl}"
       style="
         display:inline-block;
         padding:12px 20px;
         background:#dc2626;
         color:#fff;
         text-decoration:none;
         border-radius:6px;
         margin-top:10px;
       ">
       Reset Password
    </a>

    <p style="margin-top:20px">
      This link will expire in <b>1 hour</b>.
    </p>

    <p>
      If you did not request a password reset, you can safely ignore this email.
      Your password will remain unchanged.
    </p>

    <br />
    <p>— Blog App Team</p>
  </div>
`;
