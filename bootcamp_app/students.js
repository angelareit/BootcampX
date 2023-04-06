const { Pool } = require('pg');

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`, limit];
const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;
  
const pool = new Pool({
  user: 'vagrant',
  password: 'apple',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(queryString, values)
.then(res => {
  console.log(res.rows);
})
.catch(err => console.error('query error', err.stack));
