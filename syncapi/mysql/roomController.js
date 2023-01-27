const mysql = require('mysql2');

// create the connection to database
const pool = mysql.createPool({
  host: 'dbcloud',
  user: 'root',
  password: 'password',
  database: 'AirLuxDB'
});

// Function to insert data into the rooms table
function insert(id, name, building_id) {
    console.log('id = ' + id + ', name = ' + name + ', building_id = ' + building_id + ' are required fields.');
  // Check for invalid input
  if (!id || !name || !building_id) {
    console.error('Invalid input. id, name and building_id are required fields.');
    return;
  }
  pool.getConnection(function(err, connection) {
    if (err) { console.log(err); return; };// not connected!
    // Use the connection

  // SQL query using prepared statement
  let sql = 'INSERT INTO rooms (id, name, building_id) VALUES (?, ?, ?)';
  let data = [id, name, building_id];

  connection.execute(sql, data, function(err, result) {
    if (err) console.log(err);
    else console.log('Room added successfully');
  });
})
}


// Function to select data from the rooms table
function select() {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    // Use the connection

  // SQL query
  let sql = 'SELECT * FROM rooms';
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
})
}

// Function to update data in the rooms table
function update(id, name, building_id) {
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
  
  // Check for invalid input
  if (!id || !name || !building_id) {
    console.error('Invalid input. id, name, and building_id are required fields.');
    return;
  }

  // SQL query using prepared statement
  let sql = 'UPDATE rooms SET name = ?, building_id = ? WHERE id = ?';
  let data = [name, building_id, id];

  connection.execute(sql, data, function(err, result) {
    if (err) throw err;
    console.log('Room updated successfully');
  });
})
}

// Function to delete data from the rooms table
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
  let sql = 'DELETE FROM rooms WHERE id = ?';
  let data = [id];

  connection.execute(sql, data, function(err, result) {
    if (err) throw err;
    console.log('Room deleted successfully');
  });
})
}

module.exports = {
  insert: insert,
  select: select,
  update: update,
  delete: remove
};