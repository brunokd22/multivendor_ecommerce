import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/shared/themeToggle";
import { ubuntu, quicksand, roboto } from "@/fonts";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="p-5">
      <div className="w-full flex gap-2 justify-end ">
        <UserButton />
        <ThemeToggle />
      </div>
      <Button variant="destructive">Click Me</Button>
      <h1 className={`text-3xl text-red-500 ${ubuntu.className} font-light`}>
        Hello, Next.js Using Ubuntu! (Weight 700)
      </h1>
      <h2
        className={`text-2xl text-blue-500 ${quicksand.className} font-normal`}
      >
        Welcome to the future of web development! Using Quicksand (Weight 400)
      </h2>
      <h3 className={`text-xl text-green-500 ${roboto.className} font-bold`}>
        This is Roboto font for demonstration. (Weight 300)
      </h3>
    </div>
  );
}
