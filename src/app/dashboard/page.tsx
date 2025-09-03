import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in"); // or wherever you want unauthenticated users to go
    return;
  }

  const userRole = user?.privateMetadata?.role;
  console.log("User Role:", userRole);

  // Check for specific roles and redirect accordingly
  if (userRole === "ADMIN") {
    redirect("/dashboard/admin");
  }

  if (userRole === "SELLER") {
    redirect("/dashboard/seller");
  }

  // Redirect USER role or users without a role to home
  if (userRole === "USER" || !userRole) {
    redirect("/");
  }
}
