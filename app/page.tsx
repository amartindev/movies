'use client';

import { useState } from 'react';
import Categories from '@/components/Categories';
import Hero from '@/components/Hero';
import Movies from '@/components/Movies';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(null);
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
  };

  return (
    <>
      <Hero />

      <main className="container mx-auto p-4 md:grid grid-cols-1 md:grid-cols-4 gap-4 sm:grid-cols-1 sm:block sm:p-4">
        <Categories
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
        />

        <Movies query={searchQuery} category={selectedCategory} />
      </main>
    </>
  );
}
