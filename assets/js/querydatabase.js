const mysql = require('mysql');

var config =
{
	host: '127.0.0.1:50870',
	user: 'azure',
	password: '6#vWHD_$',
	database: 'localdb',
	port: 3306,
	ssl: true
};

const conn = new mysql.createConnection(config);

conn.connect(
	function (err) { 
	if (err) { 
		console.log("!!! Cannot connect !!! Error:");
		throw err;
	}
	else
	{
	   console.log("Connection established.");
           queryDatabase();
	}	
});

function queryDatabase(){
	   conn.query('DROP TABLE IF EXISTS inventory;', function (err, results, fields) { 
			if (err) throw err; 
			console.log('Dropped inventory table if existed.');
		})
  	   conn.query('CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);', 
	      	function (err, results, fields) {
      			if (err) throw err;
			console.log('Created inventory table.');
		})
	   conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['banana', 150], 
      		function (err, results, fields) {
      			if (err) throw err;
			else console.log('Inserted ' + results.affectedRows + ' row(s).');
	   	})
	   conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['orange', 154], 
      		function (err, results, fields) {
      			if (err) throw err;
			console.log('Inserted ' + results.affectedRows + ' row(s).');
	   	})
	   conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['apple', 100], 
		function (err, results, fields) {
      			if (err) throw err;
			console.log('Inserted ' + results.affectedRows + ' row(s).');
	   	})
	   conn.end(function (err) { 
		if (err) throw err;
		else  console.log('Done.') 
		});
};