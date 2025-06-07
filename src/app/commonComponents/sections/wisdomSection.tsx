'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import InfoCard from '../infoCard';

type CardItem = {
  title: string;
  description: string;
  icon: string;
  link: string;
};

export default function WisdomTechSection() {
  const [cards, setCards] = useState<CardItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://13.61.196.239/api/v1/homepage/cards');
        setCards(response.data.cards || []);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

//     const getIconUrl = (iconName: string) => {
    
//     return `https://your-storage-url.com/${iconName}.png`;
//   };

  return (
    <section className="bg-[#fff1db] px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-medium text-[#642B00] text-center">
        Ancient Wisdom. Intelligent Tech.
      </h1>

      <div className="mt-16 flex flex-wrap justify-center gap-10 max-w-7xl mx-auto">
        {cards.map((card, i) => (
          <InfoCard
            key={i}
            imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-5OHlgCM1n4SlpJPUWIjeQwnUY7u7VJ.png" // Replace with dynamic icon if needed
            title={card.title}
            description={card.description}
            buttonText={`Explore ${card.title.split(' ')[0]}`}
            onClick={() => router.push(card.link)}
          />
        ))}
      </div>
    </section>
  );
}
