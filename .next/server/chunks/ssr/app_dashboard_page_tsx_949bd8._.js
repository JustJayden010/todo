module.exports = {

"[project]/app/dashboard/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// type Todo = {
//     id: number;
//     title: string;
//     completed: boolean;
//     deadline: Date;
// };
// export default function DashboardPage() {
//     const router = useRouter();
//     const [todos, setTodos] = useState<Todo[]>([]);
//     const [newTodo, setNewTodo] = useState('');
//     const [deletingId, setDeletingId] = useState<number | null>(null);
//     const [togglingId, setTogglingId] = useState<number | null>(null);
//     const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
//     const [showModal, setShowModal] = useState(false);
//     const [deadline, setDeadline] = useState('');
//     const [userEmail, setUserEmail] = useState<string>('');
//     const [userName, setUserName] = useState('');
//     const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
//     useEffect(() => {
//         const cahcedEmail = localStorage.getItem('email')
//         const cahcedUserName = localStorage.getItem('name')
//         cahcedEmail && setUserEmail(cahcedEmail)
//         cahcedUserName && setUserName(cahcedUserName)
//         if (!token) {
//             router.push('/login');
//         } else {
//             fetchTodos();
//         }
//     }, []);
//     async function fetchTodos() {
//         const res = await fetch('/api/todo/list', {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok) setTodos(data.todos);
//     }
//     async function toggleTodo(id: number, currentStatus: boolean) {
//         setTogglingId(id);
//         await fetch('/api/todo/toggle', {
//             method: 'POST',
//             body: JSON.stringify({ id, completed: !currentStatus }),
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         setTogglingId(null);
//         fetchTodos();
//     }
//     async function deleteTodo(id: number) {
//         if (!confirm('Are you sure you want to delete this todo?')) return;
//         setDeletingId(id);
//         await fetch('/api/todo/delete', {
//             method: 'DELETE',
//             body: JSON.stringify({ id }),
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         setDeletingId(null);
//         fetchTodos();
//     }
//     async function addTodo(e: React.FormEvent) {
//         e.preventDefault();
//         if (!newTodo.trim()) return;
//         const res = await fetch('/api/todo/create', {
//             method: 'POST',
//             body: JSON.stringify({ title: newTodo, deadline }),
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         if (res.ok) {
//             setNewTodo('');
//             fetchTodos();
//         }
//     }
//     const totalCount = todos.length;
//     const activeCount = todos.filter((todo) => !todo.completed).length;
//     const completedCount = todos.filter((todo) => todo.completed).length;
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200 p-6">
//             <div className="flex justify-between items-center mb-6">
//                 <div className="flex gap-4">
//                     <div className="flex justify-center gap-4 mb-6">
//                         <button
//                             onClick={() => setFilter('all')}
//                             className={`px-4 py-1 rounded-full border ${filter === 'all' ? 'bg-blue-600 text-white' : 'border-blue-300 text-blue-600'
//                                 }`}
//                         >
//                             All ({totalCount})
//                         </button>
//                         <button
//                             onClick={() => setFilter('active')}
//                             className={`px-4 py-1 rounded-full border ${filter === 'active' ? 'bg-green-600 text-white' : 'border-green-300 text-green-600'
//                                 }`}
//                         >
//                             Active ({activeCount})
//                         </button>
//                         <button
//                             onClick={() => setFilter('completed')}
//                             className={`px-4 py-1 rounded-full border ${filter === 'completed' ? 'bg-purple-600 text-white' : 'border-purple-300 text-purple-600'
//                                 }`}
//                         >
//                             Completed ({completedCount})
//                         </button>
//                     </div>
//                 </div>
//                 <button
//                     onClick={() => setShowModal(true)}
//                     className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-1 text-xl py-1 rounded-full w-[50px] h-[50px]"
//                 >
//                     {userName.slice(0, 1) || 'Profile'}
//                 </button>
//             </div>
//             <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">
//                 <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Your Todo List</h1>
//                 <form onSubmit={addTodo} className="flex flex-col sm:flex-row gap-2 mb-4">
//                     <input
//                         value={newTodo}
//                         onChange={(e) => setNewTodo(e.target.value)}
//                         placeholder="New todo..."
//                         className="flex-grow p-2 border rounded"
//                     />
//                     <input
//                         type="date"
//                         value={deadline}
//                         onChange={(e) => setDeadline(e.target.value)}
//                         className="p-2 border rounded"
//                     />
//                     <button className="bg-blue-600 text-white px-4 rounded">Add</button>
//                 </form>
//                 <ul className="space-y-4">
//                     {todos
//                         .filter((todo) => {
//                             if (filter === 'active') return !todo.completed;
//                             if (filter === 'completed') return todo.completed;
//                             return true;
//                         })
//                         .map((todo) => (
//                             <li
//   key={todo.id}
//   className={`
//     flex flex-col sm:flex-row justify-between items-start sm:items-center
//     border p-4 rounded-xl shadow-sm bg-white hover:bg-blue-50
//     transition-all duration-300
//     ${
//       !todo.completed && todo.deadline && new Date(todo.deadline) < new Date()
//         ? 'border-red-400'
//         : !todo.completed &&
//           todo.deadline &&
//           new Date(todo.deadline).toDateString() === new Date().toDateString()
//         ? 'border-orange-400'
//         : 'border-gray-300'
//     }
//     ${
//         !todo.completed && todo.deadline
//           ? new Date(todo.deadline).toDateString() === new Date().toDateString()
//             ? 'bg-orange-500 animate-pulse'
//             : new Date(todo.deadline) < new Date()
//             ? 'text-red-500 bg-red-500'
//             : 'text-gray-500'
//           : 'text-gray-400'
//       }
//   `}
// >
//   <div className="flex items-center gap-3
//   ">
//     {togglingId === todo.id ? (
//       <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
//     ) : (
//       <input
//         type="checkbox"
//         checked={todo.completed}
//         onChange={() => toggleTodo(todo.id, todo.completed)}
//         className="h-5 w-5 text-blue-600"
//       />
//     )}
//     <div>
//       <div
//         className={`
//           text-base font-medium
//           ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}
//         `}
//       >
//         {todo.title}
//       </div>
//       <span
//         className={`
//           text-xs block mt-1 
//           ${
//             !todo.completed && todo.deadline
//               ? new Date(todo.deadline).toDateString() === new Date().toDateString()
//                 ? 'text-white animate-pulse'
//                 : new Date(todo.deadline) < new Date()
//                 ? 'text-red-500 bg-red-500'
//                 : 'text-gray-500'
//               : 'text-gray-400'
//           }
//         `}
//       >
//         {todo.deadline
//           ? `Due: ${new Date(todo.deadline).toLocaleDateString()}`
//           : 'No deadline'}
//       </span>
//     </div>
//   </div>
//   {deletingId === todo.id ? (
//     <div className="h-6 w-6 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
//   ) : (
//     <button
//       onClick={() => deleteTodo(todo.id)}
//       className="text-red-600 font-medium hover:underline text-sm mt-2 sm:mt-0"
//     >
//       Delete
//     </button>
//   )}
// </li>
//                         ))}
//                 </ul>
//             </div>
//             {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
//                     <div className="bg-white p-6 rounded-xl shadow-lg w-80 relative">
//                         <button
//                             onClick={() => setShowModal(false)}
//                             className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
//                         >
//                             ×
//                         </button>
//                         <div className="text-center">
//                             <div className="text-2xl font-bold mb-2 text-blue-600">{userName}</div>
//                             <div className="text-sm text-gray-500 mb-4">{userEmail}</div>
//                             <button
//                                 onClick={() => {
//                                     localStorage.removeItem('token');
//                                     localStorage.removeItem('email');
//                                     router.push('/login');
//                                 }}
//                                 className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg mb-2"
//                             >
//                                 Logout
//                             </button>
//                             <button className="text-blue-500 hover:underline text-sm">Forgot Password?</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
__turbopack_esm__({
    "default": (()=>DashboardPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-ssr] (ecmascript)");
// import { PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function SortableTodoItem({ todo, togglingId, deletingId, toggleTodo, deleteTodo }) {
    const { attributes, listeners, setNodeRef, transform, transition } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSortable"])({
        id: todo.id
    });
    const style = {
        transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform),
        transition
    };
    const isOverdue = !todo.completed && todo.deadline && new Date(todo.deadline) < new Date();
    const isDueToday = !todo.completed && todo.deadline && new Date(todo.deadline).toDateString() === new Date().toDateString();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        ref: setNodeRef,
        style: style,
        ...attributes,
        ...listeners,
        className: `
        flex flex-col sm:flex-row justify-between items-start sm:items-center
        border p-4 rounded-xl shadow-sm bg-white hover:bg-blue-50
        transition-all duration-300
        ${isOverdue ? 'border-red-400 bg-red-500 text-white' : isDueToday ? 'border-orange-400 bg-orange-500 text-white animate-pulse' : 'border-gray-300'}
      `,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    togglingId === todo.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 367,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "checkbox",
                        checked: todo.completed,
                        onChange: ()=>toggleTodo(todo.id, todo.completed),
                        className: "h-5 w-5 text-blue-600"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 369,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `text-base font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`,
                                children: todo.title
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 377,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs block mt-1",
                                children: todo.deadline ? `Due: ${new Date(todo.deadline).toLocaleDateString()}` : 'No deadline'
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 384,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 365,
                columnNumber: 7
            }, this),
            deletingId === todo.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-6 w-6 rounded-full border-2 border-red-500 border-t-transparent animate-spin"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 393,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>deleteTodo(todo.id),
                className: "text-red-600 font-medium hover:underline text-sm mt-2 sm:mt-0",
                children: "Delete"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 395,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 353,
        columnNumber: 5
    }, this);
}
function DashboardPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [todos, setTodos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newTodo, setNewTodo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [deletingId, setDeletingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [togglingId, setTogglingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deadline, setDeadline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [userEmail, setUserEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [userName, setUserName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const token = ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const cahcedEmail = localStorage.getItem('email');
        const cahcedUserName = localStorage.getItem('name');
        cahcedEmail && setUserEmail(cahcedEmail);
        cahcedUserName && setUserName(cahcedUserName);
        if ("TURBOPACK compile-time truthy", 1) {
            router.push('/login');
        } else {
            "TURBOPACK unreachable";
        }
    }, []);
    async function fetchTodos() {
        const res = await fetch('/api/todo/list', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json();
        if (res.ok) setTodos(data.todos);
    }
    async function toggleTodo(id, currentStatus) {
        setTogglingId(id);
        await fetch('/api/todo/toggle', {
            method: 'POST',
            body: JSON.stringify({
                id,
                completed: !currentStatus
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        setTogglingId(null);
        fetchTodos();
    }
    async function deleteTodo(id) {
        if (!confirm('Are you sure you want to delete this todo?')) return;
        setDeletingId(id);
        await fetch('/api/todo/delete', {
            method: 'DELETE',
            body: JSON.stringify({
                id
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        setDeletingId(null);
        fetchTodos();
    }
    async function addTodo(e) {
        e.preventDefault();
        if (!newTodo.trim()) return;
        const res = await fetch('/api/todo/create', {
            method: 'POST',
            body: JSON.stringify({
                title: newTodo,
                deadline
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        if (res.ok) {
            setNewTodo('');
            fetchTodos();
        }
    }
    const totalCount = todos.length;
    const activeCount = todos.filter((todo)=>!todo.completed).length;
    const completedCount = todos.filter((todo)=>todo.completed).length;
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointerSensor"]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TouchSensor"], {
        activationConstraint: {
            delay: 250,
            tolerance: 5
        }
    }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center gap-4 mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setFilter('all'),
                                    className: `px-4 py-1 rounded-full border ${filter === 'all' ? 'bg-blue-600 text-white' : 'border-blue-300 text-blue-600'}`,
                                    children: [
                                        "All (",
                                        totalCount,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 512,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setFilter('active'),
                                    className: `px-4 py-1 rounded-full border ${filter === 'active' ? 'bg-green-600 text-white' : 'border-green-300 text-green-600'}`,
                                    children: [
                                        "Active (",
                                        activeCount,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 522,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setFilter('completed'),
                                    className: `px-4 py-1 rounded-full border ${filter === 'completed' ? 'bg-purple-600 text-white' : 'border-purple-300 text-purple-600'}`,
                                    children: [
                                        "Completed (",
                                        completedCount,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 532,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 511,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 510,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowModal(true),
                        className: "bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-1 text-xl py-1 rounded-full w-[50px] h-[50px]",
                        children: userName.slice(0, 1) || 'P'
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 544,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 509,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold mb-6 text-center text-blue-700",
                        children: "Your Todo List"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 553,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: addTodo,
                        className: "flex flex-col sm:flex-row gap-2 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: newTodo,
                                onChange: (e)=>setNewTodo(e.target.value),
                                placeholder: "New todo...",
                                className: "flex-grow p-2 border rounded"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 558,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "date",
                                value: deadline,
                                onChange: (e)=>setDeadline(e.target.value),
                                className: "p-2 border rounded"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 564,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-blue-600 text-white px-4 rounded",
                                children: "Add"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 570,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 557,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DndContext"], {
                        sensors: sensors,
                        collisionDetection: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["closestCenter"],
                        onDragEnd: ({ active, over })=>{
                            if (active.id !== over?.id) {
                                const oldIndex = todos.findIndex((t)=>t.id === active.id);
                                const newIndex = todos.findIndex((t)=>t.id === over?.id);
                                const reordered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["arrayMove"])(todos, oldIndex, newIndex);
                                setTodos(reordered);
                            }
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SortableContext"], {
                            items: todos.map((t)=>t.id),
                            strategy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalListSortingStrategy"],
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-4",
                                children: todos.filter((todo)=>{
                                    if (filter === 'active') return !todo.completed;
                                    if (filter === 'completed') return todo.completed;
                                    return true;
                                }).map((todo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTodoItem, {
                                        todo: todo,
                                        togglingId: togglingId,
                                        deletingId: deletingId,
                                        toggleTodo: toggleTodo,
                                        deleteTodo: deleteTodo
                                    }, todo.id, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 594,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 586,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 585,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 573,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 552,
                columnNumber: 7
            }, this),
            showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-6 rounded-xl shadow-lg w-80 relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowModal(false),
                            className: "absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 611,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-2xl font-bold mb-2 text-blue-600",
                                    children: userName
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 618,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-gray-500 mb-4",
                                    children: userEmail
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 619,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        localStorage.removeItem('token');
                                        localStorage.removeItem('email');
                                        router.push('/login');
                                    },
                                    className: "w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg mb-2",
                                    children: "Logout"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 620,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "text-blue-500 hover:underline text-sm",
                                    children: "Forgot Password?"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 630,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 617,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/page.tsx",
                    lineNumber: 610,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 609,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 508,
        columnNumber: 5
    }, this);
}
}}),
"[project]/app/dashboard/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=app_dashboard_page_tsx_949bd8._.js.map