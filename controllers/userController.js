const connection = require("../db/db");

async function getAllUserController(req, res) {
  try {
    const getQuery = `SELECT * FROM Users ORDER BY name`;
    connection.query(getQuery, function (err, result) {
      if (err) {
        throw err;
      }
      return res.json({
        status: 201,
        success: true,
        data: result,
      });
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 500,
      message: "Something went wrong",
    });
  }
}

async function getOneUserController(req, res) {
  try {
    const id = req.params.id;
    const getOneQuery = `SELECT * FROM Users WHERE id = ${id}`;
    connection.query(getOneQuery, function (error, result) {
      if (error) {
        console.log(error);
        return error;
      } else {
        return res.json({
          data: result,
          success: true,
          status: 200,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Something went wrong.",
    });
  }
}

async function addUserController(req, res) {
  const { name, email, phoneNumber } = req.body;
  console.log(req.body);
  if (!name || !email || !phoneNumber) {
    return res.json({
      success: false,
      status: 401,
      message: "name, email or phone number is missing.",
    });
  }
  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO Users (name, email, phoneNumbers) VALUES (? ,?, ?)",
        [name, email, phoneNumber],
        (error, result) => {
          if (error) {
            reject(error);
            return res.json({
              success: false,
              message: "invalid error",
            });
          }
          resolve(result);
        }
      );
    });

    const insertEntry = { id: result.insertId, name, email, phoneNumber };
    return res.status(201).json({
      success: true,
      data: insertEntry,
      message: "New entry has been created successfully.",
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 500,
      message: "Something went wrong.",
    });
  }
}

async function updateUserController(req, res) {
  const { name, email, phoneNumber } = req.body;
  const { id } = req.params;
  const updateQuery = `UPDATE Users SET name= ?, email =?, phoneNumber= ?   where id= ?`;
  connection.query(
    updateQuery,
    [name, email, phoneNumber, id],
    (error, results) => {
      console.log(results);
      if (error) {
        return error;
      }
      return res.json({
        success: true,
        data: results,
        status: 200,
      });
    }
  );
}

async function deleteUserController(req, res) {
  const id = req.params.id;
  try {
    const deleteQuery = `DELETE FROM Users WHERE id= ${id}`;
    connection.query(deleteQuery, function (error, result) {
      if (error) {
        console.log(error);
        return res.json({
          status: 401,
          message: "bad request",
        });
      } else {
        return res.json({
          status: 200,
          message: "Successfully Deleted.",
        });
      }
    });
  } catch (error) {
    return res.json({
      success: true,
      status: 500,
      message: "Something went wrong",
    });
  }
}
module.exports = {
  getAllUserController,
  getOneUserController,
  addUserController,
  updateUserController,
  deleteUserController,
};
