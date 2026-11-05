export default function UserGuide() {
  return (
    <div className="bg-white border border-border p-8 rounded-xl shadow-sm">
      <h1 className="text-2xl mb-6 font-serif border-b border-border pb-4">User Guide</h1>
      
      <ul className="space-y-5 text-muted leading-relaxed">
        <li>
          <b className="text-ink text-base">1. Dashboard:</b> Here you can see your total tasks, completed tasks, pending tasks, and a live progress bar. You can also see a sample user fetched from the API.
        </li>
        
        <li>
          <b className="text-ink text-base">2. Task Groups:</b> Create a category such as "School", "Personal", etc. Click "View Tasks" to open the group and see its specific task list.
        </li>
        
        <li>
          <b className="text-ink text-base">3. Add a Task:</b> Inside a group, type your task in the input field and click "Add Task".
        </li>
        
        <li>
          <b className="text-ink text-base">4. Complete a Task:</b> Click the box next to a task to mark it as "Done" or "Not Done".
        </li>
        
        <li>
          <b className="text-ink text-base">5. Edit / Delete:</b> Click the pencil icon to edit a task, or the trash icon to remove it. You can also clear all completed tasks using the "Clear Completed" button.
        </li>
        
        <li>
          <b className="text-ink text-base">6. Navigation:</b> Use the sidebar (or the hamburger menu on mobile) to navigate between the Dashboard, Task Groups, Users API, User Guide, and Developers pages without reloading the website.
        </li>

        {/* BAGONG DAGDAG PARA SA REQUIREMENTS */}
        <li className="bg-[#F8F5F0] p-4 rounded-lg border border-border mt-6">
          <b className="text-navy text-base">7. Zustand (Global State):</b> 
          <p className="mt-1 text-sm text-ink">We use Zustand to globally manage and share task data across all components. When you add, edit, or delete a task, Zustand updates the state, and the changes are instantly reflected on the Dashboard, Task Groups, and Group Tasks pages without the need for complex prop drilling.</p>
        </li>

        <li className="bg-[#F8F5F0] p-4 rounded-lg border border-border">
          <b className="text-navy text-base">8. Axios & DummyJSON API:</b> 
          <p className="mt-1 text-sm text-ink">We integrated Axios to send HTTP requests and fetch sample user information from the DummyJSON API. You can see this in action on the Dashboard, the "Users" page, and the Developers page. The system also displays loading indicators while fetching data and handles errors gracefully if the API request fails.</p>
        </li>
      </ul>
    </div>
  );
}