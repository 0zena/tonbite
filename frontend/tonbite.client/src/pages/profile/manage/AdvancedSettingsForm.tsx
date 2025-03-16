import { useAuth } from "../../../provider/AuthProvider.tsx";
import { Button } from "@heroui/button";
import { RoleType } from "../../../states";
import { AuthService } from "../../../services";

export const AdvancedSettingsForm = ({roles}: {roles: RoleType[] | undefined}) => {
    const { client } = useAuth();

    const BecomeCreator = async () => {
        if (client) {
            await AuthService.becomeCreator(client.id!);
        }
    }

    return (
        <div>
            {roles?.hasRole("Creator") ? (
                <p>Your profile is already upgraded to creator account.</p>
            ) : (
                <Button onPress={BecomeCreator}>Become Creator</Button>
            )}
        </div>
    );
}