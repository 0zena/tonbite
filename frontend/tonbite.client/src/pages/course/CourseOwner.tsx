import { UserType } from "../../states";
import { Icons } from "../../utils";

// UI Components
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Icon } from "../../components";

interface CourseOwnerProps {
    user?: UserType | undefined
}

export const CourseOwner = ({user}: CourseOwnerProps) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <>
            <Button isIconOnly startContent={<Icon icon={Icons.OWNER} />} 
                               size={"sm"} 
                               variant={"bordered"} 
                               onPress={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <h1 className="text-2xl font-bold">Course Author</h1>
                            </ModalHeader>
                            <ModalBody>
                                <h2 className="text-xl font-bold">{user?.username ?? user?.email}</h2>
                                <p>{user?.bio}</p>
                                {!user && ("Sorry, we can`t fetch course author")}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={onClose}>
                                Ok
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}