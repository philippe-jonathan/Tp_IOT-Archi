import mysql, { Pool } from "mysql2";
import { Controller } from "./Controller";

export class CaptorController implements Controller
{
  pool: Pool;
  constructor(){
    // create the connection to database
    this.pool = mysql.createPool({
      host: 'dbcloud',
      user: 'root',
      password: 'password',
      database: 'AirLuxDB'
    });
  }

  // Function to select data from the buildings table
  select() {
    this.pool.getConnection(function(err, connection) {
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

  // Function to delete data from the buildings table
  find(id: string) {
    // Check for invalid input
    if (!id) {
      console.error('Invalid input. id is a required field.');
      return;
    }
    this.pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
  
  
    // SQL query using prepared statement
    let sql = 'SELECT * FROM captors WHERE id = ?';
    let data = [id];
  
    connection.execute(sql, data, function(err, result) {
      if (err) throw err;
      console.log('captors deleted successfully');
    });
  })
  }
  
// Function to insert data into the captors table
insert(json: string) {
  let parsedData = JSON.parse(json);
  console.log('id = ' + parsedData.id + ', name = ' + parsedData.name + ', room_id = ' + parsedData.room_id + ' are required fields.');
  // Check for invalid input
  if (!parsedData.id || !parsedData.name || !parsedData.room_id) {
    console.error('Invalid input. id, name and room_id are required fields.');
    return;
  }
  this.pool.getConnection(function(err, connection) {
    if (err) { console.log(err); return; };// not connected!
    // Use the connection

  // SQL query using prepared statement
  let sql = 'INSERT INTO captors (id, name, room_id, value) VALUES (?, ?, ?, ?)';
  let data = [parsedData.id, parsedData.name, parsedData.room_id, parsedData.value];

  connection.execute(sql, data, function(err, result) {
    if (err) console.log(err);
    else console.log('Captor added successfully');
  });
  })
  }

  // Function to update data in the captors table
  update(json: string) {
    let parsedData = JSON.parse(json);
    this.pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection

  // Check for invalid input
  if (!parsedData.id || !parsedData.name || !parsedData.room_id || !parsedData.value) {
    console.error('Invalid input. id, name and room_id are required fields.');
    return;
  }

  // SQL query using prepared statement
  let sql = 'UPDATE captors SET name = ?, room_id = ?, value = ? WHERE id = ?';
  let data = [parsedData.name, parsedData.room_id, parsedData.value, parsedData.id];

  connection.execute(sql, data, function(err, result) {
    if (err) throw err;
    console.log('Captor updated successfully');
  });
  })
  }
  
  // Function to delete data from the captors table
  remove(id: string) {
    // Check for invalid input
    if (!id) {
      console.error('Invalid input. id is a required field.');
      return;
    }
    this.pool.getConnection(function(err, connection) {
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
}






