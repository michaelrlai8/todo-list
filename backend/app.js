require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

const cors = require('cors');
const db = require('./db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET task list, inital request
app.get('/', async (req, res) => {
  const response = await db.query('SELECT * FROM tasks');
  for (const [index, task] of response.rows.entries()) {
    const updateTask = await db.query(
      'UPDATE tasks SET task_order = $1 WHERE task_id = $2',
      [index, task.task_id]
    );
  }
  const updateResponse = await db.query('SELECT * FROM tasks');
  res.json(updateResponse.rows);
});

// POST request to add new task and get new task list
app.post('/', async (req, res) => {
  const insertResponse = await db.query(
    'INSERT INTO tasks (task_description, task_completed) VALUES ($1, false)',
    [req.body.input]
  );
  const response = await db.query('SELECT * FROM tasks');
  for (const [index, task] of response.rows.entries()) {
    const updateTask = await db.query(
      'UPDATE tasks SET task_order = $1 WHERE task_id = $2',
      [index, task.task_id]
    );
  }

  const updateResponse = await db.query('SELECT * FROM tasks');
  res.json(updateResponse.rows);
});

// DELETE request to delete a task and get new task list
app.delete('/', async (req, res) => {
  const response = await db.query('DELETE FROM tasks WHERE task_id = $1', [
    req.body.task.task_id,
  ]);
  const deleteResponse = await db.query('SELECT * FROM tasks');
  res.json(deleteResponse.rows);
});

// PATCH to update all tasks
app.patch('/', async (req, res) => {
  for (const [index, task] of req.body.entries()) {
    const updateTask = await db.query(
      'UPDATE tasks SET task_order = $1 WHERE task_id = $2',
      [index, task.task_id]
    );
  }
  const response = await db.query('SELECT * FROM tasks');
  res.json(response.rows);
});

app.patch('/complete', async (req, res) => {
  for (const [index, task] of req.body.entries()) {
    const updateTask = await db.query(
      'UPDATE tasks SET task_completed = $1 WHERE task_id = $2',
      [task.task_completed, task.task_id]
    );
  }
  const response = await db.query('SELECT * FROM tasks');
  res.json(response.rows);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
