import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load tasks from local storage or use an empty array

  // state variable for storing tasks
  const [tasks, setTasks] = useState([]);

  // Function to delete a task by ID
  const deleteTask = (id) => {
    // Filter out the task with the specified ID
    const updatedTasks = tasks.filter((task) => task.id !== id);
    // Update the state with the new tasks
    setTasks(updatedTasks);
  };

  // Function to update a task
  const updateTask = (updatedTask) => {
    // Find the index of the task to be updated
    const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);

    // If the task is found, update it in the array
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    setTasks(updatedTasks);
  };


  return (
    <AppContext.Provider
      value={{
        deleteTask,
        tasks,
        setTasks,
        updateTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
