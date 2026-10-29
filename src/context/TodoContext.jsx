import { createContext, useContext, useEffect, useState } from 'react';

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem('todolist_groups');
    return saved ? JSON.parse(saved) : [
      { id: 'g1', name: 'School Activities' },
      { id: 'g2', name: 'Personal Tasks' },
      { id: 'g3', name: 'Projects' }
    ];
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('todolist_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todolist_groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('todolist_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addGroup = (name) => {
    const newGroup = { id: Date.now().toString(), name };
    setGroups([...groups, newGroup]);
  };

  const deleteGroup = (id) => {
    setGroups(groups.filter(g => g.id !== id));
    setTasks(tasks.filter(t => t.groupId !== id));
  };

  const addTask = (groupId, title) => {
    const newTask = { id: Date.now().toString(), groupId, title, done: false };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // BAGONG DAGDAG: Edit Task function
  const editTask = (id, newTitle) => {
    if (!newTitle.trim()) return;
    setTasks(tasks.map(t => t.id === id ? { ...t, title: newTitle.trim() } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // BAGONG DAGDAG: Clear Completed function
  const clearCompleted = (groupId) => {
    setTasks(tasks.filter(t => !(t.groupId === groupId && t.done)));
  };

  return (
    <TodoContext.Provider value={{ groups, tasks, addGroup, deleteGroup, addTask, toggleTask, editTask, deleteTask, clearCompleted }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  return useContext(TodoContext);
}