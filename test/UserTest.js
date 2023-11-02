const { expect } = require("chai");
const sinon = require("sinon");
const mysql = require("mysql2/promise");
const {
  getAllUserController,
  getOneUserController,
  addUserController,
  updateUserController,
  deleteUserController
} = require("../controllers/userController");

// describe('getAllUserController', () => {
//     it('should return a list of users with status 200', async () => {
//         const request = {}; // Mock request, not used in this function
//         const response = {
//           json: function (responseData) {
//             expect(responseData.status).to.equal(200);
//             expect(responseData.success).to.be.true;
//             expect(responseData.data).to.be.an('array'); // Ensure data is an array
//             expect(responseData.data).to.have.lengthOf(1); // Ensure the length of the data array

//             // Check the properties of the first user in the data array
//             const user = responseData.data[0];
//             expect(user).to.have.property('name', 'User 1');
//             expect(user).to.have.property('email', 'user1@example.com');
//             expect(user).to.have.property('phoneNumber', '12345');
//           },
//         };

//         const fakeUsers = [
//           { id: 1, name: 'User 1', email: 'user1@example.com', phoneNumber: '12345' },
//         ];

//         // Mock the behavior of the MySQL connection and query
//         const connection = {
//           query: sinon.stub().resolves([fakeUsers]),
//           end: sinon.stub().resolves(),
//         };

//         await getAllUserController(request, response, connection);
//       });

//   it('should handle errors with status 500', async () => {
//     const request = {}; // Mock request, not used in this function
//     const response = {
//       json: function (responseData) {
//         expect(responseData.status).to.equal(500);
//         expect(responseData.success).to.be.false;
//         expect(responseData.message).to.equal('Something went wrong');
//       },
//     };

//     // Mock the behavior of the MySQL connection and query to throw an error
//     const connection = {
//       query: sinon.stub().rejects(new Error('Database error')),
//       end: sinon.stub().resolves(),
//     };

//     await getAllUserController(request, response, connection);
//   });
// });

// describe('getOneUserController()', () => {
//     it('should return a single user with status 200', async () => {
//       const request = { params: { id: 1 } };
//       const response = {
//         json: function (responseData) {
//           expect(responseData.status).to.equal(200);
//           expect(responseData.success).to.be.true;
//           expect(responseData.data).to.be.an('array'); // Ensure data is an array
//           expect(responseData.data).to.have.lengthOf(1); // Ensure the length of the data array

//           // Check the properties of the first user in the data array
//           const user = responseData.data[0];
//           expect(user).to.have.property('name', 'User 1');
//           expect(user).to.have.property('email', 'user1@example.com');
//           expect(user).to.have.property('phoneNumber', '12345');
//         },
//       };

//       // Mock the behavior of the MySQL connection and query
//       const connection = {
//         query: sinon.stub().yields(null, [
//           {
//             id: 1,
//             name: 'User 1',
//             email: 'user1@example.com',
//             phoneNumber: '12345',
//           },
//         ]),
//         end: sinon.stub(),
//       };

//       await getOneUserController(request, response, connection);
//     });

//     it('should handle an error with status 500', async () => {
//       const request = { params: { id: 1 } };
//       const response = {
//         json: function (responseData) {
//           expect(responseData.status).to.equal(500);
//           expect(responseData.success).to.be.false;
//           expect(responseData.message).to.equal('Something went wrong.');
//         },
//       };

//       // Mock the behavior of the MySQL connection and query to simulate an error
//       const connection = {
//         query: sinon.stub().yields(new Error('Database error')),
//         end: sinon.stub(),
//       };

//       await getOneUserController(request, response, connection);
//     });
//   });

// describe("addUserController()", () => {
//   it("should return status 401 if name, email, or phone number is missing", async () => {
//     const request = { body: {} };
//     const response = {
//       status: function (statusCode) {
//         expect(statusCode).to.equal(401);
//         return this;
//       },
//       json: function (responseData) {
//         expect(responseData.success).to.be.false;
//         expect(responseData.message).to.equal(
//           "name, email or phone number is missing."
//         );
//       },
//     };

//     const connection = {
//       query: sinon.stub(),
//       end: sinon.stub(),
//     };

//     await addUserController(request, response, connection);
//   });

//   it('should return status 401 if email and phone number already exist', async () => {
//     const req = {
//       body: { name: 'John Doe', email: 'user1@example.com', phoneNumber: '12345' }
//     };
//     const res = {
//       status: function (statusCode) {
//         expect(statusCode).to.equal(401);
//         return this;
//       },
//       json: function (responseData) {
//         expect(responseData.success).to.be.false;
//         expect(responseData.message).to.equal('email and phone number is already exists');
//       },
//     };

//     // Mock the behavior of the MySQL connection and query
//     const connection = {
//       query: sinon.stub().yields(null, [{ email: 'user1@example.com', phoneNumber: '12345' }]),
//       end: sinon.stub(),
//     };

//     await addUserController(req, res, connection);
//   });

// describe('updateUserController()', () => {
//     it('should return status 200 and updated user data', async () => {
//       const req = { body: { name: 'Updated Name', email: 'updated@example.com', phoneNumber: '555-555-5555' }, params: { id: 1 } };
//       const res = {
//         status: function (statusCode) {
//           expect(statusCode).to.equal(200);
//           return this;
//         },
//         json: function (responseData) {
//           // Verify the response data
//           expect(responseData.success).to.be.true;
//           expect(responseData.data.name).to.equal('second name');
//           expect(responseData.data.email).to.equal('namesecond@example.com');
//           expect(responseData.data.phoneNumber).to.equal('555-555-5555');
//           // You can add more assertions as needed
//         },
//       };
  
//       // Mock the behavior of the MySQL connection and query
//       const connection = {
//         query: sinon.stub().yields(null, { affectedRows: 1 }),
//       };
  
//       await updateUserController(req, res, connection);
//     });
//   });


describe('deleteUserController()', () => {
  it('should return status 200 and a success message when a user is successfully deleted', async () => {
    const req = { params: { id: 6 } };
    const res = {
      json: function (responseData) {
        expect(responseData.status).to.equal(200);
        expect(responseData.success).to.be.true;
        expect(responseData.message).to.equal('Successfully Deleted.');
      },
    };

    // Mock the behavior of the MySQL connection and query
    const connection = {
      query: sinon.stub().yields(null, { affectedRows: 1 }),
    };

    await deleteUserController(req, res, connection);
  });

  it('should return status 401 and an error message when an error occurs during deletion', async () => {
    const req = { params: { id: 1 } };
    const res = {
      json: function (responseData) {
        expect(responseData.status).to.equal(401);
        expect(responseData.success).to.be.false;
        expect(responseData.message).to.equal('bad request');
      },
    };

    // Mock the behavior of the MySQL connection and query to simulate an error
    const connection = {
      query: sinon.stub().yields(new Error('Database error')),
    };

    await deleteUserController(req, res, connection);
  });

});
