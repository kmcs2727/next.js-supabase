"use client";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { createItem } from "@/actions/item";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  amount: z.coerce.number().min(1),
  name: z.string().min(1).max(255),
});

type FormData = z.infer<typeof formSchema>;

export default function ItemForm () {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
    }
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await createItem(data).then(() => {
      toast({
        title: "投稿しました",
        description: "アイテム一覧を確認してください",
      });
    }).catch(() => {
      toast({
        title: "エラーが発生しました",
        description: "管理者にお問い合わせしてください",
        variant: "destructive",
      });
    });
    
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, () => {
        alert("error");
      })} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">商品名</FormLabel>
              <FormControl>
                <Input placeholder="例) ボールペン" {...field} />
              </FormControl>
              <FormDescription>
                最大255文字まで
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">値段</FormLabel>
              <FormControl>
                <Input placeholder="1000" type="number" {...field} />
              </FormControl>
              <FormDescription>
                1円以上
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant={"outline"}>商品追加</Button>
      </form>
    </Form>
  );
}