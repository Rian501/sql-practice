'use strict;'

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('employees.sqlite', (err) => console.log('Connecting to Employee data'));
const { employees } = require('./employees.json');

const createEmployeesTable = () => {
    db.run('CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT NOT NULL, last TEXT NOT NULL, jobTitle TEXT, address TEXT)', [], 
    function (err) {
        if (err) {errorHandler};
        // WHATEVER YOU WANT TO DO NEXT YOU MUST PASS IN HERE (BELOW) AS THE CALLBACK 
        addEmployees(getPersonals());
        }
    );
};

function addEmployees (nextStep) {
    employees.forEach((obj) => {
        db.run(`INSERT INTO employees (id, first, last, jobTitle, address) VALUES (${obj.id}, '${obj.firstName}', '${obj.lastName}', '${obj.jobTitle}', '${obj.address}')`, [], function (err) {
            if (err) {errorHandler};
        });
    });
    nextStep;
};


db.run('DROP TABLE IF EXISTS employees')
createEmployeesTable();


const errorHandler = (err) => {
    if (err) { // If there is an error obj, it will be console logged
      console.log(`Msg: ${err}`);
    };
  };

  
  
function viewEmployees () {
    setTimeout( function () {db.all("SELECT * FROM employees", (err, allPeeps) => {
        errorHandler(err);
        console.log(allPeeps);
      });
    }, 2000);
}

function getJobTitles () {
    setTimeout( function () {db.each("SELECT jobTitle FROM employees", (err, jdesc) => {
        errorHandler(err);
        console.log(jdesc);
      });
    }, 2000);
}

function getPersonals () {
    setTimeout( function () {db.all("SELECT first AS 'First Name', last AS 'Last Name', address FROM employees", (err, deets) => {
        errorHandler(err);
        console.log(deets);
      });
    }, 2000);
}

function getCertainJobFolks(jobTitle) {
    console.log(jobTitle);
    setTimeout( function () {db.all(`SELECT * FROM employees e WHERE e.jobTitle = "${jobTitle}"`, 
    (err, deets) => {
        errorHandler(err);
        console.log(deets);
      });
    }, 2000);
}


// db.close(err => {
// errorHandler(err); // Use custom error handling function
// console.log('Database closed'); // Will only log on successful close
// });