const { Pool } = require('pg');

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`];
const queryString =`SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teacher;`;

const pool = new Pool({
  user: 'vagrant',
  password: 'apple',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
});
