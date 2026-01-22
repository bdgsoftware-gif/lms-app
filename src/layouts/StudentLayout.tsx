import { Outlet } from "react-router-dom";
import StudentSidebar from "../student/StudentSidebar";
import StudentTopbar from "../student/StudentTopbar";

const StudentLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#F7F9F8]">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        <StudentTopbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
