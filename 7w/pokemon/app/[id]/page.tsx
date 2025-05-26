"use client";

import { PokemonDetail } from "@/components/PokemonDetail";
import { useParams } from "next/navigation";

export default function DetailPage() {
  const params = useParams();
  const id = Number(params.id);

  return <PokemonDetail id={id} />;
}
