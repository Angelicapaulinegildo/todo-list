import { create } from 'zustand';

const useTodoStore = create((set) => ({
  groups: JSON.parse(localStorage.getItem('todolist_groups')) || [
    { id: 'g1', name: 'School Activities' },
    { id: 'g2', name: 'Personal Tasks' },
    { id: 'g3', name: 'Projects' }
  ],
  tasks: JSON.parse(localStorage.getItem('todolist_tasks')) || [],

// functions for managing the groups and tasks
  addGroup: (name) => set((state) => {
    const newGroups = [...state.groups, { id: Date.now().toString(), name }];
    localStorage.setItem('todolist_groups', JSON.stringify(newGroups));
    return { groups: newGroups };
  }),
  deleteGroup: (id) => set((state) => {
    const newGroups = state.groups.filter(g => g.id !== id);
    const newTasks = state.tasks.filter(t => t.groupId !== id);
    localStorage.setItem('todolist_groups', JSON.stringify(newGroups));
    localStorage.setItem('todolist_tasks', JSON.stringify(newTasks));
    return { groups: newGroups, tasks: newTasks };
  }),
  addTask: (groupId, title) => set((state) => {
    const newTasks = [{ id: Date.now().toString(), groupId, title, done: false }, ...state.tasks];
    localStorage.setItem('todolist_tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  }),
  toggleTask: (id) => set((state) => {
    const newTasks = state.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    localStorage.setItem('todolist_tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  }),
  editTask: (id, newTitle) => set((state) => {
    if (!newTitle.trim()) return state;
    const newTasks = state.tasks.map(t => t.id === id ? { ...t, title: newTitle.trim() } : t);
    localStorage.setItem('todolist_tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  }),
  deleteTask: (id) => set((state) => {
    const newTasks = state.tasks.filter(t => t.id !== id);
    localStorage.setItem('todolist_tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  }),
  clearCompleted: (groupId) => set((state) => {
    const newTasks = state.tasks.filter(t => !(t.groupId === groupId && t.done));
    localStorage.setItem('todolist_tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  })
}));

export default useTodoStore;