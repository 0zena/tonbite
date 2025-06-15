import { useAuth } from "../../../provider/AuthProvider.tsx";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { RoleType } from "../../../states";
import { AuthService, EmailService, UserService } from "../../../services";
import { useState } from "react";
import { VerifyEmailFrom } from "./VerifyEmailForm.tsx";
import { useConfirmModal, ConfirmModal } from "../../../components/index.ts";

export const AdvancedSettingsForm = ({roles}: {roles: RoleType[] | undefined}) => {
    const {isOpen, onOpenChange, confirmAction, handleConfirmResult} = useConfirmModal();
    const { client, setClient, logout } = useAuth();
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

    const deleteProfile = async () => {
        if (!client || !await confirmAction()) return;
        await UserService.delete(client.id!);
        logout();
    }

    return (
        <div className="flex flex-col gap-4">
            <ConfirmModal isOpen={isOpen}
                          onOpenChange={onOpenChange}
                          onConfirm={handleConfirmResult}
                          title="Confirm permanent account deletion"
                          message="Are you sure you want to delete your profile? This action cannot be undone, all data will be lost." />

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

            <Button onPress={deleteProfile} color="danger">Delete</Button>
        </div>
    );
}