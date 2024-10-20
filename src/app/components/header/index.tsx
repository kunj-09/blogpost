'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../button';
import ThemeToggler from '../theme';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import LoginModal from '../Modals/LoginModal'; // Import the new modal component
import { menuItems } from '@/utils'; // Assuming you have menuItems
import { MenuItem } from '@/utils/types'; // Assuming you have this type

export default function Header() {
    const [sticky, setSticky] = useState<boolean>(false);
    const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const { data: session } = useSession();
    const router = useRouter();
    const pathName = usePathname(); // To track route changes

    // Function to make navbar sticky
    function handleStickyNavbar() {
        if (window.scrollY >= 80) setSticky(true);
        else setSticky(false);
    }

    // Toggle navbar for mobile view
    function handleNavbarToggle() {
        setNavbarOpen(!navbarOpen);
    }

    // Toggle login modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleStickyNavbar);

        // Cleanup on component unmount
        return () => window.removeEventListener('scroll', handleStickyNavbar);
    }, []);

    return (
        <div>
            <header
                className={`top-0 left-0 flex w-full items-center bg-transparent ${
                    sticky
                        ? '!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20'
                        : 'absolute'
                }`}
            >
                <div className="container">
                    <div className="relative -mx-4 flex items-center justify-between">
                        <div className="w-60 max-w-full px-4 xl:mr-12">
                            <Link
                                href={'/'}
                                className={`text-[30px] font-extrabold cursor-pointer block w-full ${
                                    sticky ? 'py-5 lg:py-2' : 'py-8'
                                }`}
                            >
                                BlogPost
                            </Link>
                        </div>
                        <div className="flex w-full items-center justify-between px-4">
                            <div>
                                <button
                                    onClick={handleNavbarToggle}
                                    id="navbarToggle"
                                    aria-label="Mobile-Menu"
                                    className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                                >
                                    <span
                                        className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                                            navbarOpen ? 'top-[7px] rotate-45' : ''
                                        }`}
                                    />
                                    <span
                                        className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                                            navbarOpen ? 'opacity-0' : ''
                                        }`}
                                    />
                                    <span
                                        className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                                            navbarOpen ? 'top-[-8px] -rotate-45' : ''
                                        }`}
                                    />
                                </button>

                                <nav
                                    id="navbarCollapse"
                                    className={`absolute right-0 z-30 w-[250px] rounded border-[.5px] bg-white border-body-color/50 py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                                        navbarOpen ? 'visible top-full opacity-100' : 'invisible top-[120%] opacity-0'
                                    }`}
                                >
                                    <ul className="block lg:flex lg:space-x-12">
                                        {menuItems.map((item: MenuItem) => (
                                            <li key={item.id} className="group relative">
                                                <Link
                                                    href={item.path}
                                                    className={`flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                                                >
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                            <div className="flex gap-4 items-center justify-end pr-16 lg:pr-0">
                                {session ? (
                                    <>
                                        <Button text="Create" onClick={() => router.push('/create')} />
                                        <Button onClick={() => signOut()} text="Logout" />
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={toggleModal} text="Login" />
                                        <Button onClick={() => router.push('/register')} text="Register" />
                                    </>
                                )}
                                <div className="flex gap-3 items-center">
                                    <ThemeToggler />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Include the login modal */}
            {isModalOpen && <LoginModal toggleModal={toggleModal} />}
        </div>
    );
}
