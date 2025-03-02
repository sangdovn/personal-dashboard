export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
      <div className="p-6 bg-white shadow rounded-lg">Weather Widget</div>
      <div className="p-6 bg-white shadow rounded-lg">To-Do List</div>
      <div className="p-6 bg-white shadow rounded-lg">Pomodoro Timer</div>
      <div className="p-6 bg-white shadow rounded-lg">YouTube Summarizer</div>
    </div>
  );
}
