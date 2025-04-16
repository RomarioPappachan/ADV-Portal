import BackToHomeButton from "@/components/ui/BackToHomeButton";
import NavLink from "@/components/user/NavLink";

export default function UserServiceLayout({ children }) {
  return (
    <>
      <BackToHomeButton />
      <div className="rounded-t-lg mt-4 overflow-hidden">
        <NavLink />
      </div>
      <div className="rounded-b-lg overflow-hidden">{children}</div>
    </>
  );
}
