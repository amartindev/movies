"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className='bg-black text-white'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between sm:justify-start items-center h-16'>
                    {/* Logo */}
                    <div className='flex-shrink-0'>
                        <Link href='/'>
                            <Image
                                src='/Logo.png'
                                alt='Logo'
                                width={164}
                                height={42}
                            />
                        </Link>
                    </div>

                    {/* Navigation Items (Desktop) */}
                    <div className='hidden md:flex space-x-4 pl-8'>
                        <Link href='/' className='hover:text-gray-300'>
                            Popular
                        </Link>
                        <Link href='/favorites' className='hover:text-gray-300'>
                            Favorites
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className='md:hidden'>
                        <button
                            type='button'
                            className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                            aria-label='Main menu'
                            aria-expanded={isOpen ? true : false}
                            onClick={toggleMenu}
                        >
                            <svg
                                className='h-6 w-6'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden='true'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M4 6h16M4 12h16M4 18h16'
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Items */}
                {isOpen && (
                    <div className='md:hidden'>
                        <div className='space-y-1 px-2 pt-2 pb-3 text-center'>
                            <Link
                                href='/'
                                className='block text-base font-medium text-white hover:text-gray-300'
                            >
                                Popular
                            </Link>
                            <Link
                                href='/favorites'
                                className='block text-base font-medium text-white hover:text-gray-300'
                            >
                                Favorites
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
