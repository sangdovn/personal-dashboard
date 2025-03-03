export default function HomePage() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="rounded-lg bg-white p-6 shadow">Weather Widget</div>
      <div className="rounded-lg bg-white p-6 shadow">To-Do List</div>
      <div className="rounded-lg bg-white p-6 shadow">Pomodoro Timer</div>
      <div className="rounded-lg bg-white p-6 shadow">YouTube Summarizer</div>
    </div>
  );
}
