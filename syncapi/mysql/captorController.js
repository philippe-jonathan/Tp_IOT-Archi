const mysql = require('mysql2');

// create the connection to database
const pool = mysql.createPool({
  host: 'dbcloud',
  user: 'root',
  password: 'password',
  database: 'AirLuxDB'
});

// Function to insert data into the captors table
function insert(id, name, room_id, value) {
    console.log('id = ' + id + ', name = ' + name + ', room_id = ' + room_id + ' are required fields.');
  // Check for invalid input
  if (!id || !name || !room_id) {
    console.error('Invalid input. id, name and room_id are required fields.');
    return;
  }
  pool.getConnection(function(err, connection) {
    if (err) { console.log(err); return; };// not connected!
    // Use the connection

  // SQL query using prepared statement
  let sql = 'INSERT INTO captors (id, name, room_id, value) VALUES (?, ?, ?, ?)';
  let data = [id, name, room_id, value];

  connection.execute(sql, data, function(err, result) {
    if (err) console.log(err);
    else console.log('Captor added successfully');
  });
})
}


// Function to select data from the captors table
function select() {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    // Use the connection

  // SQL query
  let sql = 'SELECT * FROM captors';
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
})
}

// Function to update data in the captors table
function update(id, name, room_id, value) {
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
  
  // Check for invalid input
  if (!id || !name || !room_id) {
    console.error('Invalid input. id, name and room_id are required fields.');
    return;
  }

  // SQL query using prepared statement
  let sql = 'UPDATE captors SET name = ?, room_id = ?, value = ? WHERE id = ?';
  let data = [name, room_id, value, id];

  connection.execute(sql, data, function(err, result) {
    if (err) throw err;
    console.log('Captor updated successfully');
  });
})
}

// Function to delete data from the captors table
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
  let sql = 'DELETE FROM captors WHERE id = ?';
  let data = [id];

  connection.execute(sql, data, function(err, result) {
    if (err) throw err;
    console.log('Captor deleted successfully');
  });
})
}

module.exports = {
  insert: insert,
  select: select,
  update: update,
  delete: remove
};