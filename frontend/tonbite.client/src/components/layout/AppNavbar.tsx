import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useAuth } from "../../provider/AuthProvider.tsx";
import { Icons } from "../../utils";
import { Icon } from "../icon/Icon.tsx";
import Tonbite from "../../assets/tonbite.svg";
import { useConfirmModal } from "../modal/useConfirmModal.ts";
import { ConfirmModal } from "../modal/ConfirmModal.tsx";

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
    const {isOpen, onOpenChange, confirmAction, handleConfirmResult} = useConfirmModal();
    const { client, isAuthenticated, logout } = useAuth();
    const menuItems = [
        ...publicItems,
        ...(isAuthenticated ? authenticatedItems : []),
        ...(isAuthenticated && client?.roles?.hasOneOfRole("Creator", "Admin") ? protectedItems : []),
    ];

    const onLogout = async () => {
        if (await confirmAction())
            logout();
    }

    return (
        <Navbar className={"backdrop-saturate-100 bg-inherit"}>
            <ConfirmModal isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        onConfirm={handleConfirmResult}
                        title="Logout?"
                        message="Are you sure you want to logout?" />

            <NavbarContent>
                <NavbarMenuToggle className="sm:hidden" />
                <NavbarBrand as={Link} href={"/"} className={"flex items-center space-x-4"}>
                    <img src={Tonbite} alt={"Tonbite Logo"} className={"size-12"} />
                    <h2 className={"text-2xl text-white font-bold max-md:hidden"}>Tonbite</h2>
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
                            <Button onPress={onLogout} variant={"light"}>
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