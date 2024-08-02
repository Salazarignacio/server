import { createTransport } from "nodemailer";
import __dirname from "../utils.js";
import environment from "./env.util.js";

const {GOOGLE_EMAIL, GOOGLE_PASSWORD} = environment
async function recoverPass(data){
    try {
        const transport = createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {user: GOOGLE_EMAIL, pass: GOOGLE_PASSWORD}
        })
        await transport.verify()
        await transport.sendMail({
            from: GOOGLE_EMAIL,
            to: data.to,
            subject: `verify password`,
            html: `<h1>Recovery password</h1>
            <p>VERIFY CODE: ${data.code}</p>
            <a href="http://localhost:8080/recovery">Click here to change your password</a>`
        })
    } catch (error) {
        throw error
    }
}

export default recoverPass