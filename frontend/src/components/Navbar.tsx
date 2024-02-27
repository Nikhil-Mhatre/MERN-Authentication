interface NavbarProps {
  onClick: () => void;
  buttonText: string;
}

const Navbar: React.FC<NavbarProps> = ({ onClick, buttonText }) => {
  return (
    <div className="bg-slate-600 w-full h-16 flex justify-end pr-12 items-center">
      <button
        onClick={onClick}
        className="border-2 py-2 px-4 rounded-lg hover:bg-green-400"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Navbar;
