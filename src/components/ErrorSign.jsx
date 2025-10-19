import { toast } from "sonner";

export function formErrorSign(data) {
    if (!data?.name) {
     return toast.error("Please enter your name!");
    }
    if (!data?.email) {
     return toast.error("Please enter your email!");
    }
    if (!data?.password) {
     return toast.error("Please enter your password!");
    }
    return null;
}
