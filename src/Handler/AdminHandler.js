const getAdmin = async (request,email) => {
  console.log(email);

  let readUserId = await request.query(`
    SELECT Id FROM AspNetUsers
    WHERE Email = '${email}'
  `);

  let readRoleId = await request.query(`
    SELECT RoleId FROM AspNetUserRoles
    WHERE UserId = '${readUserId.recordset[0].Id}'
  `);

  let readRoleName = await request.query(`
    SELECT Name FROM AspNetRoles
    WHERE Id = '${readRoleId.recordset[0].RoleId}'
  `);

  if(readRoleName.recordset[0].Name == "Admin") return true
  else return false
};

module.exports = {getAdmin};
