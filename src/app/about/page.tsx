import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import Image from "next/image"; // For team images, if you want to add photos of the team
import CompanyOverview from "./CompanyOverview";
import Mission from "./Mission";
import CoreValues from "./CoreValues";
import WhyChooseUs from "./WhyChooseUs";
import Team from "./Team";

export const metadata: Metadata = {
  title: "About | NextStep AI",
  description: "Build your own Tech Roadmap with NextStep AI",
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb pageName="About Us" description="" />
      <CompanyOverview />
      <Mission />
      <CoreValues />
      <WhyChooseUs />
      <Team />
    </>
  );
};

export default AboutPage;
