'use strict;'

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('company.sqlite', (err) => console.log('Connected'));
const employeeArray = [
    { id: 3, firstName: 'Dwight', lastName: 'Schrute' },
    { id: 4, firstName: 'Andy', lastName: 'Bernard' },
    { id: 5, firstName: 'Pam', lastName: 'Beesly' }
  ];

db.run('DROP TABLE IF EXISTS employees')

const createEmployeesTable = () => {
    db.run('CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT NOT NULL, last TEXT NOT NULL)', [], 
        function (err) {
            if (err) {errorHandler}; 
            addEmployees(query);
        }
    );
};


function addEmployees (nextStep) {
    db.run("INSERT INTO employees (id, first, last) VALUES (1, 'Michael', 'Scott')", [], errorHandler);
    employeeArray.forEach((obj) => {
        db.run(`INSERT INTO employees VALUES (${obj.id}, '${obj.firstName}', '${obj.lastName}')`, [], errorHandler);
    });
    db.run("INSERT INTO employees VALUES (2, 'Jim', 'Halpert')", [], 
        function (err) {
            if (err) {errorHandler};
            nextStep();
        }
    );
};

createEmployeesTable()


// // get only gets one thing at a time!
// db.get('SELECT * FROM employees', (err, {id, first, last, department, salary}) => {
//     console.log('from dbget');
//     console.log(`${id} ${$first} ${last} ${department} ${salary}`)
// });

// // db all gives us back an array of all the results
function query () {
    db.all("SELECT * FROM employees", (err, allRows) => {
        errorHandler(err);
        console.log(allRows);
        // allRows is an array containing each row from the query
        allRows.forEach(each => {
            console.log(each.id, each.first + ' ' + each.last);
          });
    });
}

//     // sort alphabetically first name
//     allRows.sort( (a,b) => a.first.localeCompare(b.first));
// });

// errorHandler is a function which accepts an error object
const errorHandler = (err) => {
    if (err) { // If there is an error obj, it will be console logged
      console.log(`Msg: ${err}`);
    };
  };



  db.close(err => {
    errorHandler(err); // Use custom error handling function
    console.log('Database closed'); // Will only log on successful close
  });