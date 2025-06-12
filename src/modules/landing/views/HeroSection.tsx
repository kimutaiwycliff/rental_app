'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <div className="relative h-screen w-screen">
      <motion.div className="absolute inset-0">
        <Image
          src="/landing-splash.jpg"
          alt="Rentiful Rental Platform Hero Section"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </motion.div>
      <div className="absolute inset-0 bg-opacity-60"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Start your journey to finding the perfect place to call home
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Explore our wide range of rental properties tailored to fit your
            lifestyle and needs!
          </p>
          <div className="flex justify-center">
            <Input
              type="text"
              placeholder="Search by city, neighborhood or address"
              className="w-full max-w-lg rounded-none rounded-l-xl border  h-12 placeholder:text-primary/95 focus:placeholder:text-primary"
            />
            <Button className="rounded-none rounded-r-xl border-none h-12 bg-red-400">
              Search
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
