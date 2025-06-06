'use client';
import { ArrowRight } from 'lucide-react';
import { FaTicketAlt } from 'react-icons/fa';
import CustomButton from './commonComponents/customButton';
import InfoCard from './commonComponents/infoCard';
import { Footer } from './commonComponents/footer';
import HeritageCard from './commonComponents/heritageCard';
import Header from './commonComponents/header';
// import { Footer } from '@/components/Footer'; 
// import Footer from './commonComponents/footer';
// import Footer from '@/components/Footer';

export default function Home() {

   type HeritageItem = {
  tag: string;
  title: string;
  description: string;
  location: string;
  time: string;
};

  const heritageItems: HeritageItem[] = [
  {
    tag: 'article',
    title: 'The Lost Temple of Varanasi',
    description: 'Discover the ancient temple hidden beneath the streets of Varanasi for centuries.',
    location: 'Varanasi, Uttar Pradesh',
    time: '8th Century CE',
  },
  {
    tag: 'documentary',
    title: 'Forgotten Scriptures of the Himalayas',
    description: 'Ancient texts discovered in remote Himalayan caves reveal lost spiritual knowledge.',
    location: 'Himalayan Region',
    time: '3rd Century BCE',
  },
  {
    tag: 'gallery',
    title: 'The Submerged Temples of Dwarka',
    description: 'Underwater archaeological discoveries off the coast of Gujarat reveal the ancient city.',
    location: 'Gulf of Khambhat, Gujarat',
    time: '1500 BCE',
  },
];
  return (
    <div className="bg-[#f9f5ef]">

      <Header/>
      {/* Section 1 */}
      <main className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl w-full">
          {/* Left Image */}
          <div className="flex flex-col items-center border-t-[6px] border-b-[5px] border-[#642B00] rounded-t-full rounded-b-md p-4 bg-[#fff1db]">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/guruji-BSNFQP4574Otvh4amuv2Mj8wytue4E.png"
              alt="Sadguru Riteshwar Ji Maharaj"
              width={400}
              height={400}
              className="rounded-lg"
            />
            <p className="mt-4 text-sm text-[#642B00] font-medium">
              Sadguru Riteshwar Ji Maharaj
            </p>
          </div>

          {/* Right Text */}
          <div className="text-center md:text-left w-full md:w-1/2">
            <h1 className="text-4xl font-semibold text-[#642B00]">
              Namaste <span className="italic font-normal">Dharma</span> Yatri !
            </h1>
            <p className="mt-4 text-[#9a5d31] text-sm">
              You didn't find Sanatani — Sanatani found you.
            </p>

            <div className="mt-6 flex justify-center md:justify-start">
              <CustomButton
                text="Begin your Journey"
                leftIcon={<FaTicketAlt size={16} />}
                rightIcon={<ArrowRight size={16} />}
                onClick={() => alert('Journey started!')}
                variant="primary"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Section 2 */}
      <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-[#fff1db]">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 max-w-6xl w-full">
          {/* Left Text */}
          <div className="text-center md:text-left w-full md:w-1/2">
            <h1 className="text-5xl font-medium text-[#642B00]">
              The Spiritual Gateway
            </h1>
            <p className="mt-8 text-[#9a5d31] text-lg">
              Sanatni serves as a bridge between ancient wisdom and modern seekers, preserving the timeless teachings of Sanatan Dharma in a digital age.
            </p>
            <p className="mt-6 text-[#9a5d31] text-lg">
              This platform is a sanctuary for spiritual growth, offering authentic resources to connect you with profound ancient insights.
            </p>

            <div className="mt-6 flex justify-center md:justify-start">
              <CustomButton
                text="Begin your Journey"
                leftIcon={<FaTicketAlt size={16} />}
                rightIcon={<ArrowRight size={16} />}
                onClick={() => alert('Journey started!')}
                variant="secondary"
              />
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tree-PDEDERvcZlyp1P0k4HeasZRRt4wgSK.png"
              alt="Tree"
              width={400}
              height={400}
            />
          </div>
        </div>
      </main>

      {/* Section 3 */}
      <section className="bg-[#fff1db] px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-medium text-[#642B00] text-center">
          Ancient Wisdom. Intelligent Tech.
        </h1>

        <div className="mt-16 flex flex-wrap justify-center gap-10 max-w-7xl mx-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <InfoCard
              key={i}
              imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-5OHlgCM1n4SlpJPUWIjeQwnUY7u7VJ.png"
              title="Sacred Books"
              description="Access a collection of spiritual texts and e-books"
              buttonText="Explore Books"
              onClick={() => alert('Explore Books clicked!')}
            />
          ))}
        </div>
      </section>


      {/* Section 4 */}

       <section className="bg-[#fff1db] py-12 px-6 md:px-20 flex flex-col md:flex-row items-center gap-12">
      
      {/* Left: Image */}
      <div className="flex-1 flex justify-center">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/soul-jwOUOlBPHtpm1WQ9WdXSQ3j0RhbMLl.png" // Replace with your own if needed
          alt="Meditation Illustration"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>

      {/* Right: Content */}
      <div className="flex-1 max-w-xl">
        <h2 className="text-4xl font-semibold text-[#642B00] leading-tight">
          Divine Personalised<br />
          Meditation
        </h2>

        <div className="inline-block mt-4 px-4 py-1 border border-[#642B00] text-[#642B00] rounded-full text-sm font-medium">
          Limited Sacred Experience
        </div>

        <p className="mt-6 text-[#9a5d31] text-base leading-relaxed">
          Unlock the ancient secrets of inner peace with meditation practices tailored uniquely to your spiritual journey.
        </p>

        <p className="mt-4 text-[#9a5d31] text-base leading-relaxed">
          Our exclusive meditation experience connects you with divine consciousness through personalized guidance that adapts to your spiritual needs. Thousands have already transformed their lives with these sacred practices passed down through generations.
        </p>

        {/* Testimonial box */}
        <div className="mt-6 border-2 border-[#642B00] bg-[#fff7ec] p-4 rounded-md italic text-[#642B00] relative">
          <span className="absolute top-0 left-2 text-2xl">❝</span>
          <p className="mt-4">
            The personalized meditation revealed aspects of my consciousness I never knew existed. This is unlike any meditation experience available elsewhere.
          </p>
          <p className="mt-4 text-right not-italic">—Rajesh M</p>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <CustomButton
            text="BEGIN YOUR SACRED JOURNEY"
            variant="secondary"
            onClick={() => alert('Journey Started!')}
          />
        </div>
      </div>
    </section>


    {/* Section 5 */}

    <div className="flex-1 flex justify-center bg-[#fff1db]">
        <img
         src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/line-cropped-LTlByEuoNSQznfxz6QLh834ALAdODK.png" // Replace with your own if needed
          alt="Meditation Illustration"
          width={700}
          height={500}
          className="object-contain"
        />
      </div>


       {/* Section 6 */}
       <section className="bg-[#fff1db] px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-medium text-[#642B00] text-center ">
          Begin Your Spiritual Journey Today
        </h1>
        <p className='mt-14 text-[#642B00] text-center text-xl'>Join our community and explore the teachings of Sadguru Riteshwarji Maharaj</p>

        <div className="mt-16 flex flex-wrap justify-center gap-10 max-w-7xl mx-auto">
           <div className="mt-8">
          <CustomButton
            text="BEGIN YOUR SACRED JOURNEY"
            variant="secondary"
            onClick={() => alert('Journey Started!')}
          />
        </div>
         <div className="mt-8">
          <CustomButton
            text="BEGIN YOUR SACRED JOURNEY"
            variant="secondary"
            onClick={() => alert('Journey Started!')}
          />
        </div>
        </div>
      </section>

       {/* Section 7 */}

       <section className="py-20 bg-[#fff1db] px-6 text-center">
      <h2 className="text-3xl font-bold text-[#7B3F00] mb-2">Lost Heritage</h2>
      <p className="text-[#8b4a00] mb-10">
        Discover forgotten temples, ruins, and ancient scriptures from our rich cultural past
      </p>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 justify-center max-w-6xl mx-auto">
        {heritageItems.map((item, i) => (
          <HeritageCard key={i} item={item} />
        ))}
      </div>
      <div className="mt-10">
        <button className="flex items-center gap-2 border border-yellow-400 px-6 py-3 rounded-full text-[#7B3F00] font-medium hover:bg-yellow-50 transition">
          Explore All Lost Heritage <ArrowRight size={16} />
        </button>
      </div>
    </section>
        <Footer />
    </div>
  );
}
