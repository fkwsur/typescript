import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
const { SALT } = process.env;
import pool from './db';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.listen(8080, () => {
  console.log("server on");
})

app.post('/user', async (req: express.Request, res: express.Response) => {
  try {
    let { id, password } = req.body;
    console.log(req.body)
    const salt = bcrypt.genSaltSync(Number(SALT));
    const hashpassword = bcrypt.hashSync(password, salt);
    const conn = await pool.getConnection(); // pool에서 커넥션을 가져오기
    let sql = 'insert into user (id,password) values(?,?)'; // db에 content를 넣는 쿼리문 작성;
    let data = [id, hashpassword]; // data에 content 담기
    console.log(data);
    const rows = await pool.query(sql, data); //쿼리문 실행 및 rows에 담기
    conn.release(); // 커넥션을 다시 pool로 반환
    if (rows) return res.status(200).json({ result: rows });
    else throw console.log('에러발생');
  } catch (err) {
    console.log(err);
  }
});