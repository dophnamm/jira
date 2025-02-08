import Spinner from "@/components/Spinner";

const Loading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Spinner className="size-8" />
    </div>
  );
};

export default Loading;
