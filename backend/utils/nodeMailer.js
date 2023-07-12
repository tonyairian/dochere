const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const sendEmailDoctor = async (email, _id) => {
  // const link = process.env.LINK + _id;
  const link = `http://server.dochere.online/doctor/verify-email/id=${_id}`;
  const myEmail = process.env.MY_EMAIL;
  const password = process.env.PASSWORD;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: myEmail,
      pass: password,
    },
  });
  const res = await send();
  async function send() {
    const result = await transporter.sendMail({
      from: myEmail,
      to: email,
      subject: ".DOCHERE doctor email verification",
      text: `
      Hello ${email}
      
      Are you ready to gain access to all of the assets we prepared for doctors of .DOCHERE ?
      
      First, you must complete your registration by clicking on the button below:
      
      ${link}
      
      This link will verify your email address, and then you’ll officially be a part of the .DOCHERE community.
      
      See you there!
      
      Best regards, the .DOCHERE team`,
    });
    // console.log(JSON.stringify(result, null, 4));
    return result;
  }
  return res;
};

const sendEmail = async (email, _id) => {
  // const link = `http://localhost:4000/verify-email/id=${_id}`;
  const link = `https://server.dochere.online/verify-email/id=${_id}`;
  const myEmail = "tonyairian22@gmail.com";
  const password = "xnlpioftqyahlhlk";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: myEmail,
      pass: password,
    },
  });

  const res = await send();
  async function send() {
    const result = await transporter.sendMail({
      from: myEmail,
      to: email,
      subject: ".DOCHERE email verification",
      text: `
      Hello ${email}

      Are you ready to gain access to all of the assets we prepared for clients of .DOCHERE ?

      First, you must complete your registration by clicking on the button below:

      ${link}

      This link will verify your email address, and then you’ll officially be a part of the .DOCHERE community.

      See you there!

      Best regards, the .DOCHERE team`,
    });
    // console.log(JSON.stringify(result, null, 4));
    return result;
  }
  return res;
};

const forgotPasswordNodeMailer = async (userEmail, userId) => {
  // const forgotPasswordLink = `http://localhost:4000/forgot-password-approve/id=${userId}`;
  const forgotPasswordLink = `https://server.dochere.online/forgot-password-approve/id=${userId}`;
  const myEmail = "tonyairian22@gmail.com";
  const password = "xnlpioftqyahlhlk";
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: myEmail,
      pass: password,
    },
  });
  const res = await send();
  async function send() {
    const result = await transporter.sendMail({
      from: myEmail,
      to: userEmail,
      subject: ".DOCHERE forgot password",
      text: `
      Hi ${userEmail},
      
      There was a request to change your password!
      
      If you did not make this request then please ignore this email.
      
      Otherwise, please click this link to change your password:  ${forgotPasswordLink}`,
    });
    // console.log(JSON.stringify(result, null, 4));
    return result;
  }
  return res;
};

const forgotPasswordNodeMailerDoctor = async (doctorEmail, doctorId) => {
  // const forgotPasswordLink = `http://localhost:4000/doctor/forgot-password-approve/id=${doctorId}`;
  const forgotPasswordLink = `https://server.dochere.online/doctor/forgot-password-approve/id=${doctorId}`;
  const myEmail = "tonyairian22@gmail.com";
  const password = "xnlpioftqyahlhlk";
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: myEmail,
      pass: password,
    },
  });
  const res = await send();
  async function send() {
    const result = await transporter.sendMail({
      from: myEmail,
      to: doctorEmail,
      subject: ".DOCHERE forgot password doctor",
      text: `
      Hi ${doctorEmail},
      
      There was a request to change your password doctor!
      
      If you did not make this request then please ignore this email.
      
      Otherwise, please click this link to change your password:  ${forgotPasswordLink}`,
    });
    // console.log(JSON.stringify(result, null, 4));
    return result;
  }
  return res;
};

const doctorReject = async (doctorEmail, doctorId) => {
  const myEmail = "tonyairian22@gmail.com";
  const password = "xnlpioftqyahlhlk";
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: myEmail,
      pass: password,
    },
  });
  const res = await send();
  async function send() {
    const result = await transporter.sendMail({
      from: myEmail,
      to: doctorEmail,
      subject: ".DOCHERE Doctor",
      text: `
      Hi ${doctorEmail},
      
      Your application for doctor is rejected !
      
       you can apply again in 3 months.
      
      `,
    });
    // console.log(JSON.stringify(result, null, 4));
    return result;
  }
  return res;
};

const doctorApprovalEmail = async (doctorEmail, doctorId) => {
  const myEmail = "tonyairian22@gmail.com";
  const password = "xnlpioftqyahlhlk";
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: myEmail,
      pass: password,
    },
  });
  const res = await send();
  async function send() {
    const result = await transporter.sendMail({
      from: myEmail,
      to: doctorEmail,
      subject: ".DOCHERE Doctor",
      text: `
      Hi ${doctorEmail},
      
      We are excited to announce that your application has been approved !
      
       We welcome you to .DOCHERE community.
      
       Now you can login and access all our doctor functionalities
      `,
    });
    // console.log(JSON.stringify(result, null, 4));
    return result;
  }
  return res;
};

module.exports = {
  sendEmail,
  forgotPasswordNodeMailer,
  sendEmailDoctor,
  forgotPasswordNodeMailerDoctor,
  doctorReject,
  doctorApprovalEmail,
};
