import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTodo } from '../context/TodoContext';

export default function GroupTasks() {
  const { groupId } = useParams();
  // Kinukuha natin ang editTask at clearCompleted
  const { groups, tasks, addTask, toggleTask, editTask, deleteTask, clearCompleted } = useTodo();
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState('all');
  
  // State para sa Edit Feature
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const group = groups.find(g => g.id === groupId);
  
  if (!group) {
    return (
      <div className="text-center p-10 bg-white border border-border rounded-xl">
        <p className="text-lg mb-4">Group not found.</p>
        <Link to="/groups" className="bg-navy text-white px-5 py-2.5 rounded-lg font-semibold">Go back to Groups</Link>
      </div>
    );
  }

  const groupTasks = tasks.filter(t => t.groupId === groupId);
  const filteredTasks = groupTasks.filter(t => {
    if (filter === 'pending') return !t.done;
    if (filter === 'completed') return t.done;
    return true;
  });

  const handleAdd = () => {
    if (!newTaskTitle.trim()) return;
    addTask(groupId, newTaskTitle.trim());
    setNewTaskTitle('');
  };

  // Functions para sa Edit Feature
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  const saveEdit = (id) => {
    editTask(id, editTitle);
    setEditingId(null); // Isara ang edit mode
  };

  return (
    <div className="space-y-6">
      <Link to="/groups" className="inline-flex items-center gap-2 text-navy font-semibold hover:underline mb-2">
        &larr; Back to Groups
      </Link>
      
      <div>
        <h1 className="text-2xl font-serif">{group.name}</h1>
      </div>

      {/* Add Task Form */}
      <div className="bg-white border border-border p-6 rounded-xl flex flex-col md:flex-row gap-3">
        <input 
          type="text" 
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="What needs to be done?" 
          className="flex-1 px-4 py-3 border border-border rounded-lg bg-[#FAFAFA] focus:outline-none focus:border-navy text-base"
        />
        <button onClick={handleAdd} className="bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy/90 transition-colors w-full md:w-auto">
          Add Task
        </button>
      </div>

      {/* Filters & Clear Completed Button */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {['all', 'pending', 'completed'].map(f => (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors whitespace-nowrap ${filter === f ? 'bg-navy text-white' : 'bg-transparent text-muted hover:bg-[#EAE5DD]'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Clear Completed Button */}
        {groupTasks.filter(t => t.done).length > 0 && (
          <button 
            onClick={() => {
              if (window.confirm("Clear all completed tasks in this group?")) {
                clearCompleted(groupId);
              }
            }} 
            className="text-sm font-semibold text-danger hover:bg-red-50 px-3 py-2 rounded-lg transition-colors border border-transparent hover:border-red-200"
          >
            Clear Completed
          </button>
        )}
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-muted italic text-center py-8 bg-white border border-border rounded-xl">No {filter} tasks to show.</p>
        ) : (
          filteredTasks.map(t => (
            <li key={t.id} className="bg-white border border-border p-4 rounded-xl flex items-center gap-3 transition-shadow hover:shadow-sm">
              
              {/* Checkbox */}
              <button 
                onClick={() => toggleTask(t.id)} 
                className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${t.done ? 'bg-navy border-navy' : 'border-muted bg-white hover:border-navy'}`}
              >
                {t.done && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
              </button>

              {/* Task Title (Naka-inline edit kapag pinindot ang edit button) */}
              {editingId === t.id ? (
                <div className="flex-1 flex gap-2">
                  <input 
                    type="text" 
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(t.id)}
                    autoFocus
                    className="flex-1 px-3 py-1 border border-navy rounded focus:outline-none"
                  />
                  <button onClick={() => saveEdit(t.id)} className="bg-navy text-white px-3 py-1 rounded text-sm font-semibold">Save</button>
                  <button onClick={() => setEditingId(null)} className="text-muted text-sm hover:underline">Cancel</button>
                </div>
              ) : (
                <span className={`flex-1 text-base font-medium break-words ${t.done ? 'line-through opacity-60 text-muted' : 'text-ink'}`}>{t.title}</span>
              )}

              {/* Action Buttons (Edit & Delete) - Ipapakita lang kapag hindi naka-edit mode */}
              {editingId !== t.id && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  {/* Edit Button */}
                  <button onClick={() => startEditing(t)} className="text-muted p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit Task">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  
                  {/* Delete Button */}
                  <button onClick={() => deleteTask(t.id)} className="text-danger p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete Task">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}