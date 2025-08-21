'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import TodoForm from '../../components/TodoForm';
import Link from 'next/link';

export default function TodoDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const id = params.id;

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      router.push('/todos');
      return;
    }

    const fetchTodo = async () => {
      try {
        const response = await fetch(`/api/todos`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const todos = await response.json();
        const foundTodo = todos.find(t => t.id === id);
        
        if (foundTodo) {
          setTodo(foundTodo);
        } else {
          router.push('/todos');
        }
      } catch (error) {
        console.error('Error fetching todo:', error);
        setError('Failed to load todo');
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id, router]);

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="p-4 text-center text-red-500 dark:text-red-400">
        Todo not found
      </div>
    );
  }

  const formattedDate = new Date(todo.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleUpdate = async (updatedTodo) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: todo.id,
          ...updatedTodo,
          completed: todo.completed
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setTodo(data);
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Failed to update todo. Please try again.');
    }
  };

  const handleToggleComplete = async () => {
    try {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          completed: !todo.completed
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setTodo(data);
    } catch (error) {
      console.error('Error toggling todo:', error);
      alert('Failed to update todo status. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl min-h-[calc(100dvh-200px)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Todo Details</h1>
        <Link 
          href="/todos" 
          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
        >
          Back to list
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className={`text-xl font-semibold ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
            {todo.title}
          </h2>
          <button
            onClick={handleToggleComplete}
            className={`px-3 py-1 rounded text-sm ${
              todo.completed 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            } transition-colors`}
          >
            {todo.completed ? 'Completed' : 'Mark Complete'}
          </button>
        </div>
        
        {todo.description && (
          <p className="text-gray-700 dark:text-gray-300 mb-4">{todo.description}</p>
        )}
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>Created: {formattedDate}</p>
          <p>Status: {todo.completed ? 'Completed' : 'Pending'}</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
        <TodoForm todo={todo} onSubmit={handleUpdate} />
      </div>
    </div>
  );
}