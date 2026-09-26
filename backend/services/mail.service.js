import nodemailer from "nodemailer"

export const sendOtpEmail = async (email,otp)=>{
    const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    },  
    });
     await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Your Roop Setu Verification Code",
    html: `
      <h2>Roop Setu Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
    `,
  });  
}