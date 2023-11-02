const connection = require("../db/db");

async function getAllUserController(req, res) {
  try {
    const getQuery = `SELECT * FROM Users ORDER BY name`;
    connection.query(getQuery, function (err, result) {
      if (err) {
        throw err;
      }
      return res.json({
        status: 200,
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
  if (!name || !email || !phoneNumber) {
    return res.status(401).json({
      success: false,
      message: "name, email, or phone number is missing.",
    });
  }
  try {
    // Perform a query to check if the email or phone number already exists
    connection.query(
      "SELECT * FROM Users WHERE email = ? OR phoneNumber = ?",
      [email, phoneNumber],
      (error, results) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Something went wrong while checking for duplicates.",
          });
        }

        if (results.length > 0) {
          return res.status(401).json({
            success: false,
            message: "email or phone number already exists",
          });
        }

        // If no duplicates were found, proceed to insert the new user
        connection.query(
          "INSERT INTO Users (name, email, phoneNumber) VALUES (?, ?, ?)",
          [name, email, phoneNumber],
          (error, result) => {
            if (error) {
              return res.status(500).json({
                success: false,
                message: "Something went wrong while inserting the new entry.",
              });
            }

            const insertEntry = {
              id: result.insertId,
              name,
              email,
              phoneNumber,
            };
            return res.status(201).json({
              success: true,
              data: insertEntry,
              message: "New entry has been created successfully.",
            });
          }
        );
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
}

async function updateUserController(req, res) {
  const { name, email, phoneNumber } = req.body;
  const { id } = req.params;
  const updateQuery = `UPDATE Users SET name = ?, email = ?, phoneNumber = ? WHERE id = ?`;

  connection.query(
    updateQuery,
    [name, email, phoneNumber, id],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Something went wrong.",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      // Fetch the updated user data after the update
      const selectQuery = "SELECT * FROM Users WHERE id = ?";
      connection.query(selectQuery, [id], (selectError, selectResult) => {
        if (selectError) {
          console.error(selectError);
          return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching user data.",
          });
        }

        const updatedUser = selectResult[0];
        return res.status(200).json({
          success: true,
          data: updatedUser,
          message: "User data updated successfully.",
        });
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
        return res.json({
          status: 401,
          success: false, 
          message: "bad request",
        });
      } else {
        return res.json({
          status: 200,
          success: true,
          message: "Successfully Deleted.",
        });
      }
    });
  } catch (error) {
    return res.json({
      success: false,
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
