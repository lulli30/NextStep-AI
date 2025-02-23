import { CheckIcon } from "@heroicons/react/24/outline";

const Mission = () => {
  return (
    <section className="why-choose-us bg-white py-20 text-black dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-6 text-center lg:px-12">
        <h2 className="from-yellow-400 mb-6 bg-gradient-to-r bg-clip-text text-5xl font-extrabold">
          Why Choose NextStep AI?
        </h2>
        <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed">
          With so many career resources out there, what sets NextStep AI apart?
          Our platform offers AI-driven, personalized guidance, and we focus on
          your unique strengths, challenges, and goals. Whether you're just
          starting your journey or looking to pivot into a new tech field, we
          provide a roadmap that evolves with you.
        </p>
        <ul className="mx-auto max-w-3xl list-inside list-disc space-y-4 text-center text-lg">
          <li className="flex items-start justify-center space-x-4">
            <CheckIcon className="text-yellow-400 h-8 w-8" />
            <p>Tailored roadmaps based on your unique profile</p>
          </li>
          <li className="flex items-start justify-center space-x-4">
            <CheckIcon className="text-yellow-400 h-8 w-8" />
            <p>AI-driven insights for better career decisions</p>
          </li>
          <li className="flex items-start justify-center space-x-4">
            <CheckIcon className="text-yellow-400 h-8 w-8" />
            <p>Real-time updates and support for your career path</p>
          </li>
          <li className="flex items-start justify-center space-x-4">
            <CheckIcon className="text-yellow-400 h-8 w-8" />
            <p>A growing community of tech professionals and mentors</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Mission;
