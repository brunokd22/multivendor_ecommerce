import { UserButton } from "@clerk/nextjs";
import React from "react";

import ThemeToggle from "@/components/ui/shared/themeToggle";

export default function HeaderDashboardPage() {
  return (
    <div className="fixed z-[20] md:left-[300px] top-0 left-0 right-0 bg-background/80 backdrop-blur-md flex justify-end  border-b-[1px] gap-4 ">
      <UserButton />
      <ThemeToggle />
    </div>
  );
}
