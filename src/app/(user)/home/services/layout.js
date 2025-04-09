import Navbar from "@/components/Navbar";
import NavLink from "@/components/user/NavLink";

export default function UserServiceLayout({ children }) {
  return (
    <>
      <div>
        <NavLink />
      </div>
      <div>{children}</div>
    </>
  );
}
