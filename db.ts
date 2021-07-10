import mysql from 'mysql2/promise';  //promise를 쓰는 이유는 에러발생 시, 에러를 잡기 위해
import 'dotenv/config'
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "1111",
  database: "tododb"
});

export default pool;

