import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getVerificationEmailTemplate } from "./emailTemplate.js";
dotenv.config();

// create Gmail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

//verify connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.log("Email service is not working:", error);
    } else {
        console.log("Email service is ready to send messages.");
    }
});
// send verification email
export const sendVerificationEmail = async (email, token, userName) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/api/v1/auth/verify-email?token=${token}`;
    const mailOptions = {
        from:{
            name: 'ระบบการแข่งขันวันวิทยาศาสตร์',
            email: process.env.EMAIL_FROM
        },
        to: email,
        subject: "กรุณายืนยันอีเมลของคุณ - ระบบการแข่งขันวันวิทยาศาสตร์",
        html: getVerificationEmailTemplate(verificationUrl, userName),
        text: `<h2>ยินดีต้อนรับสู่ระบบการแข่งขันทางวิทยาศาสตร์!</h2>
            <p>เรียน คุณ${userName},</p>
            <p>ขอบคุณที่ลงทะเบียนเข้าร่วมระบบการแข่งขันทางวิทยาศาสตร์ เรายินดีเป็นอย่างยิ่งที่ได้ต้อนรับคุณเข้าสู่ระบบ</p>
            <p>กรุณายืนยันอีเมลของคุณเพื่อดำเนินการลงทะเบียนให้เสร็จสมบูรณ์และเข้าใช้งานระบบ</p>
                <a href="${verificationUrl}" class="button">ยืนยันอีเมล</a>
                <p>⚠️ ลิงก์ยืนยันอีเมลนี้จะหมดอายุภายใน 24 ชั่วโมง</p>
                <p>หากคุณไม่ได้เป็นผู้ลงทะเบียน กรุณาละเว้นการคลิกลิงก์นี้</p>
            <p>นี่เป็นข้อความอัตโนมัติ กรุณาอย่าตอบกลับอีเมลนี้</p>
            <p>&copy; ${new Date().getFullYear()} ระบบการแข่งขันทางวิทยาศาสตร์ สงวนลิขสิทธิ์</p>`
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Verification email sent:", info.response);
        return info;
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
};
export default sendVerificationEmail;