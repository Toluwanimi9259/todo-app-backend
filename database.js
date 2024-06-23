import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_ROOT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  }).promise()

export async function getTasks(){
    const [rows] = await pool.query("select * from todos")
    return rows
}

// const todos = await getTasks()
// console.log(todos)

export async function getTask(id) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM todos
  WHERE id = ?
  `, [id])
  return rows[0]
}

// const task = await getTask(2)
// console.log(task)

export async function createTask(title , content) {
  const [result] = await pool.query(`
  INSERT INTO todos(title , contents)
  VALUES(? , ?)
  `, [title , content])
  const id = result.insertId
  return getTask(id)
}

export async function deleteTask(id) {
  const [rows] = await pool.query(`
  DELETE
  FROM todos
  WHERE id = ?
  `, [id])
  return rows[0]
}

// deleteTask(8)

// await createTask("My Third Note" , "A note about another thing")
