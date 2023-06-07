const nodemailer = require("nodemailer");
const mjml = require("mjml");

// create transporter object with smtp server details
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.IRMB_SENDER_EMAIL,
    pass: process.env.IRMB_SENDER_PASSWORD,
  },
  from: process.env.IRMB_SENDER_EMAIL,
});

const newUserAccount = (emailObj: any) => {
  return `<mjml>
  <mj-body>
    <!-- Company Header -->
    <mj-section>
      
    </mj-section>

    <!-- Image Header -->
    <mj-section>
      <mj-column>
        <mj-text align="center" color="#626262" font-size="26px" font-family="Helvetica Neue">Your account has been created</mj-text>
      </mj-column>
    </mj-section>


    <!-- Intro text -->
    <mj-section>
      <mj-column>

        <mj-text color="#525252">
          Hi there ${emailObj.user.firstName}, <br />
          We would like to inform you that your account has been created in CVL-CMS.<br /><br />

          You will need to first create your password.
          
        </mj-text>


        <mj-button background-color="#0063CF" href=${
          process.env.CONTRACT_APP_URL +
            "/reset-password?token=" +
            emailObj.token +
            "&userId=" +
            emailObj.user._id ||
          "https://dapproval-mauve.vercel.app/reset-password?token=" +
            emailObj.token +
            "&userId=" +
            emailObj.user._id
        }>Create password</mj-button>
      </mj-column>
    </mj-section>

    <!-- Social icons -->
    <mj-section padding="10px 0 20px 0">
      <mj-column>
        <mj-text align="center" color="#9B9B9B" font-size="11px"><br />KN 3 Av. 2 Grand Pension Plaza, 14th Floor |  P.O. Box 1287 Kigali, Rwanda<br /> </mj-text>
      </mj-column>
    </mj-section>
    <mj-section></mj-section>

  </mj-body>
</mjml>`;
};

const newFile = (emailObj: any) => {
  return `<mjml>
  <mj-body>
    <!-- Company Header -->
    <mj-section>
      
    </mj-section>

    <!-- Image Header -->
    <mj-section>
      <mj-column>
        <mj-text align="center" color="#626262" font-size="26px" font-family="Helvetica Neue">New File</mj-text>
      </mj-column>
    </mj-section>


    <!-- Intro text -->
    <mj-section>
      <mj-column>

        <mj-text color="#525252">
          Hi there, <br />
          We would like to inform you that a file is created in CVL-CMS and you are part of the collaborators.<br /><br />
          
         <a href=${emailObj.file.url}> Click to view file </a>
          
        </mj-text>


        <mj-button background-color="#0063CF" href=${
          process.env.CONTRACT_APP_URL + "/documents/files/" + emailObj.file.id
        }>Go to application</mj-button>
      </mj-column>
    </mj-section>

    <!-- Social icons -->
    <mj-section padding="10px 0 20px 0">
      <mj-column>
        <mj-text align="center" color="#9B9B9B" font-size="11px"><br />KN 3 Av. 2 Grand Pension Plaza, 14th Floor |  P.O. Box 1287 Kigali, Rwanda<br /> </mj-text>
      </mj-column>
    </mj-section>
    <mj-section></mj-section>

  </mj-body>
</mjml>`;
};
const comment = (emailObj: any) => {
  return `<mjml>
  <mj-body>
    <!-- Company Header -->
    <mj-section>
      
    </mj-section>

    <!-- Image Header -->
    <mj-section>
      <mj-column>
        <mj-text align="center" color="#626262" font-size="26px" font-family="Helvetica Neue">File updates</mj-text>
      </mj-column>
    </mj-section>


    <!-- Intro text -->
    <mj-section>
      <mj-column>

        <mj-text color="#525252">
          Hi there, <br />
          ${emailObj.comment.collaborator.firstName} has commented on a file you collaborate on.<br /><br />
          Here is the comment: 
          <b><code>${emailObj.comment.comment}</code></b> <br/><br/>
          
         <a href=${emailObj.file.url}> Click to view file </a>
          
        </mj-text>


        <mj-button background-color="#0063CF" href=${
          process.env.CONTRACT_APP_URL + "/documents/files/" + emailObj.file.id
        }>Go to application</mj-button>
      </mj-column>
    </mj-section>

    <!-- Social icons -->
    <mj-section padding="10px 0 20px 0">
      <mj-column>
        <mj-text align="center" color="#9B9B9B" font-size="11px"><br />KN 3 Av. 2 Grand Pension Plaza, 14th Floor |  P.O. Box 1287 Kigali, Rwanda<br /> </mj-text>
      </mj-column>
    </mj-section>
    <mj-section></mj-section>

  </mj-body>
</mjml>`;
};


