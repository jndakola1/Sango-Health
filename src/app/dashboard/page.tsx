'use client';

import { Suspense, useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Bell,
  Sparkles,
  Stethoscope,
  Pill,
  Calendar,
  ChevronRight,
  Search,
} from 'lucide-react';
import { appointments, searchResults, type Appointment, profiles } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';


const dashboardSlides = [
    {
        id: 'dash-promo-1',
        title: 'Personal Care, A Modern Touch',
        description: 'Consult with board-certified doctors anytime, anywhere.',
        buttonText: 'Find a Specialist',
        href: '/search',
        imageId: 'hero-stethoscope',
    },
    {
        id: 'dash-promo-2',
        title: 'Intelligent Diagnosis',
        description: 'Get AI-powered insights on your symptoms for a better understanding of your health.',
        buttonText: 'Try AI Diagnosis',
        href: '/dashboard/diagnosis',
        imageId: 'ai-diagnosis-banner',
    },
    {
        id: 'dash-promo-3',
        title: 'Securely Message Your Doctor',
        description: 'Have a question? Get answers securely and conveniently from your care team.',
        buttonText: 'Go to Messages',
        href: '/dashboard/messaging',
        imageId: 'secure-messaging-banner',
    }
];

function DashboardPageContent() {
  const [upcomingAppointment, setUpcomingAppointment] = useState<
    Appointment | undefined
  >();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const today = new Date();
    const upcoming = appointments
      .filter((a) => a.status === 'upcoming' && new Date(a.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (upcoming.length > 0) {
      setUpcomingAppointment(upcoming[0]);
    }
  }, []);

  useEffect(() => {
    if (searchParams.get('confirmed')) {
        const date = searchParams.get('date');
        const time = searchParams.get('time');
        if (date && time) {
            toast({
                title: "Appointment Confirmed!",
                description: `Your appointment is booked for ${new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at ${time}.`,
                duration: 8000,
            })
        }
    }
  }, [searchParams, toast]);

  const getDoctor = (id: string) => searchResults.find((d) => d.id === id);
  const getImage = (avatarId: string) =>
    PlaceHolderImages.find((p) => p.id === avatarId);

  const currentUser = profiles.find((p) => p.isCurrentUser);

  const doctor = upcomingAppointment
    ? getDoctor(upcomingAppointment.doctorId)
    : null;
  const doctorImage = doctor ? getImage(doctor.avatarId) : null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${searchQuery}`);
  }

  return (
    <div className="bg-slate-50 dark:bg-background min-h-screen md:p-6">
      <div className="max-w-md mx-auto md:max-w-none">
        <div className="p-4 sm:p-6 space-y-6">
          {/* Header */}
          <header className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={getImage('user-avatar')?.imageUrl}
                    data-ai-hint={getImage('user-avatar')?.imageHint}
                  />
                  <AvatarFallback>{currentUser?.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">Welcome Back,</p>
                  <p className="font-bold">{currentUser?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  className="rounded-full bg-accent dark:bg-muted p-2 h-auto"
                  asChild
                >
                  <Link href="/dashboard/diagnosis">
                    <Sparkles className="w-5 h-5 text-primary mr-1" />
                    <span className="text-sm font-semibold">Ask AmanaAI</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-accent dark:bg-muted relative"
                >
                  <Bell />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] p-0 justify-center text-xs"
                  >
                    99+
                  </Badge>
                </Button>
              </div>
            </div>
             <form onSubmit={handleSearch}>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search for doctors, clinics, hospitals..."
                        className="pl-11 text-base h-12 w-full rounded-full bg-accent dark:bg-muted border-transparent focus:border-primary focus:ring-primary"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </form>
          </header>

          {/* Hero Carousel */}
          <Carousel
            plugins={[
                Autoplay({
                delay: 5000,
                }),
            ]}
            opts={{
                loop: true,
            }}
            className="w-full"
            >
            <CarouselContent>
                {dashboardSlides.map((slide) => {
                    const slideImage = getImage(slide.imageId);
                    return (
                        <CarouselItem key={slide.id}>
                            <div className="relative rounded-2xl overflow-hidden p-6 text-white flex flex-col justify-between h-56">
                                {slideImage && (
                                <Image
                                    src={slideImage.imageUrl}
                                    alt={slide.title}
                                    data-ai-hint={slideImage.imageHint}
                                    fill
                                    className="object-cover -z-10 brightness-50"
                                />
                                )}
                                <div className="relative z-10">
                                    <h2 className="text-2xl font-bold">{slide.title}</h2>
                                    <p className="text-sm mt-2 max-w-xs text-white/80">
                                        {slide.description}
                                    </p>
                                </div>
                                <div className="relative z-10">
                                    <Button asChild>
                                        <Link href={slide.href}>{slide.buttonText}</Link>
                                    </Button>
                                </div>
                            </div>
                        </CarouselItem>
                    )
                })}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-20 hidden sm:flex" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-20 hidden sm:flex" />
          </Carousel>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/search" className="block">
              <Card className="p-4 flex items-center justify-center text-center gap-3 hover:bg-muted transition-colors h-full">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                  <Stethoscope className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-semibold text-sm">Consultation</p>
              </Card>
            </Link>
            <Link href="/dashboard/pharmacy" className="block">
              <Card className="p-4 flex items-center justify-center text-center gap-3 hover:bg-muted transition-colors h-full">
                <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-full">
                  <Pill className="w-6 h-6 text-red-600" />
                </div>
                <p className="font-semibold text-sm">Pharmacy Shop</p>
              </Card>
            </Link>
          </div>

          {/* Upcoming Schedule */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">Upcoming Schedule</h2>
              <Link
                href="/dashboard/appointments"
                className="text-sm text-primary font-semibold flex items-center gap-1"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {upcomingAppointment && doctor ? (
              <Card className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Meet & Consult with doctor</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                  >
                    Upcoming
                  </Badge>
                </div>
                <div className="flex gap-4 items-center">
                  {doctorImage && (
                    <Image
                      src={doctorImage.imageUrl}
                      alt={doctor.name}
                      data-ai-hint={doctorImage.imageHint}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover aspect-square"
                    />
                  )}
                  <div className="flex-1 space-y-1">
                    <h3 className="font-bold text-lg">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {doctor.specialty}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(upcomingAppointment.date).toLocaleDateString(
                        'en-US',
                        {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        }
                      )}{' '}
                      | {upcomingAppointment.time}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Calendar className="w-4 h-4" />
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href={`/dashboard/appointments/${upcomingAppointment.id}`}>View Detail</Link>
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-10 text-center border-dashed">
                <p className="text-muted-foreground">
                  No upcoming appointments.
                </p>
              </Card>
            )}
          </div>
        </div>
        <div className="pb-16 md:hidden"></div>
      </div>
    </div>
  );
}


export default function DashboardPage() {
    return (
        <Suspense>
            <DashboardPageContent />
        </Suspense>
    );
}
