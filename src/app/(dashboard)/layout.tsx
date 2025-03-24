import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";

import CreateProjectModal from "@/features/projects/components/CreateProjectModal";
import CreateTaskModal from "@/features/tasks/components/CreateTaskModal";
import UpdateTaskModal from "@/features/tasks/components/UpdateTaskModal";
import CreateWorkspaceModal from "@/features/workspaces/components/CreateWorkspaceModal";

interface IProps {
  children: React.ReactNode;
}

const DashboardLayout = (props: IProps) => {
  const { children } = props;
  return (
    <div className="min-h-screen">
      <CreateWorkspaceModal />
      <CreateProjectModal />
      <CreateTaskModal />
      <UpdateTaskModal />

      <div className="flex w-full h-full">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>

        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />
            <main className="py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
