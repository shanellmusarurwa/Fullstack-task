import { getTodos, addTodo, updateTodo, deleteTodo } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const todos = await getTodos();
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { title, description } = await request.json();
    
    if (!title || title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const newTodo = await addTodo({
      title: title.trim(),
      description: description ? description.trim() : ''
    });
    
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, title, description, completed } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Todo ID is required' },
        { status: 400 }
      );
    }

    const updatedTodo = await updateTodo(id, {
      title: title && title.trim(),
      description: description && description.trim(),
      completed
    });
    
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message === 'Todo not found' ? 404 : 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Todo ID is required' },
        { status: 400 }
      );
    }

    await deleteTodo(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message === 'Todo not found' ? 404 : 500 }
    );
  }
}