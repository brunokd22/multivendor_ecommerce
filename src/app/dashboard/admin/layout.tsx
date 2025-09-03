import HeaderDashboardPage from "@/components/dashboard/header/page";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  //Block Non Admin Users

  const user = await currentUser();
  if (!user || user?.privateMetadata?.role !== "ADMIN") {
    redirect("/sign-in");
  }
  return (
    <div className="w-full h-full">
      {/***Side Bar */}
      <div className="w-full ml-[300px]">
        <HeaderDashboardPage />
        <div className="w-full mt-[75px] p-4">{children}</div>
      </div>
    </div>
  );
}
