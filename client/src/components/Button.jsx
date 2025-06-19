const Button = ({ children }) => {
  return (
    <button className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all cursor-pointer">
      {children}
    </button>
  );
};

export default Button;
