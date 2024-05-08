import Link from "next/link";
import { getItems } from "../data/item";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Page() {
  const items = await getItems();
  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl mb-6">商品一覧ページ</h1>

      <form action={async (data: FormData) => {
        "use server";
        let keyword = data.get("query") as string;
        keyword = keyword.replaceAll("　", " ");
        redirect(`/search?q=${encodeURIComponent(keyword)}`);
      }} className="flex gap-2 mb-6">
        <Input name="query" className="flex-1" type="text" autoComplete="off" />
        <Button>検索</Button>
      </form>

      <div className="grid grid-cols-2 gap-2">
        {items?.map(item => (
          <div key={item.id} className="border p-2 rounded-lg relative">
            <div className="aspect-video bg-muted border rounded-lg mb-2"></div>
            <Link className="" href={`/items/${item.id}`}>
              {item.name}/{item.amount.toLocaleString()}円
              <span className="absolute inset-0"></span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}