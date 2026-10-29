import { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { Link } from 'react-router-dom';

export default function TaskGroups() {
  const { groups, tasks, addGroup, deleteGroup } = useTodo();
  const [newGroupName, setNewGroupName] = useState('');

  const handleCreate = () => {
    if (!newGroupName.trim()) return alert('Please enter a group name.');
    if (groups.some(g => g.name.toLowerCase() === newGroupName.trim().toLowerCase())) {
      return alert('This group already exists!');
    }
    addGroup(newGroupName.trim());
    setNewGroupName('');
  };

  const handleDelete = (id, name) => {
    if(window.confirm(`Delete "${name}" and all its tasks?`)) {
      deleteGroup(id);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl mb-1 font-serif">Task Groups</h1>
        <p className="text-muted">Organize your tasks into categories.</p>
      </div>

      {/* Create Form */}
      <div className="bg-white border border-border p-6 rounded-xl flex flex-col md:flex-row gap-3">
        <input 
          type="text" 
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          placeholder="e.g. School Projects" 
          className="flex-1 px-4 py-3 border border-border rounded-lg bg-[#FAFAFA] focus:outline-none focus:border-navy text-base"
        />
        <button onClick={handleCreate} className="bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy/90 transition-colors w-full md:w-auto">
          + Create Group
        </button>
      </div>

      {/* Groups List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map(g => {
          const gTasks = tasks.filter(t => t.groupId === g.id);
          const done = gTasks.filter(t => t.done).length;
          return (
            <div key={g.id} className="bg-white border border-border p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <h3 className="text-lg font-serif">{g.name}</h3>
                <p className="text-sm text-muted mt-1 mb-4">{gTasks.length} task{gTasks.length === 1 ? '' : 's'} ({done} done)</p>
              </div>
              <div className="flex gap-2">
                <Link to={`/groups/${g.id}`} className="flex-1 bg-navy text-white text-center py-2.5 rounded-lg font-semibold hover:bg-navy/90 transition-colors">
                  View Tasks
                </Link>
                <button onClick={() => handleDelete(g.id, g.name)} className="bg-[#FDF5F5] border border-[#F0CECE] text-danger px-4 py-2.5 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}