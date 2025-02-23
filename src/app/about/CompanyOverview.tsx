"use client";

const CompanyOverview = () => (
  <section
    id="company-overview"
    className="overview bg-white py-20 text-black dark:bg-gray-800 dark:text-white"
  >
    <div className="container mx-auto px-6 text-center lg:px-12">
      <h2 className="from-yellow-400 mb-6 bg-gradient-to-r bg-clip-text text-5xl font-extrabold">
        Who We Are
      </h2>
      <p className="mx-auto mb-8 max-w-4xl text-lg leading-relaxed opacity-90">
        At <span className="text-yellow-300 font-semibold">NextStep AI</span>,
        we&apos;re a passionate team dedicated to helping aspiring tech
        professionals shape their careers. With years of experience in the tech
        industry, we understand the challenges early career seekers face, and
        we’re here to provide the tools and support they need to succeed. Our
        vision is to make career planning more accessible and personalized,
        giving individuals the power to make informed decisions about their
        future.
      </p>
    </div>
  </section>
);

export default CompanyOverview;
