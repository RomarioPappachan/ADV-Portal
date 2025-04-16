import Link from "next/link";
import { LuHouse } from "react-icons/lu";

function BackToHomeButton() {
  return (
    <div className="bg-transparent">
      <Link
        href="/home"
        className="inline-flex items-center gap-2 px-4 py-2 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 hover:text-blue-800 transition duration-200 shadow-sm"
      >
        <LuHouse className="text-xl" />
        <span className="font-medium">Home</span>
      </Link>
    </div>
  );
}

export default BackToHomeButton;
