'use client';

import Link from 'next/link';

export default function TodoItem({ todo, onDelete }) {

    // Format date consistently
  const formattedDate = new Date(todo.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <div className="border border-gray-700 rounded-lg p-4 mb-4 hover:shadow-md transition-shadow bg-gray-800">
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className="text-gray-600 mt-1">{todo.description}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Created: {new Date(todo.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex space-x-2">
          <Link
            href={`/todos/${todo.id}`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            View
          </Link>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}