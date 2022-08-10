import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useLogout, useSession } from "../contexts/AuthProvider";

const NavItem = ({
  to,
  label
}) => (
  <span>
    <NavLink
      to={to}
      className="text-2xl text-white rounded-t-lg p-4 hover:bg-gray-800"
      activeClassName="bg-gray-800 text-blue-400 rounded-t-lg cursor-default"
    >
      {label}
    </NavLink>
  </span>
);

export default function NavMenu() {
  const { isAuthed } = useSession();
  const logout = useLogout();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <div class="dark:bg-gray-800">
    {
      isAuthed ? (
        <>

          <div className="mb-6 ">
            <nav class="font-sans flex flex-col text-center sm:flex-row sm:text-left py-3 px-6 dark:bg-gray-900 shadow sm:items-baseline w-full">
              <div class="mb-2 sm:mb-0">
                <NavItem to="/messages" label="Messages" />
              </div>
              <div class="mb-2 sm:mb-0">
                  <NavItem to="/friends" label="Friends" />
              </div>
              <div class="ml-auto text-white hover:bg-gray-800">
                <button onClick={handleLogout}>
                    Sign out
                  </button>
              </div>
            </nav>
        </div>
        </>
        ) :   
        <>
          <div class="   py-3 px-6 dark:bg-gray-800"/>
        </>
      }
      </div>
);
}