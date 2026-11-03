import { Button } from "@/components/ui/button";
import Link from "next/link";

type RegisterButtonProps = {
  status: "no-session" | "unregistered" | "registered";
};

export default function RegisterButton({ status }: RegisterButtonProps) {
    if (status === "no-session") {
        return (
            <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/auth">SIGN IN</Link>
            </Button>
        );
    }

    if (status === "registered") {
        return (
            <a href="/course/registered">
                <Button size="lg" className="bg-green-500 text-white rounded-full px-8">
                    SUBMIT ASSIGNMENT
                </Button>
            </a>
        );
    }

    // unregistered case - redirect to registration form
    // This is the default return case if status is "unregistered"
    return (
        <Button asChild size="lg" variant="cosmic">
            <a href="/course/register">REGISTER </a>
        </Button>
    );
}