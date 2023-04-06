const { Pool } = require('pg');

let month=process.argv[2];
let limit=process.argv[3];

console.log (month,limit);

const pool = new Pool({
  user: 'vagrant',
  password: 'apple',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
LIMIT ${process.argv[3] || 5};
`)
.then(res => {
  console.log(res.rows);
})
.catch(err => console.error('query error', err.stack));
