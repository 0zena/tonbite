import { useAuth } from "../../../provider/AuthProvider.tsx";
import { Button } from "@heroui/button";
import { RoleType } from "../../../states";
import { AuthService } from "../../../services";

export const AdvancedSettingsForm = ({roles}: {roles: RoleType[] | undefined}) => {
    const { client } = useAuth();

    const BecomeCreator = async () => {
        if (client) {
            await AuthService.BecomeCreator(client.id!);
        }
    }

    return (
        (!roles?.hasRole("Creator") &&
            <Button onPress={BecomeCreator}>Become Creator</Button>
        )
    );
}