import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";

interface ConfirmModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onConfirm: (result: boolean) => void;
    title?: string;
    message?: string;
}

export const ConfirmModal = ({ isOpen, onOpenChange, onConfirm, title, message }: ConfirmModalProps) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>{title ?? "Confirm action"}</ModalHeader>
                <ModalBody>
                    {message ?? "Are you sure you want to confirm this action?"}
                </ModalBody>
                <ModalFooter>
                    <Button onPress={() => onConfirm(false)} color="danger" variant="light">Cancel</Button>
                    <Button onPress={() => onConfirm(true)} color="primary">Confirm</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
