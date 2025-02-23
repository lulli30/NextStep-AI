import Image from "next/image";

const Team = () => {
  return (
    <section className="team-section bg-white py-20 text-black dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto text-center">
        <h2 className="mb-6 text-4xl font-semibold">Meet Our Team</h2>
        <p className="mx-auto mb-10 max-w-3xl text-lg">
          Our team is made up of passionate students from National University -
          Dasmarinas. We bring together expertise in software development, data
          science, AI, and career coaching to provide the best possible guidance
          to our users.
        </p>
        <div className="team-members grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {/* Team Member 1 */}
          <div className="team-member rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
            <Image
              src=""
              alt="Andrew"
              width={150}
              height={150}
              className="mx-auto mb-4 rounded-full"
            />
            <h3 className="mb-2 text-xl font-semibold">Andrew</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Leader & Developer
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-400">
              Andrew is a tech visionary with a deep understanding of career
              development in the tech world. He has basic knowledge in software
              development and mentoring students.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="team-member rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
            <Image
              src=""
              alt="Ernest"
              width={150}
              height={150}
              className="mx-auto mb-4 rounded-full"
            />
            <h3 className="mb-2 text-xl font-semibold">Ernest</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Co-Lead & Q&A Tester
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-400">
              Ernest specializes in quality assurance and testing. He ensures
              everything runs smoothly and delivers a top-notch experience.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="team-member rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
            <Image
              src=""
              alt="Kim"
              width={150}
              height={150}
              className="mx-auto mb-4 rounded-full"
            />
            <h3 className="mb-2 text-xl font-semibold">Kim</h3>
            <p className="text-gray-700 dark:text-gray-300">UI/UX Designer</p>
            <p className="mt-4 text-gray-700 dark:text-gray-400">
              Kim is the creative mind behind our user interface and experience
              design, ensuring our platform is both functional and beautiful.
            </p>
          </div>

          {/* Team Member 4 */}
          <div className="team-member rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
            <Image
              src=""
              alt="Shyrish"
              width={150}
              height={150}
              className="mx-auto mb-4 rounded-full"
            />
            <h3 className="mb-2 text-xl font-semibold">Shyrish</h3>
            <p className="text-gray-700 dark:text-gray-300">Saling Kitkit</p>
            <p className="mt-4 text-gray-700 dark:text-gray-400">
              Shyrish is passionate about ensuring our users are well-supported
              and that our platform functions optimally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
