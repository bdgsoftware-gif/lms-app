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
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <Stat label="এনরোল করা কোর্স" value={`${stats.enrolled_courses} টি`} />
      <Stat label="দেখার সময়" value={`${stats.watch_time_minutes} মিনিট`} />
      <Stat label="সার্টিফিকেট" value={stats.certificates} />
      <Stat label="সম্পন্ন মডিউল" value={stats.completed_modules.completed} />
    </div>
  );
};

const Stat = ({ label, value }: any) => (
  <div className="bg-white p-6 rounded-xl border">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-semibold mt-2">{value}</p>
  </div>
);

export default StudentStats;
