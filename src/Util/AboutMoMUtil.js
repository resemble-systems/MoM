const { Connect, Disconnect } = require("./ConnectionUtil");
const config = require("../Config/Resemble-db.MOM");
const configUser = require("../Config/RSEmployeeManagement")
const sql = require("mssql");
const moment = require("moment");
const { getAdmin } = require("../Handler/AdminHandler");

const updateAboutMoM = async (data) => {
  // check admin
  let connectedUser = await Connect(configUser);
  const requestUser = connectedUser.request();
  let isAdmin = await getAdmin(requestUser,data.applicationUserid)
  await Disconnect()

  if(!isAdmin) return {status:400,message:"You Have No Access"}

  let connected = await Connect(config);
  const request = connected.request();
  let currentDate = moment.utc().format("YYYY-MM-DD HH:mm:ss");
  
  const result = await request.query(`
    UPDATE Tbl_AboutHadaf 
    SET About_Hadaf = '${data.about_Hadaf}', 
    updated_at = '${currentDate}', 
    ApplicationUserid = '${data.applicationUserid}' 
    WHERE About_id = '${data.about_id}'
  `);
  await Disconnect();
  if (result.rowsAffected[0] == 1)
    return { status: 200, message: "Succesfully Updated" };
  else return { status: 404, message: "Updation Failed, Try Again" };
};

const getAboutMoM = async () => {
  let connected = await Connect(config);
  const request = connected.request();
  const result = await request.query(
    `SELECT * FROM Tbl_AboutHadaf
          WHERE About_id = 1`
  );
  await Disconnect();
  return { status: 200, message: result.recordset };
};

module.exports = { updateAboutMoM, getAboutMoM };
