import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Stock Dashboard</Link>
        <div>
          <Link to="/" className="text-gray-300 hover:text-white mx-2">Home</Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;