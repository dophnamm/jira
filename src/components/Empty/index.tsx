import { AiOutlineInbox } from "react-icons/ai";

interface IProps {
  description?: string;
}

const Empty = (props: IProps) => {
  const { description = "No data" } = props;
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full py-4">
      <AiOutlineInbox className="size-10" />

      <p className="text-muted-foreground text-base">{description}</p>
    </div>
  );
};

export default Empty;
