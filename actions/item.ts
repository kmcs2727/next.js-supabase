"use server";

import { currentUser } from "@/app/data/auth";
import { createClient } from "@/lib/supabase/server";

export const createItem = async (formData: {name: string, amount: number}) => {
  const supabase = createClient();
  const user = await currentUser();

  if(!user) {
    throw new Error("ログインしてください");
  }

  const { error } = await supabase.from("items").insert(formData);
  if(error) {
    throw new Error(error.message);
  }
}

export const deleteItem = async (id: string) => {
  const supabase = createClient();
  const user = await currentUser();

  if(!user) {
    throw new Error("ログインしてください");
  }

  const { error } = await supabase.from("items").delete().eq("id", id);

  if(error) {
    throw new Error(error.message);
  }
}