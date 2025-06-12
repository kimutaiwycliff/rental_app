'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const CallToActionSection = () => {
  return (
    <div className="relative py-24">
      <Image
        src="/landing-call-to-action.jpg"
        alt="Rentiful Search Section Background"
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0  bg-opacity-60"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-4xl xl:max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 md:mr-10">
            <h2 className="text-2xl font-bold dark:text-black ">
              Find Your Dream Rental Property
            </h2>
          </div>
          <div className='flex flex-col'>
            <p className="text-white mb-3">
              Discover a wide range of rental properties in your desired
              location.
            </p>
            <div className="flex justify-center md:justify-start gap-4">

              <Link
                href="/sign-up"
                className="inline-block text-white  rounded-lg px-6 py-3 font-semibold hover:bg-secondary-600"
                scroll={false}
              >
                <Button
                  variant="secondary"
                  className=" rounded-lg"
                >
                  Sign Up
                </Button>
              </Link>
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}

                className=" rounded-lg px-6 mt-3 w-[250px] font-semibold bg-red-200 hover:bg-red-300"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
