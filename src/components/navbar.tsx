'use client'
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Input,
} from "@nextui-org/react";
import Image from "next/image";
import { ThemeSwitcher } from "./themeSwitcher";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import localFont from 'next/font/local'
import { useDebounce } from "@/hooks/useDebounce";
import { SearchIcon } from "./iconList";

const titleFont = localFont({
  src: '../../public/font/Amarillo.otf',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  variable: '--font-title',
  display: 'swap',
  weight: '400',
})

export default function NavigationBar({
  currentPage,
}: {
  currentPage: any
}) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  const handlePage = (page: number) => {
    if (page) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  const handleDebounce = useDebounce((term: string) => {
    if (term) {
      params.set("query", term);
      params.set("page", "1");
    } else {
      params.delete("page");
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    handlePage(1);
  }, 500);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
    <NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
       <NavbarBrand style={{cursor: "pointer"}} onClick={() => router.push("/")}>
        {/* <Image src="/animeBox.png" alt="AnimeBox Logo" width={50} height={50} /> */}
        <p className={`font-bold bg-gradient-to-r from-teal-600 to-blue-500 via-sky-400 text-transparent bg-clip-text text-2xl ${titleFont.className}`}>Netplix</p>
      </NavbarBrand>
    </NavbarContent>

    <NavbarContent className="hidden sm:flex gap-4" justify="start">
      <NavbarItem isActive>
        <Link  href="#">
          Home
        </Link>
      </NavbarItem>
      <NavbarItem isActive={false}>
        <Link href="#" color="foreground" aria-current="page">
          Series
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#">
          Movies
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#">
          Genre
        </Link>
      </NavbarItem>
    </NavbarContent>
    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
      <Input
        value={value}
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => {
          handleDebounce(e.target.value);
          setValue(e.target.value);
        }}
        name="search"
        label=""
        variant="faded"
        radius="lg"
        isClearable
        onClear={() => {
          replace(`/`);
          setValue('');
        }}
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60 dark:placeholder:text-default-700/50",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search..."
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
      </NavbarItem>
    </NavbarContent>
    <NavbarMenu>
      {menuItems.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`}>
          <Link
            color={
              index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
            }
            className="w-full"
            href="#"
            size="lg"
          >
            {item}
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
    <ThemeSwitcher />
  </Navbar>
  );
}
