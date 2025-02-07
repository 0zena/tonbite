import { useState } from "react";
import { useDisclosure } from "@heroui/react";

export const useConfirmModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [resolveConfirm, setResolveConfirm] = useState<((result: boolean) => void) | null>(null);

    const confirmAction = (): Promise<boolean> => {
        return new Promise<boolean>((resolve) => {
            setResolveConfirm(() => resolve);
            onOpen();
        });
    };

    const handleConfirmResult = (result: boolean) => {
        if (resolveConfirm) {
            resolveConfirm(result);
            setResolveConfirm(null);
        }
        onOpenChange();
    };

    return { isOpen, onOpenChange, confirmAction, handleConfirmResult };
};
