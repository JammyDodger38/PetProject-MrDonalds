import { useState } from "react";

export function useOpenOrder() {
    const [openOrder, setOpenOrder] = useState(null);
    return { openOrder, setOpenOrder };
}