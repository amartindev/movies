'use client';

import { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
}

export default function Categories({
  onCategoryChange,
  onSearch,
}: {
  onCategoryChange: (categoryId: number | null) => void;
  onSearch: (query: string) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en-US', {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
          },
        });
        const data = await response.json();
        setCategories(data.genres);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value === 'all' ? null : Number(event.target.value);
    setSelectedCategory(categoryId);
    onCategoryChange(categoryId);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <aside className="md:col-span-1 bg-foreground p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded bg-gray-950 text-white"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-background text-white py-2 rounded hover:bg-blackground"
        >
          Search
        </button>
      </form>
      <h3 className="text-lg font-bold mt-6 text-white">Genres</h3>
      <label htmlFor="category-select" className="sr-only">
        Select a Genre
      </label>
      <select
        id="category-select"
        value={selectedCategory || 'all'}
        onChange={handleCategoryChange}
        className="w-full p-2  rounded mt-2 bg-gray-950 text-white"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </aside>
  );
}
