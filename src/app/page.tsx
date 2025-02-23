import ScrollUp from "@/components/Common/ScrollUp";
import HowItWorks from "@/components/HowItWorks";
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | NextStep AI",
  description: "This is Home for NextStep AI",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <HowItWorks />
    </>
  );
}
