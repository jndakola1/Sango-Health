'use client';

import { Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { searchResults } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Stethoscope } from 'lucide-react';
import { format } from 'date-fns';

function getReasonText(consultationType?: string | null, visitReason?: string | null) {
    if (visitReason) return visitReason;

    switch (consultationType) {
        case 'video':
            return 'Video Consultation';
        case 'home':
            return 'Home Visit';
        case 'office':
            return 'In-Office Visit';
        default:
            return 'General medical consultation';
    }
}

function ConfirmBookingPageComponent() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    const id = params.id as string;
    const date = searchParams.get('date');
    const time = searchParams.get('time');
    const consultationType = searchParams.get('consultationType');
    const visitReason = searchParams.get('visitReason');

    const doctor = searchResults.find(r => r.type === 'doctor' && r.id === id);
    const getImage = (avatarId: string | undefined) => avatarId ? PlaceHolderImages.find(p => p.id === avatarId) : undefined;
    
    if (!doctor || !date || !time) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
                <Card className="p-8">
                    <h1 className="text-2xl font-bold">Booking information missing</h1>
                    <p className="text-muted-foreground">We couldn't find the details for this appointment.</p>
                    <Button onClick={() => router.push('/search')} className="mt-4">Back to Search</Button>
                </Card>
            </div>
        );
    }

    const doctorImage = getImage(doctor.avatarId);
    const appointmentDate = new Date(date);
    const reasonText = getReasonText(consultationType, visitReason);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Your appointment is not yet confirmed.</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <main className="md:col-span-2 space-y-6">
                        <Card>
                            <CardContent className="p-6 text-center">
                                <h2 className="font-semibold mb-4">New to Amana Health?</h2>
                                <Button className="w-full" onClick={() => router.push(`/signup?${searchParams.toString()}`)}>REGISTER</Button>
                            </CardContent>
                        </Card>
                        <Card>
                             <CardContent className="p-6 text-center">
                                <h2 className="font-semibold mb-4">I already have an Amana Health account</h2>
                                <Button variant="outline" className="w-full bg-yellow-400 hover:bg-yellow-500 border-yellow-400 text-black" onClick={() => router.push(`/login?${searchParams.toString()}`)}>LOG IN</Button>
                            </CardContent>
                        </Card>
                    </main>
                    <aside>
                        <Card className="overflow-hidden">
                            <div className="bg-slate-800 text-white p-3 flex items-center justify-between text-sm font-semibold rounded-t-md">
                                <span className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {format(appointmentDate, 'EEEE, MMMM d')}</span>
                                <span className="flex items-center gap-2"><Clock className="w-4 h-4"/> {time}</span>
                            </div>
                            <div className="p-4 bg-card text-card-foreground space-y-4 rounded-b-md">
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={doctorImage?.imageUrl} alt={doctor.name} data-ai-hint={doctorImage?.imageHint} />
                                        <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold">{doctor.name}</p>
                                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                                        <p className="text-xs text-muted-foreground mt-1">Contracted sector 1</p>
                                    </div>
                                </div>
                                <div className="border-t pt-4">
                                    <h3 className="font-bold mb-2">Your appointment in detail</h3>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-slate-500 shrink-0"/> <span>70 Rue de la Tuilerie, 13290 Aix-en-Provence</span></p>
                                        <p className="flex items-start gap-2"><Stethoscope className="w-4 h-4 mt-0.5 text-slate-500 shrink-0"/> <span>{reasonText}</span></p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    );
}


export default function ConfirmBookingPage() {
    return (
        <Suspense>
            <ConfirmBookingPageComponent />
        </Suspense>
    )
}
