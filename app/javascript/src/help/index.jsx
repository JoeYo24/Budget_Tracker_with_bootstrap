import React from "react";
import { createRoot } from "react-dom/client";
import Help from "./help";

document.addEventListener("DOMContentLoaded", () => {
    const rootElement = document.createElement("div");
    document.body.appendChild(rootElement);

    const root = createRoot(rootElement);
    root.render(<Help />)
})