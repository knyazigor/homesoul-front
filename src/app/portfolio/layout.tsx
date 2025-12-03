import { ReactNode } from "react";
import "./portfolio.module.scss";

interface PortfolioLayoutProps {
  children: ReactNode;
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return children;
}
