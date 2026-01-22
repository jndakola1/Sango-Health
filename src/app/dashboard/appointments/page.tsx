'use client';

import { PageHeader } from "@/components/page-header";
import { appointments } from "@/lib/data";
import { searchResults } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Video, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AppointmentsPage() {
    const upcomingAppointments = appointments.filter(a => a.status === 'upcoming').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const pastAppointments = appointments.filter(a => a.status !== 'upcoming').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const getDoctor = (id: string) => searchResults.find(d => d.id === id);
    const getImage = (avatarId: string) => PlaceHolderImages.find(p => p.id === avatarId);

    const AppointmentCard = ({ appointment }: { appointment: typeof appointments[0] }) => {
        const doctor = getDoctor(appointment.doctorId);
        if (!doctor) return null;
        const doctorImage = getImage(doctor.avatarId);

        return (
            <Card>
                <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0">
                        {doctorImage && (
                            <Image
                                src={doctorImage.imageUrl}
                                alt={doctor.name}
                                data-ai-hint={doctorImage.imageHint}
                                width={100}
                                height={100}
                                className="rounded-lg object-cover aspect-square"
                            />
                        )}
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg">{doctor.name}</h3>
                                <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                            </div>
                            <Badge variant={appointment.status === 'upcoming' ? 'secondary' : 'outline'} className={appointment.status === 'upcoming' ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300" : ""}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-4 flex-wrap">
                            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(appointment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at {appointment.time}</span>
                            <span className="flex items-center gap-1.5 capitalize">
                                {appointment.type === 'teleconsultation' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                                {appointment.type}
                            </span>
                        </div>
                        {appointment.status === 'upcoming' && (
                             <div className="flex gap-2 pt-2">
                                <Button size="sm" asChild><Link href={`/dashboard/appointments/${appointment.id}`}>View Details</Link></Button>
                                <Button size="sm" variant="outline">Reschedule</Button>
                                <Button size="sm" variant="outline">Cancel</Button>
                            </div>
                        )}
                         {appointment.status === 'past' && (
                             <div className="flex gap-2 pt-2">
                                <Button size="sm">Book Again</Button>
                                <Button size="sm" variant="outline" asChild>
                                    <Link href={`/dashboard/appointments/${appointment.id}`}>View Details</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <PageHeader
                title="My Appointments"
                description="Review your upcoming and past appointments."
            />
            <div className="space-y-8">
                <div>
                    <h2 className="text-xl font-bold mb-4">Upcoming</h2>
                    <div className="space-y-4">
                        {upcomingAppointments.length > 0 ? (
                            upcomingAppointments.map(app => <AppointmentCard key={app.id} appointment={app} />)
                        ) : (
                            <Card className="p-10 text-center border-dashed">
                                <p className="text-muted-foreground">You have no upcoming appointments.</p>
                                <Button asChild className="mt-4">
                                    <Link href="/search">Book an Appointment</Link>
                                </Button>
                            </Card>
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-4">Past & Cancelled</h2>
                    <div className="space-y-4">
                        {pastAppointments.length > 0 ? (
                             pastAppointments.map(app => <AppointmentCard key={app.id} appointment={app} />)
                        ) : (
                             <Card className="p-10 text-center border-dashed">
                                <p className="text-muted-foreground">You have no past appointments.</p>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
