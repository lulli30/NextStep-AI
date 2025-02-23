"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname

const Footer = () => {
  const pathname = usePathname(); // Get current pathname

  // Only render Footer if the current pathname is not '/dashboard'
  if (pathname === "/dashboard") {
    return null; // Return nothing if on /dashboard
  }

  return (
    <footer className="relative z-10 bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24">
      <div className="container text-center">
        <div className="mb-12">
          {/* Centered Logo */}
          <Link href="/" className="mb-8 inline-block">
            <Image
              src="/images/logo/NextStep_Dark.png"
              alt="logo"
              className="mx-auto w-full dark:hidden"
              width={140}
              height={30}
            />
            <Image
              src="/images/logo/NextStep_Light.png"
              alt="logo"
              className="mx-auto hidden w-full dark:block"
              width={140}
              height={30}
            />
          </Link>
        </div>

        {/* Social Links */}
        <div className="mb-12 flex justify-center space-x-6">
          <a
            href="https://www.facebook.com/johnandrewborabo44/"
            aria-label="social-link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
          >
            {/* Facebook Icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1 10.4939V7.42705C12.1 6.23984 13.085 5.27741 14.3 5.27741H16.5V2.05296L13.5135 1.84452C10.9664 1.66676 8.8 3.63781 8.8 6.13287V10.4939H5.5V13.7183H8.8V20.1667H12.1V13.7183H15.4L16.5 10.4939H12.1Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@lullipap7082"
            aria-label="social-link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
          >
            {/* YouTube Icon */}
            <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              className="fill-current"
            >
              <path d="M17.5058 2.07119C17.3068 1.2488 16.7099 0.609173 15.9423 0.395963C14.5778 7.26191e-08 9.0627 0 9.0627 0C9.0627 0 3.54766 7.26191e-08 2.18311 0.395963C1.41555 0.609173 0.818561 1.2488 0.619565 2.07119C0.25 3.56366 0.25 6.60953 0.25 6.60953C0.25 6.60953 0.25 9.68585 0.619565 11.1479C0.818561 11.9703 1.41555 12.6099 2.18311 12.8231C3.54766 13.2191 9.0627 13.2191 9.0627 13.2191C9.0627 13.2191 14.5778 13.2191 15.9423 12.8231C16.7099 12.6099 17.3068 11.9703 17.5058 11.1479C17.8754 9.68585 17.8754 6.60953 17.8754 6.60953C17.8754 6.60953 17.8754 3.56366 17.5058 2.07119ZM7.30016 9.44218V3.77687L11.8771 6.60953L7.30016 9.44218Z" />
            </svg>
          </a>
          <a
            href="https://github.com/lulli30"
            aria-label="social-link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
          >
            {/* GitHub Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0.297C5.373 0.297 0 5.67 0 12.297C0 17.627 3.438 22.127 8.207 23.797C8.807 23.897 9.027 23.527 9.027 23.207C9.027 22.927 9.017 22.297 9.013 21.297C5.672 21.897 4.968 19.797 4.968 19.797C4.468 18.497 3.672 18.197 3.672 18.197C2.672 17.597 3.772 17.607 3.772 17.607C4.892 17.707 5.472 18.797 5.472 18.797C6.472 20.497 8.172 20.097 8.872 19.797C8.972 19.097 9.272 18.697 9.602 18.497C7.002 18.197 4.272 17.097 4.272 12.197C4.272 10.797 4.772 9.697 5.572 8.897C5.472 8.597 5.072 7.297 5.672 5.497C5.672 5.497 6.672 5.197 9.027 6.797C9.927 6.497 10.927 6.297 11.927 6.297C12.927 6.297 13.927 6.497 14.827 6.797C17.182 5.197 18.182 5.497 18.182 5.497C18.782 7.297 18.382 8.597 18.282 8.897C19.082 9.697 19.582 10.797 19.582 12.197C19.582 17.107 16.842 18.197 14.242 18.497C14.642 18.797 15.042 19.497 15.042 20.497C15.042 21.897 15.032 22.927 15.032 23.207C15.032 23.527 15.252 23.897 15.852 23.797C20.622 22.127 24 17.627 24 12.297C24 5.67 18.627 0.297 12 0.297Z" />
            </svg>
          </a>
        </div>

        {/* Footer Note */}
        <div className="py-8">
          <p className="text-center text-base text-body-color dark:text-white">
            Website ni{" "}
            <a
              href="http://uideck.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              Lulli
            </a>{" "}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
