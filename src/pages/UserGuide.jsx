export default function UserGuide() {
  return (
    <div className="bg-white border border-border p-8 rounded-xl shadow-sm">
      <h1 className="text-2xl mb-6 font-serif border-b border-border pb-4">User Guide</h1>
      <ul className="space-y-5 text-muted leading-relaxed">
        <li><b className="text-ink">Dashboard:</b> Here you can see your total tasks, completed tasks, pending tasks, and recently added tasks.</li>
        <li><b className="text-ink">Task Groups:</b> Create a category such as "School", "Personal", etc. to organize your tasks.</li>
        <li><b className="text-ink">Open a Group:</b> Click "View Tasks" to open the group and see its specific task list.</li>
        <li><b className="text-ink">Add a Task:</b> Type your task in the input field and click "Add Task".</li>
        <li><b className="text-ink">Complete a Task:</b> Click the box next to a task to mark it as "Done".</li>
        <li><b className="text-ink">Delete:</b> Click the trash icon to remove a task or a whole group.</li>
        <li><b className="text-ink">Auto-save:</b> Everything is saved automatically in your browser's local storage, even if you refresh the page.</li>
      </ul>
    </div>
  );
}