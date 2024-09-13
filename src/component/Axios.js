import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function Axios() {

    const [task, setTask] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [newTaskTitle, setNewTaskTitle] = useState('');

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then((response) => {
                setTask(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleDelete = (id) => {
        setTask(task.filter(task => task.id !== id));
    };

    const handleEdit = (task) => {
        setEditTaskId(task.id);
        setEditTitle(task.title);
    };

    const handleSave = () => {
        setTask(task.map(task =>
            task.id === editTaskId ? { ...task, title: editTitle } : task
        ));
        setEditTaskId(null);
        setEditTitle('');
    };

    const handleAdd = () => {
        const newTask = {
            id: task.length + 1, 
            title: newTaskTitle,
            completed: false
        };
        setTask([...task, newTask]);
        setNewTaskTitle('');
    };

    return (
        <div className="App">
            <div>
                <h2>Add a New Task</h2>
                <input 
                    type="text" 
                    value={newTaskTitle} 
                    onChange={(e) => setNewTaskTitle(e.target.value)} 
                    placeholder="Enter task title" 
                />
                <button onClick={handleAdd}>Add Task</button>
            </div>

            <table border={2}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>status</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {task.map(task => (
                        <tr key={task.id} className={task.completed ? 'done-row' : 'incomplete-row'}>
                            <td>{task.id}</td>
                            <td> {editTaskId === task.id ? (
                                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                            ) : (
                                task.title
                            )}
                            </td>
                            {/* <td>{task.completed ?  'Done' : 'Incomplete' }</td> */}
                            <td className={task.completed ? 'done' : 'incomplete'}>
                                {task.completed ? 'Done' : 'Incomplete'}
                            </td>
                            <td>
                                {editTaskId === task.id ? (
                                    <>
                                        <button onClick={handleSave}>
                                            <svg width="16" height="16" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16">
                                                <path d="M7.5 0a.5.5 0 0 1 .5.5V1h2V.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V1h1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-12a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 .5-.5h1V.5a.5.5 0 0 1 .5-.5h4zM8 1v1H7V1h1zM1 2v13h14V2H1z" />
                                                <path d="M5 5h6v2H5V5zM5 8h6v2H5V8zM5 11h6v2H5v-2z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => setEditTaskId(null)}>
                                            <svg width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                <path d="M8 7.293L4.707 4l-.707.707L7.293 8l-3.293 3.293.707.707L8 8.707l3.293 3.293.707-.707L8.707 8l3.293-3.293-.707-.707L8 7.293z" />
                                            </svg>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(task)}>
                                            <svg width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                                <path d="M0 13.5V16h2.5l8.5-8.5-2.5-2.5L0 13.5zm15.9-9.1a1.5 1.5 0 0 0-2.1 0L12.5 5.4l2.5 2.5 1.3-1.3a1.5 1.5 0 0 0 0-2.1l-1.3-1.3z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleDelete(task.id)}>
                                            <svg width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M6.5 0a.5.5 0 0 1 .5.5V1h2V.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V1h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H14v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3h-.5a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 .5-.5h1V.5a.5.5 0 0 1 .5-.5h1zM3.5 1V.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V1h2V.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V1h1v1H14v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2H1V1h.5zM4 3v10h8V3H4z" />
                                            </svg>
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Axios;