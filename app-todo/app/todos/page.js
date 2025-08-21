'use client';

import { useEffect, useState } from 'react';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  // Auto-dismiss success messages after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.status}`);
      }
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to load todos. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (newTodo) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to add todo: ${response.status}`);
      }
      
      const data = await response.json();
      setTodos([...todos, data]);
      setError(null);
      setSuccessMessage('Todo added successfully! 🎉');
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Failed to add todo. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this todo?')) {
      return;
    }

    try {
      const response = await fetch('/api/todos', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete todo: ${response.status}`);
      }
      
      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
      setSuccessMessage('Todo deleted successfully! 🗑️');
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete todo. Please try again.');
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchTodos();
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="space-y-4">
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl min-h-[calc(100dvh-200px)]">
      {/* Success Notification */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
            <div className="flex-1">
              <p className="font-medium">Success!</p>
              <p className="text-sm">{successMessage}</p>
            </div>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-green-500 dark:text-green-300 hover:text-green-700 dark:hover:text-green-100"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {error && (
        <div className="container mx-auto p-4 max-w-2xl text-center mb-4">
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
          <button
            onClick={handleRetry}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Todo List</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
        <TodoForm onSubmit={handleAddTodo} />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
        {todos.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-2">No todos yet!</p>
            <p>Add your first todo using the form above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {todos.map(todo => (
              <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}