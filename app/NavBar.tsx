"use client";
import { Avatar, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiTeamLine } from "react-icons/ri";
import Skeleton from "./components/Skeleton";

const NavBar = () => {
  return (
    <>
      <nav className="flex space-x-6 mb-5 h-14 items-center px-5 border-b py-3">
        <Container>
          <Flex justify={"between"}>
            <Flex align={"center"} gap={"3"}>
              <Link href={"/"}>
                <RiTeamLine size={40} />
              </Link>
              <NavLinks/>
            </Flex>
            <AuthStatus/>
          </Flex>
        </Container>
      </nav>
    </>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classnames({
              "nav-link":true,
              "text-zinc-400": link.href === currentPath,
              
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return  <Skeleton baseColor="#202020" highlightColor="#444" width={"3rem"}/> ;

  if (status === "unauthenticated")
    return <Link className="nav-link" href={"/api/auth/signin"}>Login</Link>;

  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              className="cursor-wait"
              radius="full"
              size="3"
              src={session.user?.image!}
              fallback="?"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>{session.user?.email}</DropdownMenu.Label>
            <DropdownMenu.Label>
              <Link href={"/api/auth/signout"}>Log out</Link>
            </DropdownMenu.Label>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default NavBar;
