const mysql = require('mysql2');

// create the connection to database
const pool = mysql.createPool({
  host: 'dbcloud',
  user: 'root',
  password: 'password',
  database: 'AirLuxDB'
});

// Function to insert data into the buildings table
function insert(id, name, type, user_id) {
  // Check for invalid input
  if (!id || !name || !type) {
    console.error('Invalid input. id, name, type and user_id are required fields.');
    return;
  }
  pool.getConnection(function(err, connection) {
    
    if (err) { console.log(err); return; };// not connected!
    // Use the connection

    
  // SQL query using prepared statement
  let sqlPivot = 'INSERT INTO user_building (building_id, user_id) VALUES (?, ?)';
  let pivotData = [id, user_id];

  connection.execute(sqlPivot, pivotData, function(err, result) {
    if (err) console.log(err);
    else console.log('user_building pivot added successfully');
  });

  // SQL query using prepared statement
  let sql = 'INSERT INTO buildings (id, name, type) VALUES (?, ?, ?)';
  let data = [id, name, type];

  connection.execute(sql, data, function(err, result) {
    if (err) console.log(err);
    else console.log('Building added successfully');
  });
})
}


// Function to select data from the buildings table
function select() {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    // Use the connection

  // SQL query
  let sql = 'SELECT * FROM buildings';
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
})
}

// Function to update data in the buildings table
function update(id, name, type, user_id) {
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
  
  // Check for invalid input
  if (!id || !name || !type) {
    console.error('Invalid input. id, name, type and user_id are required fields.');
    return;
  }

  // SQL query using prepared statement
  let sql = 'UPDATE buildings SET name = ?, type = ? WHERE id = ?';
  let data = [name, client_id, value, id];

  connection.execute(sql, data, function(err, result) {
    if (err) throw err;
    console.log('building updated successfully');
  });
})
}

// Function to delete data from the buildings table
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
  let sql = 'DELETE FROM buildings WHERE id = ?';
  let data = [id];

  connection.execute(sql, data, function(err, result) {
    if (err) throw err;
    console.log('building deleted successfully');
  });
})
}

module.exports = {
  insert: insert,
  select: select,
  update: update,
  delete: remove
};