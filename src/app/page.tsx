'use client';

import Hero from "@/components/Hero";
import NewProducts from "@/components/product/NewProducts";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar/>
      <main>
        <Hero/>
        <NewProducts/>
      </main>
    </>
  );
}
