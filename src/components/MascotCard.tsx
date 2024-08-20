import clsx from "clsx";

interface MascotCardProps {
  name: string;
  onClick?: () => void;
  image: string;
  isBought?: boolean;
}
export const MascotCard = ({name, isBought = false, onClick, image}: MascotCardProps) => {

  return (<div
    className={clsx("w-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl cursor-pointer",
      { "opacity-50": !isBought },
    )}
    onClick={onClick}
  >
    <div className="group">
      <img
        src={image}
        alt="Product" className="h-80 w-80 object-cover rounded-t-xl"
      />
    </div>
    <div className="px-4 py-3 w-80">
      <span className="text-gray-400 mr-3 uppercase text-xs">Mascot</span>
      <p className="text-lg font-bold text-black truncate block capitalize">{name}</p>
    </div>
  </div>)
}
