import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"; 

import { cn } from "../../lib/utils"
import { Bell, Search, User,Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "TV Shows", href: "/tv-shows" },
  { name: "My List", href: "/my-list" },
  { name: "Profile", href: "/profile" },
];

export default function NavBar() {
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-background backdrop-blur-sm">
      {/* 1. (Logo) */}
      <div className="flex items-center justify-between md:gap-10 gap-10 ">
        <Link rel="stylesheet" to="/">
          <h1 className="text-primary md:text-2xl md:font-black tracking-tighter cursor-pointer">
            CINIMA PRO
          </h1>
        </Link>
        {/* 2. (Navigation Links) */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex  gap-6">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.name}> 
                <NavigationMenuLink asChild>
                  <Link
                    to={link.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-gray-300 hover:text-white hover:cursor-pointer transition-colors",
                      isActive(link.href) && "text-white border-b-2 border-primary"
                    )}>
                    {link.name}
                </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
                  ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* 3.(Actions) */}
      <div className="hidden md:flex items-center gap-6 text-white ">
        <button className="hover:text-primary transition-colors cursor-pointer">
          <Search size={20} />
        </button>
        <button className="hover:text-primary transition-colors cursor-pointer relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-primary w-2 h-2 rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-md bg-secondary border border-white/10 flex items-center justify-center overflow-hidden cursor-pointer">
          <User size={18} />
        </div>
      </div>
      {/* 🔥 Mobile Menu */}
        <div className="md:hidden text-gray-300 hover:text-primary transition-colors cursor-pointer">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="ml-2">
                <Menu className="cursor-pointer" size={24} />
              </button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-65 pt-16 backdrop-blur-lg border-l text-primary border-white/10 
                  data-state=open:animate-in 
                  data-state-closed:animate-out
                  data-state=open:slide-in-from-right 
                  data-state=closed:slide-out-from-right
                  duration-300 ease-out"
              >
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={()=>setIsMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-lg text-lg font-medium transition-all",
                        " bg-transparent hover:text-primary hover:bg-white/10",
                        isActive(link.href) &&
                          "text-white bg-gray-400/10 border-r-2 border-primary"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
          </Sheet>
        </div>
    </nav>
  );
}


