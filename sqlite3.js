'use strict;'

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('employees.sqlite', (err) => console.log('Connecting to Employee data'));
const { employees } = require('./employees.json');

const createEmployeesTable = () => {
    db.run('CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT NOT NULL, last TEXT NOT NULL, jobTitle TEXT, address TEXT)', [], 
    function (err) {
        if (err) {errorHandler}; 
        addEmployees();
        }
    );
};

function addEmployees (nextStep) {
    employees.forEach((obj) => {
        db.run(`INSERT INTO employees (id, first, last, jobTitle, address) VALUES (${obj.id}, '${obj.firstName}', '${obj.lastName}', '${obj.jobTitle}', '${obj.address}')`, [], function (err) {
            if (err) {errorHandler};
            //nextStep();
        });
    });
    console.log("inserted, hopefully right");
};


db.run('DROP TABLE IF EXISTS employees')
createEmployeesTable();


const errorHandler = (err) => {
    if (err) { // If there is an error obj, it will be console logged
      console.log(`Msg: ${err}`);
    };
  };



  db.close(err => {
    errorHandler(err); // Use custom error handling function
    console.log('Database closed'); // Will only log on successful close
  });