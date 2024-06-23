import express from 'express'
import { getTasks, getTask, createTask, deleteTask} from './database.js'

const app = express()
app.use(express.json())

app.get("/tasks", async (req, res) => {
    const tasks = await getTasks()
    res.send(tasks)
  })

app.get("/tasks/:id", async (req, res) => {
    const id = req.params.id
    const note = await getTask(id)
    res.send(note)
  })

app.post("/tasks", async (req, res) => {
  const { title, contents } = req.body
  const task = await createTask(title, contents)
  res.status(201).send(task)
})

app.delete("/tasks/:id", async (req , res) => {
  const id = req.params.id
  deleteTask(id)
  res.send("Task Removed Successfully!")
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke 💩')
  })


app.listen(3060, () => {
    console.log('Server is running on port 3060')
  })