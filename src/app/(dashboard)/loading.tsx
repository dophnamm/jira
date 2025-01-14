import Spinner from "@/components/Spinner";

const DashboardLoading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Spinner className="size-8" />
    </div>
  );
};

export default DashboardLoading;
