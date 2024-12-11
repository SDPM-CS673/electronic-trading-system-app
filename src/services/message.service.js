import { toast } from "react-toastify"

export const showMessage = (message, type) => {
    toast(message, { type: type || "info", theme: "colored" ,time: 1000});
}