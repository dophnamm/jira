import Image from "next/image";

import { cn } from "@/lib/utils";

import { Avatar as AvatarComp, AvatarFallback } from "@/components/ui/avatar";

interface IProps {
  image?: string;
  name: string;
  className?: string;
}

const Avatar = (props: IProps) => {
  const { image, name, className } = props;

  if (image) {
    return (
      <div
        className={cn("size-8 relative rounded-md overflow-hidden", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <AvatarComp className={cn("size-8", className)}>
      <AvatarFallback className="text-white bg-blue-100 font-semibold text-lg uppercase">
        {name[0]}
      </AvatarFallback>
    </AvatarComp>
  );
};

export default Avatar;
