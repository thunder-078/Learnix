export default function Dashboard() {
  const cards = [
    {
      title: "📊 Stats Overview",
      text: "Track your growth and daily performance.",
    },
    {
      title: "📝 Tasks",
      text: "Stay on top of your to-do list and priorities.",
    },
    {
      title: "📅 Schedule",
      text: "Organize your meetings and events.",
    },
    {
      title: "👥 Team",
      text: "Collaborate with team members effectively.",
    },
  ];

  return (
    <main style={{ all: 'unset' }} className="min-h-screen bg-yellow-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-4 shadow hover:shadow-md transition min-h-[120px] cursor-pointer"
          >
            <h2 className="font-semibold text-lg mb-2">{card.title}</h2>
            <p className="text-gray-600 text-sm">{card.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
