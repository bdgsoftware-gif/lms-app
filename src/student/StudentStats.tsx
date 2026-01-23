interface Props {
  stats: {
    enrolled_courses: number;
    watch_time_minutes: number;
    certificates: number;
    completed_modules: {
      completed: number;
      total: number;
      percent: number;
    };
  };
}

const StudentStats = ({ stats }: Props) => {
  const formatWatchTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} মিনিট`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} ঘন্টা ${mins > 0 ? `${mins} মিনিট` : ""}`;
  };

  const statCards = [
    {
      label: "এনরোল করা কোর্স",
      value: stats.enrolled_courses,
      suffix: "টি",
      icon: "📚",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "দেখার সময়",
      value: formatWatchTime(stats.watch_time_minutes),
      suffix: "",
      icon: "⏱️",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      label: "সার্টিফিকেট",
      value: stats.certificates,
      suffix: "টি",
      icon: "🏆",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      label: "সম্পন্ন মডিউল",
      value: `${stats.completed_modules.completed}/${stats.completed_modules.total}`,
      suffix: "",
      icon: "✅",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-brand-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`${stat.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className={`text-xs font-semibold ${stat.textColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
              ↗
            </div>
          </div>

          <p className="text-sm text-gray-600 font-medium mb-2">{stat.label}</p>
          <p className={`text-3xl font-bold ${stat.textColor} group-hover:scale-105 transition-transform`}>
            {stat.value}
            {stat.suffix && <span className="text-xl ml-1">{stat.suffix}</span>}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StudentStats;