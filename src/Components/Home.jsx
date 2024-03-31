import { useState } from 'react';

function Home() {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [filter, setFilter] = useState('all');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create a new task object
        const newTask = {
            id: tasks.length + 1,
            title: taskTitle,
            description: taskDescription,
            completed: false,
        };
        // Update tasks state with new task
        setTasks([...tasks, newTask]);
        // Reset input fields
        setTaskTitle('');
        setTaskDescription('');
    };

    // Function to toggle task completion
    const toggleTaskCompletion = (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        // Update tasks 
        setTasks(updatedTasks);
    };

    // Function to filter tasks based on completion status
    const filteredTasks = tasks.filter(task => {
        if (filter === 'done') {
            return task.completed;
        } else if (filter === 'todo') {
            return !task.completed;
        } else {
            return true; // Show all tasks
        }
    });

    return (
        <div className="h-screen grid grid-cols-1 lg:grid-cols-3">
            {/* Form for adding tasks */}
            <div className="col-span-1 lg:col-span-1 bg-blue-100 p-4">
                <div className="p-8 flex justify-center items-center w-full">
                    <form className="w-full space-y-6 pt-8" onSubmit={handleSubmit}>
                        <h2 className="text-3xl font-bold mt-8 text-blue-900">Add Task</h2>
                        {/* Task Title Input */}
                        <div>
                            <label htmlFor="task" className="block text-sm font-medium leading-6 text-blue-900">
                                Task Title
                            </label>
                            <div className="mt-2">
                                <input
                                    id="task"
                                    placeholder="Enter task title"
                                    name="task"
                                    required
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                    className="block w-full rounded-md border-0 py-2.5 pl-3 text-[#002964] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        {/* Task Description Input */}
                        <div>
                            <label htmlFor="Description" className="block text-sm font-medium leading-6 text-blue-900">
                                Task Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="Description"
                                    name="Description"
                                    required
                                    placeholder="Enter task description"
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                    className="block w-full rounded-md border-0 py-2.5 pl-3 min-h-36 text-[#002964] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="mt-8 w-full flex justify-center bg-blue-900 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Task list */}
            <div className="col-span-1 lg:col-span-2 p-4">
                <div className="pt-16">
                    <h1 className="text-3xl font-bold mt-8 text-blue-900">To Do Tasks</h1>
                    {/* Filter Buttons */}
                    <div className="flex gap-3 mt-4 pt-5">
                        <button onClick={() => setFilter('all')} className="btn btn-outline w-[120px]">All</button>
                        <button onClick={() => setFilter('done')} className="btn btn-outline w-[120px]">Done</button>
                        <button onClick={() => setFilter('todo')} className="btn btn-outline w-[120px]">To Do</button>
                    </div>
                    {/* Display tasks */}
                    <div className='mt-8'>
                        {filteredTasks.map(task => (
                            <div key={task.id} className={`border rounded w-[680px] min-h-[56px] mt-2 p-3 ${task.completed ? 'opacity-50 line-through' : ''}`}>
                                <label className="flex items-center cursor-pointer">
                                    <input type="checkbox" className="form-checkbox mr-2 ml-3 text-blue-900" onChange={() => toggleTaskCompletion(task.id)} checked={task.completed} />
                                    <p className="text-blue-900 ml-3">{task.description}</p>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
