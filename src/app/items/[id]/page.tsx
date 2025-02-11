"use client"
import Card from "@/components/card"
import { supabase } from "@/lib/supabaseClient"
import Image from "next/image"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function Item() {
  const params = useParams()
  const id = params?.id
  const [item, setItem] = useState<any>({})
  useEffect(() => {
    console.log(id)
    const fetchArtifacts = async () => {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("id", id)
        .single()
      if (error) console.error("Error fetching items:", error)
      else setItem(data)
    }

    fetchArtifacts()
  }, [])

  useEffect(() => {
    if (item) console.log(item)
  }, [item])
  return (
    <div className="m-8 mx-16 flex flex-col gap-8">
      <div className="flex gap-8 justify-center flex-wrap">
        <Image
          src={
            supabase.storage.from("pics").getPublicUrl(item.image).data
              .publicUrl
          }
          alt="item image"
          width={400}
          height={400}
        />
        <div className="flex flex-col gap-2 justify-between">
          <span className="text-6xl">{item.name}</span>
          <span>{item.price}</span>
          <span>{item.rating}</span>
          <span>{item.type}</span>
          <button className="px-6 py-3 text-lg font-semibold border border-purple-600 text-white rounded-xl ">
            Add to cart
          </button>
          <button className="px-6 py-3 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg transition-all duration-300">
            Buy now
          </button>
        </div>
      </div>
      <div>{item.description}</div>
    </div>
  )
}
