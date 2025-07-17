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
      <div className="flex w-full h-screen">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>

        <div className="lg:pl-[264px] w-full h-full overflow-auto flex flex-col">
          <div className="mx-auto max-w-screen-2xl w-full h-full flex flex-col">
            <Navbar />
            <main className="py-8 px-6 flex flex-col h-full">{children}</main>
          </div>
        </div>
      </div>

      <CreateWorkspaceModal />

      <CreateProjectModal />

      <CreateTaskModal />

      <UpdateTaskModal />
    </div>
  );
};

export default DashboardLayout;
