const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

let todos = [];

app.get('/', (req, res) => {
  const listItems = todos.map((t, i) => `<li>${t} 
    <form method="POST" action="/delete/${i}" style="display:inline;">
      <button>❌</button>
    </form>
  </li>`).join('');
  res.send(`
    <h1>To-Do App</h1>
    <form method="POST" action="/add">
      <input name="task" placeholder="New task" required/>
      <button>Add</button>
    </form>
    <ul>${listItems || '<li>No tasks yet</li>'}</ul>
  `);
});

app.post('/add', (req, res) => {
  todos.push(req.body.task);
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id)) todos.splice(id, 1);
  res.redirect('/');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`✅ To-Do app running on port ${port}`));
