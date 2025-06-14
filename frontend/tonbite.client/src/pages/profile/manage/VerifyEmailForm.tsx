import {InputOtp} from "@heroui/input-otp";
import { Button } from "@heroui/button";
import { useState } from "react";
import { useAuth } from "../../../provider/AuthProvider";
import { VerifyEmailService } from "../../../services";

export const VerifyEmailFrom = () => {
    const { client, setClient } = useAuth();
    const [code, setCode] = useState("");

    const submit = async () => {
        if (!client) return;

        if (code.length < 5)
            return;

        const response = await VerifyEmailService.verifyEmail(client.email, code);
        if (response)
            setClient(response);
    }

    return (
        <form onSubmit={submit}>
            <p className="text-sm text-gray-400 mb-4">
                We've sent a 5-digit verification code to your email. Please enter it below to verify your account.
            </p>
            <InputOtp length={5} value={code} onValueChange={setCode} />
            <Button type="submit">Submit</Button>
        </form>
    )
}