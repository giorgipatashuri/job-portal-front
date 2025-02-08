import * as React from "react";
import { NavLinkProps } from "../types";

export const NavLink: React.FC<NavLinkProps> = ({ text, href }) => (
  <a
    href={href}
    className="py-6 text-base font-medium leading-relaxed text-slate-600"
  >
    {text}
  </a>
);
