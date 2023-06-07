import { send } from "./sendEmailNode";

import moment from "moment";
import { FilingModel } from "../models/filings";

import mjmlCore from "mjml";

// const send = require("../utils/sendEmailNode");
const mjml2html = require("mjml");

let link = process.env.CONTRACT_APP_URL;

async function getFileWatchers() {
  try {
    return [
      {
        email: "bhigiro@cvl.co.rw",
      },
    ];
  } catch (err) {}
}

export async function getFilesToExpireinOneWeek() {
  let list = await getFileWatchers();
  let emailList = list?.map(($: any) => {
    return $.email;
  });

  let pipeline = [
    {
      $match: {
        contractExpiration: {
          $lt: moment().add(1, "week").toDate(),
        },
      },
    },
    {
      $lookup: {
        from: "executionstatuses",
        localField: "statusOfExecution",
        foreignField: "_id",
        as: "statusOfExecution",
      },
    },
    {
      $unwind: {
        path: "$statusOfExecution",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $lookup: {
        from: "agreementtypes",
        localField: "agreementType",
        foreignField: "_id",
        as: "agreementType",
      },
    },
    {
      $unwind: {
        path: "$agreementType",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $lookup: {
        from: "expiryactions",
        localField: "actionOnExpiry",
        foreignField: "_id",
        as: "actionOnExpiry",
      },
    },
    {
      $unwind: {
        path: "$actionOnExpiry",
        preserveNullAndEmptyArrays: false,
      },
    },
  ];

  try {
    let filesToExpire = await FilingModel.aggregate(pipeline);

    let emailBodies = filesToExpire?.map((f) => {
      return `
      <mjml>
  <mj-head>
    <mj-attributes>
      <mj-text font-family="Ubuntu, Helvetica, Arial, sans-serif" color="#000000"></mj-text>
      <mj-class name="description"></mj-class>
      <mj-class name="preheader" color="#000000" font-size="11px"></mj-class>
      <mj-class name="button" background-color="#fcc245" color="#000000" font-size="18px" border-radius="3px" font-family="Ubuntu, Helvetica, Arial, sans-serif"></mj-class>
    </mj-attributes>
    <mj-style inline="inline">a { text-decoration: none!important; }</mj-style>
  </mj-head>
  <mj-body>
    <mj-raw>
      <!-- Company Header -->
    </mj-raw>

    <mj-raw>
      <!-- Image Header -->
    </mj-raw>
    <mj-section >
      <mj-column>
        <mj-text color="#000000" font-size="20px">Expiry Notification</mj-text>
      </mj-column>
    </mj-section>
    <mj-raw>
      <!-- Intro text -->
    </mj-raw>
    <mj-section>
      <mj-column>
        <mj-text color="#525252">Good morning. <br/><br/>
          This is to notify you that we found files that will expire in one week from now.<br /><br/>
          Please find more details below. <br/><br/>
        
        </mj-text>

        <mj-text>
        	<b>File name: </b>${f?.name}<br></br>
        	<b>Description: </b>${f?.description}<br></br>
        	<b>Agreement type: </b>${f?.agreementType?.description}<br></br>
        	<b>Action to take: </b>${f?.actionOnExpiry?.description}<br></br>
          <a href=${f?.docId}>click here to view/download the file</a><br></br>
        </mj-text>
        <mj-button background-color="#0F52BA" color="#ffffff" font-size="12px" border-radius="5px" href="${link}/documents/files/${f?._id}" padding="10px 25px">Go to application</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;
    });

    emailBodies.forEach(async (f, index) => {
      await send(
        "appinfo@construck.rw",
        "higirobru@gmail.com", //TO CHANGE
        "⚠️Notification. A file is about to expire.",
        "",
        f,
        "expiration"
      );
    });

    // if (filesToExpire.length > 0)
    //   send(
    //     "appinfo@construck.rw",
    //     "bhigiro@cvl.co.rw", //TO CHANGE
    //     "Jobs to expire today.",
    //     "",
    //     mjml2html(emailBodies[0], {
    //       keepComments: false,
    //     }).html
    //   )
    //     .then(() => console.log("Sent"))
    //     .catch((err: any) => {
    //       console.log(err);
    //       // err;
    //     });
  } catch (err) {
    console.log(err);
  }
}

export async function getFilesToExpireinOneMonth() {
  let list = await getFileWatchers();
  let emailList = list?.map(($: any) => {
    return $.email;
  });

  let pipeline = [
    {
      $match: {
        contractExpiration: {
          $lt: moment().add(1, "month").toDate(),
          $gt: moment().add(1, "week").toDate(),
        },
      },
    },
    {
      $lookup: {
        from: "executionstatuses",
        localField: "statusOfExecution",
        foreignField: "_id",
        as: "statusOfExecution",
      },
    },
    {
      $unwind: {
        path: "$statusOfExecution",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $lookup: {
        from: "agreementtypes",
        localField: "agreementType",
        foreignField: "_id",
        as: "agreementType",
      },
    },
    {
      $unwind: {
        path: "$agreementType",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $lookup: {
        from: "expiryactions",
        localField: "actionOnExpiry",
        foreignField: "_id",
        as: "actionOnExpiry",
      },
    },
    {
      $unwind: {
        path: "$actionOnExpiry",
        preserveNullAndEmptyArrays: false,
      },
    },
  ];

  try {
    let filesToExpire = await FilingModel.aggregate(pipeline);

    let emailBodies = filesToExpire?.map((f) => {
      return `
      <mjml>
  <mj-head>
    <mj-attributes>
      <mj-text font-family="Ubuntu, Helvetica, Arial, sans-serif" color="#000000"></mj-text>
      <mj-class name="description"></mj-class>
      <mj-class name="preheader" color="#000000" font-size="11px"></mj-class>
      <mj-class name="button" background-color="#fcc245" color="#000000" font-size="18px" border-radius="3px" font-family="Ubuntu, Helvetica, Arial, sans-serif"></mj-class>
    </mj-attributes>
    <mj-style inline="inline">a { text-decoration: none!important; }</mj-style>
  </mj-head>
  <mj-body>
    <mj-raw>
      <!-- Company Header -->
    </mj-raw>

    <mj-raw>
      <!-- Image Header -->
    </mj-raw>
    <mj-section >
      <mj-column>
        <mj-text color="#000000" font-size="20px">Expiry Notification</mj-text>
      </mj-column>
    </mj-section>
    <mj-raw>
      <!-- Intro text -->
    </mj-raw>
    <mj-section>
      <mj-column>
        <mj-text color="#525252">Good morning. <br/><br/>
          This is to notify you that we found files that will expire in one month from now.<br /><br/>
          Please find more details below. <br/><br/>
        
        </mj-text>

        <mj-text>
        	<b>File name: </b>${f?.name}<br></br>
        	<b>Description: </b>${f?.description}<br></br>
        	<b>Agreement type: </b>${f?.agreementType?.description}<br></br>
        	<b>Action to take: </b>${f?.actionOnExpiry?.description}<br></br>
          <a href=${encodeURI(
            f?.docId
          )}>click here to view/download the file</a><br></br>
        </mj-text>
        <mj-button background-color="#0F52BA" color="#ffffff" font-size="12px" border-radius="5px" href="${link}/documents/files/${
        f?._id
      }" padding="10px 25px">Go to application</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;
    });

    emailBodies.forEach(async (f, index) => {
      console.log("sending");
      await send(
        "appinfo@construck.rw",
        "higirobru@gmail.com", //TO CHANGE
        "⚠️Notification. A file is about to expire.",
        "",
        f,
        "expiration"
      );
    });

    // if (filesToExpire.length > 0)
    //   send(
    //     "appinfo@construck.rw",
    //     "bhigiro@cvl.co.rw", //TO CHANGE
    //     "Jobs to expire today.",
    //     "",
    //     mjml2html(emailBodies[0], {
    //       keepComments: false,
    //     }).html
    //   )
    //     .then(() => console.log("Sent"))
    //     .catch((err: any) => {
    //       console.log(err);
    //       // err;
    //     });
  } catch (err) {
    console.log(err);
  }
}
