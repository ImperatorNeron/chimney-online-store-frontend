import { toast } from "react-toastify";

export class NotificationService {
    static success = (message: string) =>
        toast.success(message, { autoClose: 1500 });

    static error = (message: string) =>
        toast.error(message);

    static warning = (message: string) =>
        toast.warning(message, { autoClose: 1500 });

}