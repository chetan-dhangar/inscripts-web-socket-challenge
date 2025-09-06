import { Button } from "../ui/button";

type HeaderProps = {
  onClickHanlder?: () => void;
};

export default function Header({ onClickHanlder = () => null }: HeaderProps) {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center border-b-2 border-gray-600">
      <div className="flex items-center">
        <div className="text-xl font-semibold">Chetan Dhangar</div>
      </div>

      <div>
        <Button onClick={onClickHanlder}>Create Item</Button>
      </div>
    </header>
  );
}
