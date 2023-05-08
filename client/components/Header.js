import { toast } from "react-toastify";
import Link from "next/link";
import useStore from "../store";
import Spinner from "./Spinner";
import { authApi } from "../pages/api/authApi";
import { GenericResponse } from "../pages/api/types";
import { LoadingButton } from "./LoadingButton";

const Header = () => {
  const store = useStore();
  const user = store.authUser;

  const logoutUser = async () => {
    try {
      store.setRequestLoading(true);
      (await authApi.get) < GenericResponse > "/auth/logout";
      store.setRequestLoading(false);
      toast.success("Successfully logged out", {
        position: "top-right",
      });
      document.location.href = "/login";
    } catch (error) {
      store.setRequestLoading(false);
      store.setAuthUser(null);
      document.location.href = "/login";
    }
  };

  return (
    <>
      <header className="bg-white h-20">
        <nav className="h-full flex justify-between container items-center">
          <div>
            <Link
              href="/"
              className="text-ct-yellow-600 text-2xl font-semibold"
            >
              JAPPER
            </Link>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/" className="text-ct-dark-600">
                Home
              </Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link href="/register" className="text-ct-dark-600">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-ct-dark-600">
                    Login
                  </Link>
                </li>

                <li>
                  <Link href="/profile" className="text-ct-dark-600">
                    Profile
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li className="cursor-pointer" onClick={logoutUser}>
                  Logout
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <div className="pt-4 pl-2 bg-ct-blue-600 fixed">
        {store.requestLoading && <Spinner color="text-ct-yellow-600" />}
      </div>
    </>
  );
};

export default Header;
