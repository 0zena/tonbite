import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, User, Button, Link } from "@heroui/react";
import { useAuth } from "../../provider/AuthProvider.tsx";

export const AppNavbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const menuItems = [ "Home" ];

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
                        <Link color={"foreground"}>{item}</Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify={"end"}>
                {isAuthenticated ? (
                    <>
                        <NavbarItem>
                            <Button onPress={logout}>Logout</Button>
                        </NavbarItem>
                        <User name={"Test User"} />
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
                        <Button variant={"light"}>{item}</Button>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}