import React from "react";
import { createRoot } from "react-dom/client";
import Compare from "./compare";

document.addEventListener("DOMContentLoaded", () => {
    const rootElement = document.createElement("div");
    document.body.appendChild(rootElement);

    const root = createRoot(rootElement);
    root.render(<Compare />);
});