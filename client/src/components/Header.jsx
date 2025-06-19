// assets
import { assets } from "../assets/assets";

// components
import Button from "./Button";

// custom hook
import { useAuth } from "../customHooks/useAuth";

const { header_img, hand_wave } = assets;

const Header = () => {
  const { isLoggedIn, currentUser } = useAuth();

  return (
    <header className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img
        src={header_img}
        alt="header-img"
        className="w-36 h-36 rounded-full mb-6"
      />
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-xl sm:text-3xl font-medium">
          Hey {isLoggedIn ? currentUser.name : "Developer"}
        </h1>
        <img src={hand_wave} alt="wave-img" className="w-8 aspect-square" />
      </div>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to MERN Auth
      </h2>
      <p className="mb-8 max-w-md text-gray-700">
        Let's start with a quick product tour and we will have you up and
        running in no time!
      </p>
      <Button className="btn">Get Started</Button>
    </header>
  );
};

export default Header;
