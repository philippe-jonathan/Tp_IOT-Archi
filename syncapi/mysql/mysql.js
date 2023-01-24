const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'dbcloud',
  user: 'root',
  password: 'password',
  database: 'AirLuxDB'
});

// function to insert data


const endConnection = () => {
    connection.end();
}

// connect to the database
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to database');
    }
});


module.exports = {
    postData: function (data) 
    {   
        // insert data into the table
        connection.query(
            'INSERT INTO captors (id, name, client_id, value) VALUES (?,?,?,?)',
            data,
            (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Data inserted successfully.`);
                }
            }
        )
        connection.end();
    }
}

