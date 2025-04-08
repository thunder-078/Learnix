// src/app/dashboard/page.js

export default function Dashboard() {
  const features = [
    {
      title: "Stats Overview",
      description: "Track your growth and daily performance.",
      icon: "📊",
    },
    {
      title: "Tasks",
      description: "Stay on top of your to-do list and priorities.",
      icon: "📝",
    },
    {
      title: "Schedule",
      description: "Organize your meetings and events.",
      icon: "🗓️",
    },
    {
      title: "Team",
      description: "Collaborate with team members effectively.",
      icon: "👥",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-12">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {features.map(({ title, description, icon }) => (
          <div
            key={title}
            className="bg-white shadow-md rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition"
          >
            <div className="text-3xl">{icon}</div>
            <div>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
