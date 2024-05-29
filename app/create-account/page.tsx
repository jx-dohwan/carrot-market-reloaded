import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { createAccount } from "./actions";
import { useFormState } from "react-dom";

export default function CreateAccount() {
    const [state, dispatch] = useFormState(createAccount, null);
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">Fill in the form below to join!</h2>
            </div>
            <form className="flex flex-col gap-3">
                <FormInput
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    errors={[]}
                />
                <FormInput
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    errors={[]}
                />
                <FormInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    errors={[]}
                />
                <FormInput
                    name="confirm_password"
                    type="password"
                    placeholder="Confirm Password"
                    required errors={[]}
                />
                <FormButton text="Create account" />
            </form>
            <div className="w-full h-px bg-neutral-500" />
            <div>
                <Link
                    className="primary-btn flex h-10 items-center justify-center gap-2"
                    href="/sms"
                >
                    <span>
                        <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
                    </span>
                    <span>Sign up with SMS</span>
                </Link>
            </div>
        </div>
    );
}