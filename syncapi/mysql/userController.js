const mysql = require('mysql2');

// create the connection to database
const pool = mysql.createPool({
  host: 'dbcloud',
  user: 'root',
  password: 'password',
  database: 'AirLuxDB'
});
// @ device_id field missing

// Function to insert data into the users table
function insert(id, name, email, password) {
    console.log('id = ' + id + ', name = ' + name + ', email = ' + email+ ', password = ' + password + ' are required fields.');
  // Check for invalid input
  if (!id || !name || !email || !password) {
    console.error('Invalid input. id, name, email and password are required fields.');
    return;
  }
  pool.getConnection(function(err, connection) {
    if (err) { console.log(err); return; };// not connected!
    // Use the connection

  // SQL query using prepared statement
  let sql = 'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)';
  let data = [id, name, email, password];

  connection.execute(sql, data, function(err, result) {
    if (err) console.log(err);
    else console.log('User added successfully');
  });
})
}


// Function to select data from the users table
function select() {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    // Use the connection

  // SQL query
  let sql = 'SELECT * FROM users';
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
})
}

// Function to update data in the users table
function update(id, name, email, password) {
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
  
  // Check for invalid input
  if (!id || !name || !email || !password) {
    console.error('Invalid input. id, name, email and password are required fields.');
    return;
  }

  // SQL query using prepared statement
  let sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
  let data = [name, email, password, id];

  connection.execute(sql, data, function(err, result) {
    if (err) throw err;
    console.log('User updated successfully');
  });
})
}

// Function to delete data from the users table
function remove(id) {
  // Check for invalid input
  if (!id) {
    console.error('Invalid input. id is a required field.');
    return;
  }
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    // Use the connection


  // SQL query using prepared statement
  let sql = 'DELETE FROM users WHERE id = ?';
  let data = [id];

  connection.execute(sql, data, function(err, result) {
    if (err) throw err;
    console.log('User deleted successfully');
  });
})
}

module.exports = {
    insert: insert,
    select: select,
    update: update,
    delete: remove
  };