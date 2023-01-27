const mysql = require('mysql2');

// create the connection to database
const pool = mysql.createPool({
  host: 'dbcloud',
  user: 'root',
  password: 'password',
  database: 'AirLuxDB'
});

// Function to insert data into the devices table
function insert(id, apns_token) {
    console.log('id = ' + id + ', apns_token = ' + apns_token + ' are required fields.');
  // Check for invalid input
  if (!id || !apns_token) {
    console.error('Invalid input. id, and apns_token are required fields.');
    return;
  }
  pool.getConnection(function(err, connection) {
    if (err) { console.log(err); return; };// not connected!
    // Use the connection

  // SQL query using prepared statement
  let sql = 'INSERT INTO devices (id, apns_token) VALUES (?, ?)';
  let data = [id, apns_token];

  connection.execute(sql, data, function(err, result) {
    if (err) console.log(err);
    else console.log('Device added successfully');
  });
})
}


// Function to select data from the devices table
function select() {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    // Use the connection

  // SQL query
  let sql = 'SELECT * FROM devices';
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
})
}

// Function to update data in the devices table
function update(id, apns_token) {
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
  
  // Check for invalid input
  if (!id || !apns_token) {
    console.error('Invalid input. id and apns_token are required fields.');
    return;
  }

  // SQL query using prepared statement
  let sql = 'UPDATE devices SET apns_token = ? WHERE id = ?';
  let data = [apns_token, id];

  connection.execute(sql, data, function(err, result) {
    if (err) throw err;
    console.log('Device updated successfully');
  });
})
}

// Function to delete data from the devices table
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
  let sql = 'DELETE FROM devices WHERE id = ?';
  let data = [id];

  connection.execute(sql, data, function(err, result) {
    if (err) throw err;
    console.log('Device deleted successfully');
  });
})
}

module.exports = {
  insert: insert,
  select: select,
  update: update,
  delete: remove
};