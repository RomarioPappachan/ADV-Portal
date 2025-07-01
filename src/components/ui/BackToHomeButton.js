import Link from "next/link";
import { LuHouse } from "react-icons/lu";

function BackToHomeButton() {
  return (
    <div className="bg-transparent">
      <Link
        href="/home"
        className="inline-flex items-center gap-2 px-4 py-2 text-sky-900 border border-gray-800 rounded-lg hover:bg-sky-50 hover:text-sky-950 transition duration-200 shadow-sm"
      >
        <LuHouse className="text-xl" />
        <span className="font-medium">Home</span>
      </Link>
    </div>
  );
}

export default BackToHomeButton;
