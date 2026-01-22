
'use client';

import { useParams } from 'next/navigation';
import { searchResults } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import PublicLayout from '@/app/public-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MapPin, GraduationCap, Languages, Building, Phone, Clock, Home, FileText, Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const mockReviews = [
    {
        name: 'Alex J.',
        rating: 5,
        comment: "Dr. Isyana is an exceptional neurologist. She was attentive, thorough, and explained everything clearly. I felt very comfortable under her care.",
        date: "2 weeks ago"
    },
    {
        name: 'Samantha P.',
        rating: 5,
        comment: "I had a great experience. The booking process was easy, and the consultation was very insightful. Highly recommend!",
        date: "1 month ago"
    }
]

const mockFaqs = [
    {
        question: "What should I bring to my first appointment?",
        answer: "Please bring a photo ID, your insurance card, and a list of any current medications you are taking. Any previous medical records relevant to your visit are also helpful."
    },
    {
        question: "How can I cancel or reschedule my appointment?",
        answer: "You can cancel or reschedule your appointment through the Amana Health dashboard up to 24 hours before your scheduled time. For last-minute changes, please call our office directly."
    },
    {
        question: "Do you offer teleconsultation services?",
        answer: "Yes, we offer secure teleconsultation for many types of appointments. You can select this option when booking your appointment online."
    },
    {
        question: "What is your policy on prescription refills?",
        answer: "Prescription refills can be requested through the patient portal. Please allow 48-72 hours for your request to be processed. For urgent requests, please contact our office."
    }
];

export default function DoctorProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const doctor = searchResults.find(r => r.type === 'doctor' && r.id === id);
  const getImage = (avatarId: string | undefined) => avatarId ? PlaceHolderImages.find(p => p.id === avatarId) : undefined;
  
  if (!doctor) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl font-bold">Doctor not found</h1>
          <p className="text-muted-foreground">The profile you are looking for does not exist.</p>
          <Button asChild className="mt-4">
            <Link href="/search">Back to Search</Link>
          </Button>
        </div>
      </PublicLayout>
    );
  }

  const doctorImage = getImage(doctor.avatarId);

  return (
    <PublicLayout>
      <div className="bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="md:col-span-2 space-y-8">
                    {/* Doctor Header Card */}
                    <Card>
                        <CardContent className="p-6 flex flex-col sm:flex-row gap-6">
                            <Avatar className="w-28 h-28 border-4 border-background">
                                <AvatarImage src={doctorImage?.imageUrl} alt={doctor.name} data-ai-hint={doctorImage?.imageHint} />
                                <AvatarFallback className="text-3xl">{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold">{doctor.name}</h1>
                                <p className="text-xl text-primary mt-1">{doctor.specialty}</p>
                                <div className="flex items-center gap-1 text-yellow-500 mt-2">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                                    <span className="text-muted-foreground text-sm ml-2">(123 reviews)</span>
                                </div>
                                <p className="text-muted-foreground mt-2 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    Wellness City, USA
                                </p>
                                <Button size="lg" className="mt-4" asChild>
                                  <Link href={`/book/${id}`}>Book Appointment</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* About Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>About {doctor.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                {doctor.name} is a board-certified {doctor.specialty} with over 15 years of experience in the field. She is dedicated to providing compassionate and comprehensive care to her patients. Her approach involves a thorough diagnosis followed by a personalized treatment plan tailored to each individual's needs. She believes in empowering her patients with knowledge about their condition to foster a collaborative and successful healthcare journey.
                            </p>
                        </CardContent>
                    </Card>
                    
                    {/* Reviews Section */}
                    <Card>
                         <CardHeader>
                            <CardTitle>Patient Reviews</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {mockReviews.map((review, index) =>(
                                <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <p className="font-semibold">{review.name}</p>
                                            <p className="text-xs text-muted-foreground">{review.date}</p>
                                        </div>
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                            {[...Array(5 - review.rating)].map((_, i) => <Star key={i} className="w-4 h-4" />)}
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground text-sm">{review.comment}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* FAQ Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Frequently Asked Questions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {mockFaqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                                        <AccordionContent>
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="md:col-span-1 space-y-6">
                     {doctor.consultationFees && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Consultation Fees</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Adults</span>
                                    <span className="font-semibold">${doctor.consultationFees.adult}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Children</span>
                                    <span className="font-semibold">${doctor.consultationFees.child}</span>
                                </div>
                            </CardContent>
                        </Card>
                     )}
                     <Card>
                        <CardHeader>
                            <CardTitle>Professional Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex items-center gap-3">
                                <GraduationCap className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="font-semibold">Harvard Medical School</p>
                                    <p className="text-muted-foreground">MD, Neurology</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Languages className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="font-semibold">Languages</p>
                                    <p className="text-muted-foreground">English, Spanish</p>
                                </div>
                            </div>
                        </CardContent>
                     </Card>
                      {doctor.workPhoneNumber && doctor.openingHours && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact & Availability</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="font-semibold">Work Phone</p>
                                        <p className="text-muted-foreground">{doctor.workPhoneNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-primary mt-1" />
                                    <div>
                                        <p className="font-semibold">Opening Hours</p>
                                        <ul className="text-muted-foreground space-y-1">
                                            {doctor.openingHours.map(oh => (
                                                <li key={oh.day} className="flex justify-between gap-4">
                                                    <span>{oh.day}</span>
                                                    <span className="text-right">{oh.hours}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                {doctor.homeVisit !== undefined && (
                                    <div className="flex items-center gap-3">
                                        <Home className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="font-semibold">Home Visits</p>
                                            <p className="text-muted-foreground">{doctor.homeVisit ? "Available" : "Not Available"}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                      )}
                     <Card>
                        <CardHeader>
                            <CardTitle>Practice Locations</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                             <div className="flex items-start gap-3">
                                <Building className="w-5 h-5 text-primary mt-1" />
                                <div>
                                    <p className="font-semibold">City General Hospital</p>
                                    <p className="text-muted-foreground">456 Health Ave, Wellness City</p>
                                    <Button variant="link" className="p-0 h-auto text-primary">Get Directions</Button>
                                </div>
                            </div>
                             <div className="flex items-start gap-3">
                                <Building className="w-5 h-5 text-primary mt-1" />
                                <div>
                                    <p className="font-semibold">Downtown Medical Clinic</p>
                                    <p className="text-muted-foreground">789 Cure Ln, Wellness City</p>
                                     <Button variant="link" className="p-0 h-auto text-primary">Get Directions</Button>
                                </div>
                            </div>
                        </CardContent>
                     </Card>
                     {doctor.legal && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Legal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="font-semibold">Registration Number</p>
                                        <p className="text-muted-foreground">{doctor.legal.registrationNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="font-semibold">Privacy</p>
                                        <Button variant="link" asChild className="p-0 h-auto text-primary">
                                            <Link href={doctor.legal.privacyPolicyUrl}>View Privacy Policy</Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                     )}
                </div>
            </div>
        </div>
      </div>
    </PublicLayout>
  );
}
