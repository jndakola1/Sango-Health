'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import PublicLayout from './public-layout'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#E0F2FE"/>
        <path d="M23 11H9C8.44772 11 8 11.4477 8 12V24C8 24.5523 8.44772 25 9 25H23C23.5523 25 24 24.5523 24 24V12C24 11.4477 23.5523 11 23 11Z" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 9V13" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 9V13" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 17H24" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Easy Appointments',
    description: 'Book and manage your appointments with ease, anytime, anywhere.',
  },
  {
    icon: (
       <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#E0E7FF"/>
        <path d="M25 13L21 16L25 19V13Z" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 11H8C7.44772 11 7 11.4477 7 12V20C7 20.5523 7.44772 21 8 21H18C18.5523 21 19 20.5523 19 20V12C19 11.4477 18.5523 11 18 11Z" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Teleconsultation',
    description: 'Connect with your doctors via secure video calls from home.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#FEE2E2"/>
        <path d="M21 12H21.01" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 12H16.01" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 12H11.01" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 21V12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8H20C21.0609 8 22.0783 8.42143 22.8284 9.17157C23.5786 9.92172 24 10.9391 24 12V25L20 21H12C10.9391 21 9.92172 20.5786 9.17157 19.8284C8.42143 19.0783 8 18.0609 8 17V17" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Secure Messaging',
    description: 'Communicate securely with your healthcare providers.',
  },
  {
    icon: (
       <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#D1FAE5"/>
        <path d="M19 11L13 17" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 17H19.01" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 21C14.2091 21 16 19.2091 16 17C16 14.7909 14.2091 13 12 13C9.79086 13 8 14.7909 8 17C8 19.2091 9.79086 21 12 21Z" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 17C24 20.866 20.866 24 17 24C16.1947 24 15.4249 23.8647 14.714 23.618" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Prescription Management',
    description: 'Access and manage your prescriptions in one place.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#F3E8FF"/>
        <path d="M19 14.5C19 15.8807 17.8807 17 16.5 17C15.1193 17 14 15.8807 14 14.5C14 13.1193 15.1193 12 16.5 12C17.8807 12 19 13.1193 19 14.5Z" stroke="#A855F7" strokeWidth="1.5"/>
        <path d="M16 17V23" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12.5 8H20.5" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 23H22" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 14C9 14 10 12 11.5 12C13 12 14 14.5 14 14.5" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 14.5C22 14.5 21.5 12 20 12C18.5 12 18 14.5 18 14.5" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'AI Diagnosis',
    description: 'Get intelligent diagnostic suggestions based on your symptoms.',
  },
  {
    icon: (
       <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#FEF3C7"/>
        <path d="M16 25V18" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 14H18.5C17.8333 11.5 17 8 16 8C15 8 14.1667 11.5 13.5 14H8L16 25L24 14Z" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Health Records',
    description: 'Keep your medical history secure and easily accessible.',
  },
];

const testimonials = [
    {
      name: 'Sarah L.',
      avatarId: 'testimonial-1',
      title: 'Life-changing experience',
      quote: "Amana Health made managing my appointments so much easier. The teleconsultation feature is a game-changer for my busy schedule. Highly recommended!",
    },
    {
      name: 'Michael B.',
      avatarId: 'testimonial-2',
      title: 'Excellent Care',
      quote: 'The doctors are top-notch and the platform is incredibly user-friendly. I feel much more in control of my health now. Thank you, Amana Health!',
    },
    {
      name: 'Jessica P.',
      avatarId: 'testimonial-3',
      title: 'Seamless and efficient',
      quote: 'From booking to billing, everything is seamless. The AI diagnosis tool gave me valuable insights before I even saw my doctor. Five stars!',
    },
     {
      name: 'David R.',
      avatarId: 'testimonial-4',
      title: 'The future of healthcare',
      quote: "I'm impressed by the technology and the human touch. Secure messaging with my doctor has been fantastic for follow-up questions.",
    },
  ];

  const promoSlides = [
    {
      id: 'promo-1',
      title: 'Partner with Amana Health',
      description: 'Expand your reach and join our growing network of healthcare providers. Together, we can deliver better care.',
      imageId: 'promo-partner',
      buttonText: 'Become a Partner',
    },
    {
      id: 'promo-2',
      title: 'Join Our Professional Team',
      description: 'Are you a passionate healthcare professional? Discover exciting career opportunities and make a difference with us.',
      imageId: 'promo-professionals',
      buttonText: 'View Careers',
    },
    {
      id: 'promo-3',
      title: 'Annual Health & Wellness Fair',
      description: 'Join us for a day of free health screenings, expert talks, and wellness activities for the whole family.',
      imageId: 'promo-event',
      buttonText: 'Learn More',
    },
    {
        id: 'promo-4',
        title: 'Invest in the Future of Health',
        description: 'We are looking for partners to help us innovate and expand our services. Invest in a healthier future.',
        imageId: 'promo-invest',
        buttonText: 'Contact Investor Relations',
      },
  ];

export default function HomePage() {
  const getImage = (avatarId: string) => PlaceHolderImages.find(p => p.id === avatarId);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${searchQuery}`);
  }

  return (
    <PublicLayout>
      <div className="flex flex-col">

        {/* Hero Section */}
        <section className="relative bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-sky-50 -z-10"></div>
            <div className="container mx-auto relative z-10">
                <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tighter">
                    Your Health, <span className="text-primary">Reimagined</span>.
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Amana Health provides a seamless and modern healthcare experience. Access top doctors, manage appointments, and take control of your health journey.
                </p>
                <div className="mt-10 max-w-2xl mx-auto">
                  <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2 bg-white p-2 rounded-lg shadow-lg border">
                    <div className="relative flex-grow w-full">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input 
                        type="text" 
                        placeholder="Search for doctors, clinics, hospitals..." 
                        className="pl-10 text-base h-12 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full sm:w-auto h-12">
                      <Search className="sm:hidden mr-2 h-5 w-5" />
                      Search
                    </Button>
                  </form>
                </div>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Comprehensive Healthcare at Your Fingertips</h2>
              <p className="mt-4 text-lg text-muted-foreground">Everything you need for your health, all in one platform.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-center mb-4">
                        {feature.icon}
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
              <p className="mt-4 text-lg text-muted-foreground">A simple, three-step process to get started.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" fill="#DBEAFE"/>
                    <path d="M26.25 15H13.75C13.087 15 12.5 15.587 12.5 16.25V26.25C12.5 26.913 13.087 27.5 13.75 27.5H26.25C26.913 27.5 27.5 26.913 27.5 26.25V16.25C27.5 15.587 26.913 15 26.25 15Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 18.75V23.75" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22.5 21.25H17.5" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.5 12.5L16.25 8.75H23.75L27.5 12.5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
                <p className="text-muted-foreground">Sign up in minutes to create your secure patient profile.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 mb-4">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="20" fill="#E0E7FF"/>
                      <path d="M20 20C22.7614 20 25 17.7614 25 15C25 12.2386 22.7614 10 20 10C17.2386 10 15 12.2386 15 15C15 17.7614 17.2386 20 20 20Z" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M26.8125 27.5C26.8125 24.525 23.7375 22.5 20 22.5C16.2625 22.5 13.1875 24.525 13.1875 27.5" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Find Your Doctor</h3>
                <p className="text-muted-foreground">Browse our network of specialists and book an appointment.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-sky-100 mb-4">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" fill="#E0F2F9"/>
                    <path d="M20 10L20 30" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23.75 13.75L20 10L16.25 13.75" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 20H30" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.75 23.75L10 20L13.75 16.25" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Start Your Journey</h3>
                <p className="text-muted-foreground">Connect with your doctor and manage your health online.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Promo Carousel Section */}
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Join Us in Shaping the Future of Health</h2>
                <p className="mt-4 text-lg text-muted-foreground">Opportunities for partners, professionals, and the community.</p>
                </div>
                <Carousel
                    plugins={[
                        Autoplay({
                        delay: 4000,
                        }),
                    ]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                    >
                    <CarouselContent>
                        {promoSlides.map((slide) => (
                        <CarouselItem key={slide.id} className="md:basis-1/2 lg:basis-1/3">
                           <div className="p-1 h-full">
                             <Card className="overflow-hidden h-full flex flex-col">
                                <Image
                                    src={getImage(slide.imageId)?.imageUrl || 'https://picsum.photos/seed/1/400/250'}
                                    alt={slide.title}
                                    data-ai-hint={getImage(slide.imageId)?.imageHint}
                                    width={400}
                                    height={250}
                                    className="w-full h-48 object-cover"
                                />
                                <CardHeader>
                                    <CardTitle>{slide.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-sm text-muted-foreground">{slide.description}</p>
                                </CardContent>
                                <div className="p-6 pt-0">
                                    <Button className="w-full">{slide.buttonText}</Button>
                                </div>
                             </Card>
                           </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex" />
                    <CarouselNext className="hidden sm:flex" />
                </Carousel>
            </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight">What Our Patients Say</h2>
                <p className="mt-4 text-lg text-muted-foreground">Real stories from people who trust Amana Health.</p>
                </div>
                <Carousel
                    plugins={[
                        Autoplay({
                        delay: 5000,
                        }),
                    ]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                    >
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card className="h-full flex flex-col">
                                    <CardHeader>
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={getImage(testimonial.avatarId)?.imageUrl} alt={testimonial.name} data-ai-hint={getImage(testimonial.avatarId)?.imageHint}/>
                                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <CardTitle className="text-base">{testimonial.name}</CardTitle>
                                                <div className="flex text-yellow-500">
                                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <p className="text-sm text-muted-foreground italic">&quot;{testimonial.quote}&quot;</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex" />
                    <CarouselNext className="hidden sm:flex" />
                </Carousel>
            </div>
        </section>


      </div>
    </PublicLayout>
  );
}
