import { useState, useEffect } from 'react';
import useTodoStore from '../store/useTodoStore'; // <-- TINANGGAL KO YUNG { }
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  // Zustand State
  const { tasks, groups } = useTodoStore();
  
  // Axios State para sa User
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Fetch ng user pagka-load ng page
  useEffect(() => {
    axios.get('https://dummyjson.com/users/3')
      .then(res => {
        setUserData(res.data);
        setLoadingUser(false);
      })
      .catch(err => {
        console.error("Error fetching user:", err);
        setLoadingUser(false);
      });
  }, []);

  // Stats
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const pending = total - done;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const recentTasks = [...tasks].reverse().slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-navy text-paper p-6 md:p-10 rounded-xl shadow-md relative overflow-hidden">
        
        {/* User Profile galing sa API */}
        {!loadingUser && userData && (
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={userData.image} 
              alt={userData.firstName} 
              className="w-12 h-12 rounded-full border-2 border-paper shadow-sm bg-white"
            />
            <div>
              <p className="text-sm font-semibold text-[#D3DCE6]">Logged in as (Dummy API):</p>
              <p className="text-lg font-bold text-paper">{userData.firstName} {userData.lastName}</p>
            </div>
          </div>
        )}

        {/* Dynamic Welcome Message */}
        <h1 className="text-2xl md:text-3xl mb-2">
          Welcome back{userData ? `, ${userData.firstName}` : ''}!
        </h1>
        <p className="text-[#D3DCE6] mb-6 max-w-xl">Organize your day, one task at a time. Everything you add is saved automatically in your browser.</p>
        <Link to="/groups" className="inline-flex bg-paper text-navy px-5 py-3 rounded-lg font-semibold hover:bg-white transition-colors">
          Go to Task Groups
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-border p-6 rounded-xl">
          <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-2">Total Tasks</div>
          <div className="text-3xl font-serif">{total}</div>
        </div>
        <div className="bg-white border border-border p-6 rounded-xl">
          <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-2">Completed</div>
          <div className="text-3xl font-serif">{done}</div>
        </div>
        <div className="bg-white border border-border p-6 rounded-xl">
          <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-2">Pending</div>
          <div className="text-3xl font-serif">{pending}</div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border border-border p-6 rounded-xl">
        <div className="flex justify-between text-sm font-semibold uppercase tracking-wider mb-3">
          <span>Overall Progress</span>
          <span className="text-navy">{percent}%</span>
        </div>
        <div className="h-2 bg-[#EAE5DD] rounded-full overflow-hidden">
          <div className="h-full bg-navy rounded-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white border border-border p-6 rounded-xl">
        <h2 className="text-xl mb-4 font-serif">Recently Added Tasks</h2>
        {recentTasks.length === 0 ? (
          <p className="text-muted italic">No tasks yet. Click "Go to Task Groups" to start.</p>
        ) : (
          <ul className="divide-y divide-border">
            {recentTasks.map(t => {
              const group = groups.find(g => g.id === t.groupId);
              return (
                <li key={t.id} className="py-3 flex justify-between items-center gap-4">
                  <div className="min-w-0">
                    <div className={`font-semibold text-[15px] truncate ${t.done ? 'line-through opacity-60 text-muted' : 'text-ink'}`}>{t.title}</div>
                    <div className="text-sm text-muted">{group?.name || 'Unknown'}</div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded flex-shrink-0 ${t.done ? 'bg-[#E8F0EA] text-[#3B5D44]' : 'bg-[#F4EFE6] text-[#8B6B3E]'}`}>
                    {t.done ? 'Done' : 'Pending'}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  );
}