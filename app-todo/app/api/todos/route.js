import { getTodos, saveTodos } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET all todos
export async function GET() {
  const todos = await getTodos();
  return NextResponse.json(todos);
}

// POST a new todo
export async function POST(request) {
  const todos = await getTodos();
  const { title, description } = await request.json();
  
  const newTodo = {
    id: Date.now().toString(),
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  await saveTodos(todos);
  
  return NextResponse.json(newTodo, { status: 201 });
}

// PUT update a todo
export async function PUT(request) {
  const todos = await getTodos();
  const { id, title, description, completed } = await request.json();
  
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  }
  
  todos[index] = { ...todos[index], title, description, completed };
  await saveTodos(todos);
  
  return NextResponse.json(todos[index]);
}

// DELETE a todo
export async function DELETE(request) {
  const todos = await getTodos();
  const { id } = await request.json();
  
  const filteredTodos = todos.filter(todo => todo.id !== id);
  await saveTodos(filteredTodos);
  
  return NextResponse.json({ success: true });
}