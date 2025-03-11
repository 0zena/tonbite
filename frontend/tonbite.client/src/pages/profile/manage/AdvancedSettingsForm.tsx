import { Button } from "@heroui/button";
import {RoleType} from "../../../states";

export const AdvancedSettingsForm = ({roles}: {roles: RoleType[] | undefined}) => {
    return (
        (!roles?.hasRole("Creator") &&
            <Button>Become Creator</Button>
        )
    );
}