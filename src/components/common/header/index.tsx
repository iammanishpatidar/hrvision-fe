import Fibonacci from './../../../stories/assets/fibonacci.svg';
// import { Search, Mic } from "lucide-react";

const Header = () => {
  return (
    <div className="h-full w-full flex justify-between items-center px-10">
      <img src={Fibonacci} alt="Fibonacci logo" />
    </div>
  );
};

export default Header;
