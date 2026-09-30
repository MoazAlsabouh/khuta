const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendVerificationEmail = async (email, code) => {
  const mailOptions = {
    from: `"منصة خريطة الدراسة" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'رمز التحقق الخاص بك',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: right; direction: rtl;">
        <h2>مرحباً بك في منصة خريطة الدراسة!</h2>
        <p>رمز التحقق الخاص بك هو: <strong style="font-size: 24px; color: #4CAF50;">${code}</strong></p>
        <p>هذا الرمز صالح لفترة قصيرة.</p>
      </div>
    `
  };
  await transporter.sendMail(mailOptions);
};

exports.sendResetPasswordEmail = async (email, code) => {
  const mailOptions = {
    from: `"منصة خريطة الدراسة" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'إعادة تعيين كلمة المرور',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: right; direction: rtl;">
        <h2>طلب إعادة تعيين كلمة المرور</h2>
        <p>رمز إعادة التعيين الخاص بك هو: <strong style="font-size: 24px; color: #f44336;">${code}</strong></p>
        <p>هذا الرمز صالح لمدة ساعة واحدة.</p>
      </div>
    `
  };
  await transporter.sendMail(mailOptions);
};
