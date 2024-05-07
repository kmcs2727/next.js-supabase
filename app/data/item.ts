import { createClient } from "@/lib/supabase/server";
import "server-only";

export const getItems = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("items").select("*");

  console.log(data, error);

  return data;
}

export const searchItems = async (keyword: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.from("items").select().like("name", `%${keyword}%`);

  console.log(data, error);

  return data;
}

export const getItem = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.from("items").select().eq('id', id).single();

  console.log(data, error);

  return data;
}