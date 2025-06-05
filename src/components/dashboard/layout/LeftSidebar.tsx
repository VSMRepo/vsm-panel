import { setPageTitle } from "@/features/common/headerSlice";
import { getUserInfo } from "@/features/common/userSlice";
import routes from "@/helper/sidebarRoutes";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Bookmark,
  ChevronUp,
  CircleX,
  Link,
  SquareArrowUp,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import SidebarSubmenu from "./SidebarSubmenu";

interface LeftSidebarProps {}

export default function LeftSidebar(props: LeftSidebarProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const close = () => {
    const leftSidebarDrawer = document.getElementById("left-sidebar-drawer");
    if (leftSidebarDrawer) leftSidebarDrawer.click();
  };
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(pathname);
    const routeObj = routes.filter((r) => {
      return r.path == pathname;
    })[0];
    if (routeObj) {
      dispatch(setPageTitle({ title: routeObj.pageTitle }));
    } else {
      const secondSlashIndex = pathname.indexOf("/", pathname.indexOf("/") + 1);
      if (secondSlashIndex !== -1) {
        const substringBeforeSecondSlash = pathname.substring(
          0,
          secondSlashIndex
        );
        const submenuRouteObj = routes.filter((r) => {
          return r.path == substringBeforeSecondSlash;
        })[0];
        if (submenuRouteObj.submenu) {
          const submenuObj = submenuRouteObj.submenu.filter((r) => {
            return r.path == pathname;
          })[0];
          console.log("herere", submenuObj);
          dispatch(setPageTitle({ title: submenuObj.pageTitle }));
        }
      }
    }
  }, [pathname]);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const logoutUser = async () => {
    console.log("here");
    // await auth.logout();
    window.location.href = "/";
  };

  return (
    <div className="drawer-side z-30 overflow-hidden">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu pt-2 w-80 bg-base-100 min-h-full text-base-content">
        <button
          className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={close}
        >
          <CircleX className="h-5 inline-block w-5" />
        </button>

        <li className="mb-2 font-semibold text-xl">
          <Link href="/welcome">
            <img
              className="mask mask-squircle w-10"
              src="/logo192.png"
              alt="DashWind Logo"
            />
            DashWind
          </Link>
        </li>
        <div
          className="overflow-y-scroll pb-20 no-scrollbar"
          style={{ height: "85vh" }}
        >
          {routes.map((route, k: number) => (
            <li className="" key={k}>
              {route.submenu ? (
                <SidebarSubmenu {...route} />
              ) : (
                <Link
                  href={route.path}
                  className={`${
                    pathname == route.path
                      ? "font-semibold bg-base-200 "
                      : "font-normal"
                  }`}
                >
                  {route.icon} {route.pageName}
                  {pathname === route.path ? (
                    <span
                      className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
                      aria-hidden="true"
                    ></span>
                  ) : null}
                </Link>
              )}
            </li>
          ))}
        </div>
      </ul>
      {/* Profile icon, opening menu on click */}
      <div className="dropdown bottom-0 absolute dropdown-top w-80 ">
        <div
          tabIndex={0}
          role="button"
          className="btn w-full bg-base-100 text-left justify-start "
        >
          <div className="avatar">
            <div className="w-6 rounded-full">
              <img src={user.avatar ? user.avatar : null} />
            </div>
          </div>
          {user.name}
          <ChevronUp className="w-4 " />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content visible w-52 px-4 z-[1]  menu  shadow bg-base-200 rounded-box "
        >
          <li className="">
            <Link href={"/settings/billing"}>
              <Bookmark className="w-4 " />
              Bill History
            </Link>
          </li>
          <div className="divider py-2 m-0"></div>
          <li onClick={() => logoutUser()}>
            <a className=" ">
              <SquareArrowUp className="w-4 " />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
