import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Link } from "@heroui/react";
import { useAuth } from "../../provider/AuthProvider.tsx";
import { Icons } from "../../utils";
import { Icon } from "../icon/Icon.tsx";

export const AppNavbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const menuItems = [
        {
            name: "Home",
            path: "/",
        },
    ];

    return (
        <Navbar>
            <NavbarContent>
                <NavbarMenuToggle className="sm:hidden" />
                <NavbarBrand>
                    <h2>Tonbite</h2>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className={"max-sm:hidden"} justify={"center"}>
                {menuItems.map((item, index) => (
                    <NavbarItem key={index}>
                        <Link color={"foreground"} href={item.path}>{item.name}</Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify={"end"}>
                {isAuthenticated ? (
                    <>
                        <NavbarItem>
                            <Button onPress={logout}>Logout</Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} href={"/profile"} isIconOnly variant={"light"}>
                                <Icon icon={Icons.PROFILE} />
                            </Button>
                        </NavbarItem>
                    </>
                ) : (
                    <NavbarItem>
                        <Button as={Link} href={"/login"} color="primary" variant="flat">Login</Button>
                    </NavbarItem>
                )}
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={index}>
                        <Button as={Link} variant={"light"} href={item.path}>{item.name}</Button>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}