const passwordRecover = (emailObj: any) => {
  return `<mjml>
  <mj-body>
    <!-- Company Header -->
    <mj-section>
      
    </mj-section>

    <!-- Intro text -->
    <mj-section>
      <mj-column>

        <mj-text color="#525252">
          Hi ${emailObj.user.firstName}, <br /><br />
          <mj-text>
            Someone has requested a link to change your password in CVL-CMS. You can do this through the link below.
          </mj-text>

        </mj-text>

        <mj-button background-color="#0063CF" href=${
          process.env.CONTRACT_APP_URL +
            "/reset-password?token=" +
            emailObj.token +
            "&userId=" +
            emailObj.user._id ||
          "https://dapproval-mauve.vercel.app/reset-password?token=" +
            emailObj.token +
            "&userId=" +
            emailObj.user._id
        }>Reset my password</mj-button>

        <mj-text>
          If you didn't request this, please ignore this email.
        </mj-text>
        <mj-text>
          Your password won't change until you access the link above and create a new one.</mj-text>
      </mj-column>
    </mj-section>

     <!-- Social icons -->
    <mj-section padding="10px 0 20px 0">
      <mj-column>
        <mj-text align="center" color="#9B9B9B" font-size="11px"><br />KN 3 Av. 2 Grand Pension Plaza, 14th Floor |  P.O. Box 1287 Kigali, Rwanda<br /> </mj-text>
      </mj-column>
    </mj-section>
    <mj-section></mj-section>

  </mj-body>
</mjml>`;
};

const otp = (emailObj: any) => {
  return `<mjml>
  <mj-body>
    
    <!-- Intro text -->
    <mj-section>
      <mj-column>

        <mj-text color="#525252">
          Hi ${emailObj.firstName}, <br /><br />
          <mj-text>
            Your CVL-CMS OTP is ${emailObj.otp}.
          </mj-text>

        </mj-text>

        <mj-button background-color="#0063CF" href=${process.env.CONTRACT_APP_URL}/?userId='${emailObj._id}=&code=${emailObj.otp}>Authenticate my account</mj-button>
      </mj-column>
    </mj-section>

    <!-- Social icons -->
    <mj-section padding="10px 0 20px 0">
      <mj-column>
        <mj-text align="center" color="#9B9B9B" font-size="11px"><br />KN 3 Av. 2 Grand Pension Plaza, 14th Floor |  P.O. Box 1287 Kigali, Rwanda<br /> </mj-text>
      </mj-column>
    </mj-section>
    <mj-section></mj-section>

  </mj-body>
</mjml>`;
};

// send email
export async function send(
  from: string,
  to: string | undefined | string[] | String,
  subject: string,
  text: string,
  html: string,
  type: string
) {
  // console.log("sent");
  try {
    if (type === "newUserAccount")
      return await transporter.sendMail({
        from: process.env.IRMB_SENDER_EMAIL,
        to,
        subject,
        text,
        html: mjml(newUserAccount(JSON.parse(text))).html,
      });
    else if (type === "newFile")
      return await transporter.sendMail({
        from: process.env.IRMB_SENDER_EMAIL,
        to,
        subject,
        text,
        html: mjml(newFile(JSON.parse(text))).html,
      });

      else if (type === "comment")
      return await transporter.sendMail({
        from: process.env.IRMB_SENDER_EMAIL,
        to,
        subject,
        text,
        html: mjml(comment(JSON.parse(text))).html,
      });
    else if (type === "passwordRecover")
      return await transporter.sendMail({
        from: process.env.IRMB_SENDER_EMAIL,
        to,
        subject,
        text,
        html: mjml(passwordRecover(JSON.parse(text))).html,
      });
    else if (type === "otp") {
      return await transporter.sendMail({
        from: process.env.IRMB_SENDER_EMAIL,
        to,
        subject,
        text,
        html: mjml(otp(JSON.parse(text))).html,
      });
    } else if (type == "expiration") {
      console.log(html);
      return await transporter.sendMail({
        from: process.env.IRMB_SENDER_EMAIL,
        to,
        subject,
        text,
        html: mjml(html).html,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
