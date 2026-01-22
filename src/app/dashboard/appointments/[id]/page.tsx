'use client';

import { useParams } from 'next/navigation';
import { appointments, searchResults } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Video, Building, FileText, Plus, Download, Share2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AppointmentDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const [formattedDate, setFormattedDate] = useState('');

    const appointment = appointments.find(a => a.id.toString() === id);
    const doctor = appointment ? searchResults.find(d => d.id === appointment.doctorId) : undefined;

    const getImage = (avatarId: string | undefined) => avatarId ? PlaceHolderImages.find(p => p.id === avatarId) : undefined;
    
    const doctorImage = getImage(doctor?.avatarId);
    const mapImage = getImage('map-placeholder');
    
    useEffect(() => {
        if (appointment) {
            const appointmentDate = new Date(appointment.date);
            // The timezone difference between server and client can cause hydration errors
            // when using toLocaleDateString. By formatting in UTC we can avoid this.
             const dateString = new Date(appointmentDate.getUTCFullYear(), appointmentDate.getUTCMonth(), appointmentDate.getUTCDate())
                .toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
            setFormattedDate(dateString);
        }
    }, [appointment]);

    if (!appointment || !doctor) {
        return (
            <div className="p-4 sm:p-6">
                <PageHeader title="Appointment not found" />
                <Card>
                    <CardContent className="p-10 text-center">
                        <p className="text-muted-foreground">The appointment you are looking for does not exist.</p>
                        <Button asChild className="mt-4">
                            <Link href="/dashboard/appointments">Back to Appointments</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    const mockDocuments = [
        { name: 'Blood Test Results.pdf', date: '2024-07-10', size: '5.2 MB' },
        { name: 'X-Ray_Scan.jpg', date: '2024-07-10', size: '2.1 MB' },
    ];

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <PageHeader title="Appointment Details" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <main className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src={doctorImage?.imageUrl} alt={doctor.name} data-ai-hint={doctorImage?.imageHint} />
                                    <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-xl font-bold">{doctor.name}</h2>
                                    <p className="text-muted-foreground">{doctor.specialty}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="border rounded-lg p-4 space-y-3">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="font-semibold">Date & Time</p>
                                        <p className="text-sm text-muted-foreground">{formattedDate ? `${formattedDate} at ${appointment.time}`: 'Loading date...'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {appointment.type === 'teleconsultation' ? <Video className="w-5 h-5 text-primary"/> : <Building className="w-5 h-5 text-primary" />}
                                    <div>
                                        <p className="font-semibold">Type of consultation</p>
                                        <p className="text-sm text-muted-foreground capitalize">{appointment.type}</p>
                                    </div>
                                </div>
                                 <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Address</p>
                                        <p className="text-sm text-muted-foreground">70 Rue de la Tuilerie, 13290 Aix-en-Provence</p>
                                    </div>
                                </div>
                            </div>
                            
                            {mapImage && (
                                <div className="rounded-lg overflow-hidden aspect-video relative">
                                    <Image src={mapImage.imageUrl} alt="Map" data-ai-hint={mapImage.imageHint} fill className="object-cover" />
                                </div>
                            )}

                            <div className="flex gap-2">
                                <Button className="w-full">Reschedule</Button>
                                <Button variant="outline" className="w-full">Cancel appointment</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Get prepared for your consultation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-outside pl-5 space-y-2 text-muted-foreground text-sm">
                                <li>Please make sure to bring your ID and insurance card.</li>
                                <li>If you have any recent medical records or test results, please bring them with you.</li>
                                <li>Make a list of any questions or concerns you want to discuss with the doctor.</li>
                                <li>Arrive 10-15 minutes early to complete any necessary paperwork.</li>
                            </ul>
                        </CardContent>
                    </Card>

                </main>
                <aside className="lg:col-span-1">
                     <Card>
                        <CardHeader>
                            <CardTitle>Documents for your consultation</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {mockDocuments.map((doc, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                                    <FileText className="h-8 w-8 text-primary" />
                                    <div className="flex-1 overflow-hidden">
                                        <p className="font-medium truncate text-sm">{doc.name}</p>
                                        <p className="text-xs text-muted-foreground">{doc.date} - {doc.size}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            ))}
                             <Button variant="outline" className="w-full">
                                <Plus className="mr-2 h-4 w-4" />
                                Add document
                            </Button>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
