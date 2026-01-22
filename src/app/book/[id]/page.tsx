'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { searchResults } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Video, Building, Home, HelpCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { format, addDays } from 'date-fns';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';


const generateAvailableTimes = () => {
    const times = [];
    for (let i = 0; i < 7; i++) { // for the next 7 days
        const date = addDays(new Date(), i);
        const dayTimes = ['09:00', '10:00', '10:20', '10:40', '12:40', '13:40', '14:00', '14:20', '14:40', '15:00', '15:20', '15:40'];
        // Shuffle and slice to make it look random
        const shuffled = dayTimes.sort(() => 0.5 - Math.random());
        times.push({
            date: date,
            slots: shuffled.slice(0, Math.floor(Math.random() * 8) + 5)
        });
    }
    return times;
}

const availableSlotsByDay = generateAvailableTimes();


export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [step, setStep] = useState(1);
  const [consultationType, setConsultationType] = useState<string | undefined>();
  const [visitReason, setVisitReason] = useState('');
  const [urgency, setUrgency] = useState('routine');
  const [isFlexible, setIsFlexible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{date: Date, time: string} | undefined>();
  const [visibleSlots, setVisibleSlots] = useState(6);

  const doctor = searchResults.find(r => r.type === 'doctor' && r.id === id);
  const getImage = (avatarId: string | undefined) => avatarId ? PlaceHolderImages.find(p => p.id === avatarId) : undefined;
  
  if (!doctor) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
            <Card className="p-8">
                <h1 className="text-2xl font-bold">Doctor not found</h1>
                <p className="text-muted-foreground">The profile you are looking for does not exist.</p>
                <Button onClick={() => router.push('/search')} className="mt-4">Back to Search</Button>
            </Card>
      </div>
    );
  }

  const doctorImage = getImage(doctor.avatarId);
  const offersHomeVisit = !!doctor.homeVisit;
  
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Book your appointment online</h1>
                <p className="text-muted-foreground">Please provide the following information</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <main className="md:col-span-2">
                    <Card>
                        <CardContent className="p-8">
                            <Button variant="ghost" onClick={handlePreviousStep} className="mb-6 text-muted-foreground">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                {step === 1 ? 'Back to profile' : 'Previous step'}
                            </Button>
                            
                            {step === 1 && (
                                <>
                                    <div className="space-y-2 mb-6">
                                        <h2 className="text-xl font-semibold">Have you ever consulted this healthcare professional before?</h2>
                                        <p className="text-muted-foreground text-sm">This helps us tailor your booking experience.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <Button onClick={() => setStep(2)} className="w-full">Yes, I have</Button>
                                        <Button onClick={() => setStep(2)} className="w-full" variant="outline">No, this is my first time</Button>
                                    </div>
                                </>
                            )}
                            
                            {step === 2 && (
                                <>
                                    <div className="space-y-2 mb-6">
                                        <h2 className="text-xl font-semibold">Appointment Details</h2>
                                        <p className="text-muted-foreground text-sm">Provide details about your visit.</p>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <Label className="font-semibold">Appointment Type</Label>
                                            <RadioGroup value={consultationType} onValueChange={setConsultationType} className="mt-2 space-y-3">
                                                <Label htmlFor="video" className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-muted/50 has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:border-primary">
                                                    <RadioGroupItem value="video" id="video" className="mr-4" />
                                                    <Video className="mr-2 h-5 w-5 text-primary" />
                                                    <span className="font-medium">Video Consultation</span>
                                                </Label>
                                                <Label htmlFor="office" className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-muted/50 has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:border-primary">
                                                    <RadioGroupItem value="office" id="office" className="mr-4" />
                                                    <Building className="mr-2 h-5 w-5 text-primary" />
                                                    <span className="font-medium">In-Office Visit</span>
                                                </Label>
                                                <Label htmlFor="home" className={`flex items-center p-4 border rounded-md ${!offersHomeVisit ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-muted/50 has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:border-primary'}`}>
                                                    <RadioGroupItem value="home" id="home" className="mr-4" disabled={!offersHomeVisit} />
                                                    <Home className="mr-2 h-5 w-5 text-primary" />
                                                    <span className="font-medium">Home Visit</span>
                                                </Label>
                                            </RadioGroup>
                                        </div>
                                        <div>
                                            <Label htmlFor="visit-reason" className="font-semibold">Reason for Visit (Chief Complaint)</Label>
                                            <Textarea id="visit-reason" value={visitReason} onChange={(e) => setVisitReason(e.target.value)} placeholder="e.g., Fever and headache for the last 3 days." className="mt-2" />
                                        </div>
                                        <div>
                                            <Label className="font-semibold">How urgent is this visit?</Label>
                                             <RadioGroup value={urgency} onValueChange={setUrgency} className="flex flex-wrap items-center pt-2 gap-4">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="routine" id="routine" />
                                                    <Label htmlFor="routine" className="font-normal">Routine</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="urgent" id="urgent" />
                                                    <Label htmlFor="urgent" className="font-normal">Urgent</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="emergency" id="emergency" />
                                                    <Label htmlFor="emergency" className="font-normal">Emergency</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <Button onClick={() => setStep(3)} disabled={!consultationType || !visitReason}>Next</Button>
                                    </div>
                                </>
                            )}

                             {step === 3 && (
                                <>
                                    <div className="space-y-2 mb-6">
                                        <h2 className="text-xl font-semibold">Choose the consultation date</h2>
                                    </div>
                                    <Accordion type="single" collapsible defaultValue={format(availableSlotsByDay[0].date, 'yyyy-MM-dd')} className="w-full space-y-2">
                                        {availableSlotsByDay.map(({ date, slots }) => (
                                            <AccordionItem key={format(date, 'yyyy-MM-dd')} value={format(date, 'yyyy-MM-dd')} className="border rounded-lg bg-white">
                                                <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base">
                                                    {format(date, 'EEEE, MMMM d, yyyy')}
                                                </AccordionTrigger>
                                                <AccordionContent className="p-4 pt-0 border-t">
                                                    <div className="flex items-center gap-2 text-primary mb-4 pt-4">
                                                        <Video className="w-4 h-4"/>
                                                        <span className="font-semibold text-sm">Show {slots.length} other availabilities</span>
                                                    </div>
                                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                                        {slots.slice(0, visibleSlots).map(time => (
                                                            <Button 
                                                                key={time} 
                                                                variant={selectedSlot?.date.toDateString() === date.toDateString() && selectedSlot?.time === time ? "default" : "outline"}
                                                                onClick={() => setSelectedSlot({ date, time })}
                                                            >
                                                                {time}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                    {slots.length > visibleSlots && (
                                                        <Button variant="link" className="w-full mt-4 text-primary" onClick={() => setVisibleSlots(slots.length)}>
                                                            SEE MORE
                                                        </Button>
                                                    )}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>

                                    <div className="flex items-center space-x-2 mt-6">
                                        <Checkbox id="flexible-timing" checked={isFlexible} onCheckedChange={(checked) => setIsFlexible(!!checked)} />
                                        <Label htmlFor="flexible-timing" className="font-normal">My timing is flexible</Label>
                                    </div>

                                    <div className="mt-8 flex justify-end">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button disabled={!selectedSlot}>Confirm Appointment</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle className="text-center text-xl font-bold">Read this before making an appointment</AlertDialogTitle>
                                                </AlertDialogHeader>
                                                <div className="space-y-4 py-4">
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Reason for consultation:</p>
                                                        <p className="font-semibold">{visitReason || 'Not specified'}</p>
                                                    </div>
                                                    <Separator />
                                                    <div>
                                                        <p className="font-bold">2 instructions:</p>
                                                        <ul className="mt-2 space-y-3 text-sm text-muted-foreground list-disc list-outside pl-4">
                                                            <li>If you are unable to attend the appointment, please cancel it either from the reminder SMS that will be sent to you.</li>
                                                            <li>If the appointment is in less than 4 hours, then contact the practitioner directly by phone.</li>
                                                            <li>If you have ENT symptoms or a cough, please wear a mask during the consultation.</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <AlertDialogFooter>
                                                    <AlertDialogAction
                                                        className="w-full"
                                                        onClick={() => {
                                                            if (selectedSlot) {
                                                                const params = new URLSearchParams();
                                                                params.set('date', selectedSlot.date.toISOString());
                                                                params.set('time', selectedSlot.time);
                                                                if (consultationType) {
                                                                    params.set('consultationType', consultationType);
                                                                }
                                                                if (visitReason) {
                                                                    params.set('visitReason', visitReason);
                                                                }
                                                                params.set('urgency', urgency);
                                                                router.push(`/book/${id}/confirm?${params.toString()}`);
                                                            }
                                                        }}
                                                    >I HAVE READ AND AGREE TO THE INSTRUCTIONS.</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </main>
                <aside>
                    <Card>
                        <CardContent className="p-4 flex items-center gap-3">
                             <Avatar className="w-12 h-12">
                                <AvatarImage src={doctorImage?.imageUrl} alt={doctor.name} data-ai-hint={doctorImage?.imageHint} />
                                <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{doctor.name}</p>
                                <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                            </div>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    </div>
  );
}
