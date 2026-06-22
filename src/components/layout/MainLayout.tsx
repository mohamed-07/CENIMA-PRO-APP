import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";

export default function MainLayout() {
  useScrollRestoration()
  return (
    <div>
      <NavBar />

      <main className="md:mt-17 ">
          <div className="">
              <Outlet />
          </div>
      </main> 
    </div>
  )
}
