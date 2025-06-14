import { useAuth } from "../../../provider/AuthProvider.tsx";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { RoleType } from "../../../states";
import { AuthService, EmailService } from "../../../services";
import { useState } from "react";
import { VerifyEmailFrom } from "./VerifyEmailForm.tsx";

export const AdvancedSettingsForm = ({roles}: {roles: RoleType[] | undefined}) => {
    const { client, setClient } = useAuth();
    const [showInput, setShowInput] = useState(false); 

    const becomeCreator = async () => {
        if (!client) return;
        const result = await AuthService.becomeCreator(client.id!);
        await AuthService.refreshToken();
        if (result) setClient(result);
    }

    const sendCode = async () => {
        if (!client) return;
        await EmailService.sendCode(client.email);
        setShowInput(true);
    }

    return (
        <div className="flex flex-col gap-4">
            {roles?.hasRole("Creator") 
                ? <p>Your profile is already upgraded to creator account.</p> 
                : <Button onPress={becomeCreator}>Become Creator</Button>
            }

            {client?.verified 
                ? <Chip size="lg" variant="bordered">Email Verified</Chip> 
                : <div className="flex gap-2">
                    <Chip size="lg" variant="bordered">Email Unverified</Chip> 
                    <Button size="sm" onPress={sendCode}>Send Code</Button>
                </div>
            }

            {showInput 
                ? <VerifyEmailFrom />
                : null}
        </div>
    );
}