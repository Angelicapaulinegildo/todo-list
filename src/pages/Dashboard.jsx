import { useTodo } from '../context/TodoContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { tasks, groups } = useTodo();
  
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const pending = total - done;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const recentTasks = [...tasks].reverse().slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-navy text-paper p-6 md:p-10 rounded-xl shadow-md">
        <h1 className="text-2xl md:text-3xl mb-2">Welcome back!</h1>
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