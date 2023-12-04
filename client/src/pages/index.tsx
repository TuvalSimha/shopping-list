import { AddItem } from "@/components/add-item";
import { DataTableForFeed } from "@/components/data-table-feed";
import Link from "next/link";

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center mt-[100px]`}>
      <div className="font-semibold rounded-full bg-black border flex border-white justify-center text-white h-[150px] w-[150px] pt-[50px]">
        <Link href={"/add-link"}>הוספת פריט</Link>
      </div>
      <DataTableForFeed />
    </main>
  );
}
