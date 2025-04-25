import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useAuth } from "../../provider/AuthProvider.tsx";
import { Icons } from "../../utils";
import { Icon } from "../icon/Icon.tsx";

const publicItems = [
    {
        icon: Icons.HOME,
        name: "Home",
        path: "/",
    },
]

const protectedItems = [
    {
        icon: Icons.CREATE,
        name: "Create",
        path: "/create",
    },
]

const authenticatedItems = [
    {
        icon: Icons.BROWSE,
        name: "Browse",
        path: "/browse",
    },
]

export const AppNavbar = () => {
    const { client, isAuthenticated, logout } = useAuth();
    const menuItems = [
        ...publicItems,
        ...(isAuthenticated ? authenticatedItems : []),
        ...(isAuthenticated && client?.roles?.hasOneOfRole("Creator", "Admin") ? protectedItems : []),
    ];

    return (
        <Navbar className={"backdrop-saturate-100 bg-inherit"}>
            <NavbarContent>
                <NavbarMenuToggle className="sm:hidden" />
                <NavbarBrand>
                    <h2 className={"text-2xl font-bold"}>Tonbite</h2>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className={"max-sm:hidden"} justify={"center"}>
                {menuItems.map((item, index) => (
                    <NavbarItem key={index}>
                        <Button as={Link} variant={"light"} href={item.path} className={"space-x-2"}>
                            <Icon icon={item.icon} />
                            {item.name}
                        </Button>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify={"end"}>
                {isAuthenticated ? (
                    <>
                        <NavbarItem>
                            <Button as={Link} href={"/profile"} isIconOnly variant={"light"}>
                                <Icon icon={Icons.PROFILE} />
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button onPress={logout} variant={"light"}>
                                Logout
                                <Icon icon={Icons.LOGOUT} />
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
                        <Button as={Link} variant={"light"} href={item.path} className={"space-x-4 w-full"}>
                            <Icon icon={item.icon} />
                            {item.name}
                        </Button>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}