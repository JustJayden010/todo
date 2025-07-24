'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Todo = {
    id: number;
    title: string;
    completed: boolean;
    deadline: Date;
};

export default function DashboardPage() {
    const router = useRouter();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [togglingId, setTogglingId] = useState<number | null>(null);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [showModal, setShowModal] = useState(false);
    const [deadline, setDeadline] = useState('');

    const [userEmail, setUserEmail] = useState<string>('');
    const [userName, setUserName] = useState('');

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setDeadline(formattedDate)
        const cahcedEmail = localStorage.getItem('email')
        const cahcedUserName = localStorage.getItem('name')
        cahcedEmail && setUserEmail(cahcedEmail)
        cahcedUserName && setUserName(cahcedUserName)
        if (!token) {
            router.push('/login');
        } else {
            fetchTodos();
        }
    }, []);

    async function fetchTodos() {
        const res = await fetch('/api/todo/list', {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setTodos(data.todos);
    }

    async function toggleTodo(id: number, currentStatus: boolean) {
        setTogglingId(id);
        await fetch('/api/todo/toggle', {
            method: 'POST',
            body: JSON.stringify({ id, completed: !currentStatus }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        setTogglingId(null);
        fetchTodos();
    }

    async function deleteTodo(id: number) {
        if (!confirm('Are you sure you want to delete this todo?')) return;
        setDeletingId(id);
        await fetch('/api/todo/delete', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        setDeletingId(null);
        fetchTodos();
    }

    async function addTodo(e: React.FormEvent) {
        e.preventDefault();
        if (!newTodo.trim()) return;

        const res = await fetch('/api/todo/create', {
            method: 'POST',
            body: JSON.stringify({ title: newTodo, deadline }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });


        if (res.ok) {
            setNewTodo('');
            fetchTodos();
        }
    }
    const totalCount = todos.length;
    const activeCount = todos.filter((todo) => !todo.completed).length;
    const completedCount = todos.filter((todo) => todo.completed).length;

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white shadow-md rounded-xl p-4">
                <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-1 rounded-full text-sm font-medium border transition ${filter === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'border-blue-300 text-blue-600 hover:bg-blue-100'
                            }`}
                    >
                        All ({totalCount})
                    </button>
                    <button
                        onClick={() => setFilter('active')}
                        className={`px-4 py-1 rounded-full text-sm font-medium border transition ${filter === 'active'
                                ? 'bg-green-600 text-white'
                                : 'border-green-300 text-green-600 hover:bg-green-100'
                            }`}
                    >
                        Active ({activeCount})
                    </button>
                    <button
                        onClick={() => setFilter('completed')}
                        className={`px-4 py-1 rounded-full text-sm font-medium border transition ${filter === 'completed'
                                ? 'bg-purple-600 text-white'
                                : 'border-purple-300 text-purple-600 hover:bg-purple-100'
                            }`}
                    >
                        Completed ({completedCount})
                    </button>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 sm:mt-0 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center shadow-md transition"
                    title="Profile"
                >
                    {userName?.slice(0, 1) || (<div className="h-6 w-6 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />)}
                </button>
            </div>

            <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Your Todo List</h1>

                <form onSubmit={addTodo} className="flex flex-col sm:flex-row gap-2 mb-4">
                    <input
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="New todo..."
                        className="flex-grow p-2 border rounded"
                    />
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="p-2 border rounded text-black"
                    />
                    <button className="bg-blue-600 text-white px-4 rounded">Add</button>
                </form>


                <ul className="space-y-4">
                    {todos
                        .filter((todo) => {
                            if (filter === 'active') return !todo.completed;
                            if (filter === 'completed') return todo.completed;
                            return true;
                        })
                        .map((todo) => (
                            <li
                                key={todo.id}
                                className={`
    flex flex-col sm:flex-row justify-between items-start sm:items-center
    border p-4 rounded-xl shadow-sm bg-white hover:bg-blue-50
    transition-all duration-300
    ${!todo.completed && todo.deadline && new Date(todo.deadline) < new Date()
                                        ? 'border-red-400'
                                        : !todo.completed &&
                                            todo.deadline &&
                                            new Date(todo.deadline).toDateString() === new Date().toDateString()
                                            ? 'border-orange-400'
                                            : 'border-gray-300'
                                    }
    ${!todo.completed && todo.deadline
                                        ? new Date(todo.deadline).toDateString() === new Date().toDateString()
                                            ? 'bg-orange-500 animate-pulse'
                                            : new Date(todo.deadline) < new Date()
                                                ? 'text-red-500 bg-red-500'
                                                : 'text-gray-500'
                                        : 'text-gray-400'
                                    }
  `}
                            >
                                <div className="flex items-center gap-3
  
  ">
                                    {togglingId === todo.id ? (
                                        <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                                    ) : (
                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={() => toggleTodo(todo.id, todo.completed)}
                                            className="h-5 w-5 text-blue-600"
                                        />
                                    )}
                                    <div>
                                        <div
                                            className={`
          text-base font-medium
          ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}
          
        `}
                                        >
                                            {todo.title}
                                        </div>
                                        <span
                                            className={`
          text-xs block mt-1 
          ${!todo.completed && todo.deadline
                                                    ? new Date(todo.deadline).toDateString() === new Date().toDateString()
                                                        ? 'text-white animate-pulse'
                                                        : new Date(todo.deadline) < new Date()
                                                            ? 'text-red-500 bg-red-500'
                                                            : 'text-gray-500'
                                                    : 'text-gray-400'
                                                }
        `}
                                        >
                                            {todo.deadline
                                                ? `Due: ${new Date(todo.deadline).toLocaleDateString()}`
                                                : 'No deadline'}
                                        </span>
                                    </div>
                                </div>

                                {deletingId === todo.id ? (
                                    <div className="h-6 w-6 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
                                ) : (
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="text-red-600 font-medium hover:underline text-sm mt-2 sm:mt-0"
                                    >
                                        Delete
                                    </button>
                                )}
                            </li>

                        ))}
                </ul>
            </div>






            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-80 relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
                        >
                            ×
                        </button>
                        <div className="text-center">
                            <div className="text-2xl font-bold mb-2 text-blue-600">{userName}</div>
                            <div className="text-sm text-gray-500 mb-4">{userEmail}</div>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('email');
                                    router.push('/login');
                                }}
                                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg mb-2"
                            >
                                Logout
                            </button>
                            <button className="text-blue-500 hover:underline text-sm">
                                <a href="/forgot-password">
                                    Forgot Password?
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}





