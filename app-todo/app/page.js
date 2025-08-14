import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto text-center min-h-[calc(100dvh-200px)] flex flex-col justify-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Todo App</h1>
      <p className="text-lg mb-8 text-gray-600">
        A full-stack todo application built with Next.js, featuring CRUD operations,
        API routes, and responsive design.
      </p>
      <Link
        href="/todos"
        className="inline-block bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition-colors"
      >
        Go to Todo List
      </Link>
    </div>
  );
}