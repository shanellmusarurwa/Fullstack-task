// Simple in-memory storage for todos
let todos = [];
let nextId = 1;

// Get all todos
export async function getTodos() {
  return todos;
}

// Save todos (maintains compatibility)
export async function saveTodos(newTodos) {
  todos = newTodos;
  return Promise.resolve();
}

// Add a new todo
export async function addTodo(todo) {
  const newTodo = {
    id: nextId.toString(),
    title: todo.title,
    description: todo.description || '',
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  nextId++;
  return newTodo;
}

// Update a todo
export async function updateTodo(id, updates) {
  const index = todos.findIndex(todo => todo.id === id);
  
  if (index === -1) {
    throw new Error('Todo not found');
  }
  
  todos[index] = {
    ...todos[index],
    ...updates
  };
  
  return todos[index];
}

// Delete a todo
export async function deleteTodo(id) {
  const initialLength = todos.length;
  todos = todos.filter(todo => todo.id !== id);
  
  if (todos.length === initialLength) {
    throw new Error('Todo not found');
  }
  
  return { success: true };
}

// Initialize with sample data
export async function initSampleData() {
  if (todos.length === 0) {
    todos = [
      {
        id: '1',
        title: 'Welcome to your Todo App!',
        description: 'This is a sample todo to get you started',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Create your first todo',
        description: 'Click the "Add Todo" button to create a new task',
        completed: false,
        createdAt: new Date().toISOString()
      }
    ];
    nextId = 3;
  }
}

// Initialize sample data
initSampleData();