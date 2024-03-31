import nodemailer from "nodemailer";
export async function sendMail(toEmailAddress, mailSubject, mailText) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "codingninjas2k16@gmail.com",
        pass: "slwvvlczduktvhdj",
      },
    });
    const mainOptions = {
      from: "codingninjas2k16@gmail.com",
      to: toEmailAddress,
      subject: mailSubject,
      text: mailText,
    };

    const result = await transporter.sendMail(mainOptions);
    console.log("Email sent successfully");
  } catch (err) {
    console.log("Email send failed with error: " + err);
  }
}
