const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

let todos = [];

app.get('/', (req, res) => {
  const listItems = todos.map((t, i) => `
    <li>
      <span>${t}</span>
      <form method="POST" action="/delete/${i}" class="delete-form">
        <button class="delete-btn" title="Delete">❌</button>
      </form>
    </li>`).join('');

  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>To-Do App</title>
    <style>
      * { box-sizing: border-box; }
      body {
        font-family: Arial, sans-serif;
        background: #f9fafb;
        display: flex;
        justify-content: center;
        padding: 2rem;
      }
      .container {
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        max-width: 400px;
        width: 100%;
      }
      h1 { text-align: center; color: #333; margin-bottom: 1rem; }
      form.add-form {
        display: flex;
        gap: .5rem;
        margin-bottom: 1rem;
      }
      input[name="task"] {
        flex: 1;
        padding: .5rem;
        border: 1px solid #ccc;
        border-radius: .5rem;
      }
      button {
        padding: .5rem 1rem;
        border: none;
        border-radius: .5rem;
        background: #4f46e5;
        color: white;
        cursor: pointer;
        transition: background .2s;
      }
      button:hover { background: #4338ca; }
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .5rem .75rem;
        border: 1px solid #e5e7eb;
        border-radius: .5rem;
        margin-bottom: .5rem;
        background: #f3f4f6;
      }
      li span { flex: 1; }
      .delete-form { display: inline; }
      .delete-btn {
        background: #ef4444;
        border: none;
        border-radius: .5rem;
        padding: .25rem .5rem;
      }
      .delete-btn:hover { background: #dc2626; }
      .empty {
        text-align: center;
        color: #6b7280;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>✅ To-Do App</h1>
      <form class="add-form" method="POST" action="/add">
        <input name="task" placeholder="New task" required/>
        <button>Add</button>
      </form>
      <ul>
        ${listItems || '<li class="empty">No tasks yet</li>'}
      </ul>
    </div>
  </body>
  </html>`);
});

app.post('/add', (req, res) => {
  todos.push(req.body.task.trim());
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id)) todos.splice(id, 1);
  res.redirect('/');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`✅ To-Do app running on port ${port}`));
