import { Button } from "../ui/button";

type NoItemProps = {
  onClick?: () => void;
};

const NoItem = ({ onClick = () => null }: NoItemProps) => {
  return (
    <div className="border-solid flex flex-col h-[400px] item-center justify-center gap-[20px]">
      <h3 className="text-center">Currently No Item in this list</h3>
      <Button role="button" onClick={onClick} className="w-[100px] self-center cursor-pointer">
        No Item
      </Button>
    </div>
  );
};

export default NoItem;
