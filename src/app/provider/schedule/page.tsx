
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { appointments, patients } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  List,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Settings,
  CheckCircle2,
  XCircle,
  Clock,
  Loader,
  Coffee,
  MoreHorizontal,
} from 'lucide-react';
import {
  format,
  startOfWeek,
  addDays,
  subDays,
  eachDayOfInterval,
  isToday,
} from 'date-fns';
import { cn } from '@/lib/utils';
import type { Appointment, Patient } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const PROVIDER_ID = 'doc-1';

const providerAppointments = appointments.filter(
  (app) => app.doctorId === PROVIDER_ID
);

const HOUR_HEIGHT = 6; // h-24 -> 6rem -> 96px
const START_HOUR = 8;
const END_HOUR = 18;

const statusStyles = {
    Scheduled: {
        borderColor: 'border-blue-500',
        bgColor: 'bg-blue-50 dark:bg-blue-950',
        textColor: 'text-blue-700 dark:text-blue-400',
        icon: Clock,
    },
    Completed: {
        borderColor: 'border-green-500',
        bgColor: 'bg-green-50 dark:bg-green-950',
        textColor: 'text-green-700 dark:text-green-400',
        icon: CheckCircle2,
    },
    Canceled: {
        borderColor: 'border-red-500',
        bgColor: 'bg-red-50 dark:bg-red-950',
        textColor: 'text-red-700 dark:text-red-400',
        icon: XCircle,
    },
    Waiting: {
        borderColor: 'border-yellow-500',
        bgColor: 'bg-yellow-50 dark:bg-yellow-950',
        textColor: 'text-yellow-700 dark:text-yellow-400',
        icon: Loader,
    },
    Break: {
        borderColor: 'border-gray-400',
        bgColor: 'bg-gray-100 dark:bg-gray-800',
        textColor: 'text-gray-600 dark:text-gray-400',
        icon: Coffee,
    }
}


const AppointmentCard = ({
  appointment,
  patient,
}: {
  appointment: Appointment;
  patient?: Patient;
}) => {
    const [hour, minute] = appointment.time.split(':').map(Number);
    const top = ((hour - START_HOUR) * 60 + minute) * (HOUR_HEIGHT / 60);
    const height = appointment.duration * (HOUR_HEIGHT / 60);

    const style = statusStyles[appointment.status];
    const Icon = style.icon;

    if (appointment.status === 'Break') {
        return (
             <div
                style={{ top: `${top}rem`, height: `${height}rem` }}
                className={cn(
                    'absolute left-3 right-0 rounded-lg p-2 flex items-center justify-center',
                    style.bgColor
                )}
            >
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Icon className="h-4 w-4" />
                    <span>{appointment.reason}</span>
                </div>
            </div>
        )
    }

    return (
        <div
            style={{ top: `${top}rem`, height: `${height}rem` }}
            className={cn('absolute left-3 right-0 rounded-lg p-2 text-xs', style.bgColor, style.borderColor, 'border-l-4')}
        >
            <p className="font-semibold text-card-foreground">{patient?.name || 'Unknown Patient'}</p>
            <p className="text-muted-foreground">{appointment.reason}</p>
            <div className={cn('absolute bottom-1 right-1 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs', style.textColor)}>
                <Icon className="h-3 w-3" />
                <span>{appointment.status}</span>
            </div>
        </div>
    );
};

export default function ProviderSchedulePage() {
    const [view, setView] = useState('calendar'); // 'calendar' or 'list'
    const [currentDate, setCurrentDate] = useState(new Date());
    const [now, setNow] = useState<Date | null>(null);

    const getImage = (avatarId: string | undefined) => avatarId ? PlaceHolderImages.find(p => p.id === avatarId) : undefined;

    useEffect(() => {
        setNow(new Date());
        const timer = setInterval(() => {
            setNow(new Date());
        }, 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);


    const week = useMemo(() => {
        const start = startOfWeek(currentDate, { weekStartsOn: 1 });
        return eachDayOfInterval({ start, end: addDays(start, 4) }); // Mon-Fri
    }, [currentDate]);

    const appointmentsByDay = useMemo(() => {
        const grouped: { [key: string]: (Appointment & { patient?: Patient })[] } = {};
        week.forEach(day => {
            const dayKey = format(day, 'yyyy-MM-dd');
            grouped[dayKey] = providerAppointments
                .filter(app => app.date === dayKey)
                .sort((a,b) => a.time.localeCompare(b.time))
                .map(app => ({
                    ...app,
                    patient: patients.find(p => p.id === app.patientId)
                }));
        });
        return grouped;
    }, [week]);

    const hours = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => i + START_HOUR);

    const nowPosition = now ? ((now.getHours() - START_HOUR) * 60 + now.getMinutes()) * (HOUR_HEIGHT / 60) : 0;

  return (
    <div className="p-4 sm:p-6 space-y-4 flex flex-col h-[calc(100vh-2rem)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <Button variant={view === 'list' ? 'secondary' : 'outline'} onClick={() => setView('list')}><List className="mr-2 h-4 w-4" /> List</Button>
                <Button variant={view === 'calendar' ? 'secondary' : 'outline'} onClick={() => setView('calendar')}><CalendarIcon className="mr-2 h-4 w-4" /> Calendar</Button>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setCurrentDate(subDays(currentDate, 7))}><ChevronLeft /></Button>
                <span className="font-semibold text-lg">{format(currentDate, 'MMMM yyyy')}</span>
                <Button variant="ghost" size="icon" onClick={() => setCurrentDate(addDays(currentDate, 7))}><ChevronRight /></Button>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/provider/settings">
                        <Settings />
                    </Link>
                </Button>
            </div>
        </div>

        {view === 'calendar' ? (
             <div className="flex-1 grid grid-cols-[auto,1fr] overflow-auto border rounded-lg">
                <div className="w-16 text-right pr-2">
                    {hours.map(hour => (
                        <div key={hour} style={{ height: `${HOUR_HEIGHT}rem` }} className="relative -top-3">
                            <span className="text-xs text-muted-foreground">{format(new Date(0,0,0,hour), 'ha')}</span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-5 flex-1">
                    {week.map(day => (
                        <div key={day.toString()} className="border-l relative">
                            <div className="text-center py-2 border-b sticky top-0 bg-background z-10">
                                <p className="text-xs text-muted-foreground">{format(day, 'EEE')}</p>
                                <p className={cn("text-lg font-semibold", isToday(day) && "text-primary")}>{format(day, 'd')}</p>
                            </div>
                            <div className="relative">
                                {/* Grid Lines */}
                                {hours.map(hour => (
                                    <div key={hour} style={{ height: `${HOUR_HEIGHT}rem` }} className="border-b"></div>
                                ))}

                                {/* Appointments */}
                                {(appointmentsByDay[format(day, 'yyyy-MM-dd')] || []).map(app => (
                                    <AppointmentCard key={app.id} appointment={app} patient={app.patient} />
                                ))}

                                {/* Current Time Indicator */}
                                {now && isToday(day) && nowPosition > 0 && nowPosition < (END_HOUR - START_HOUR + 1) * HOUR_HEIGHT && (
                                    <div className="absolute w-full" style={{ top: `${nowPosition}rem`}}>
                                        <div className="flex items-center">
                                            <div className="text-red-500 text-xs font-medium whitespace-nowrap">{now ? format(now, 'HH:mm') : ''}</div>
                                            <div className="w-full border-t border-red-500 ml-1"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <div className="space-y-6 flex-1 overflow-auto p-1">
                {week.map((day) => {
                    const dayKey = format(day, 'yyyy-MM-dd');
                    const dailyAppointments = appointmentsByDay[dayKey] || [];
                    return (
                        <div key={dayKey}>
                            <h2 className="font-semibold text-lg mb-2 sticky top-0 bg-background py-1 px-2">
                                {format(day, 'EEEE, d MMMM')}
                            </h2>
                            {dailyAppointments.length > 0 ? (
                                <div className="space-y-3">
                                    {dailyAppointments.map((app) => {
                                        const style = statusStyles[app.status];
                                        const Icon = style.icon;

                                        if (app.status === 'Break') {
                                            return (
                                                <Card key={app.id} className="bg-muted/50">
                                                    <CardContent className="p-3 flex items-center gap-4">
                                                        <div className="w-20 text-center">
                                                            <p className="font-semibold">{app.time}</p>
                                                        </div>
                                                        <div className="flex-1 flex items-center gap-2 text-muted-foreground">
                                                            <Icon className="h-5 w-5" />
                                                            <span>{app.reason}</span>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )
                                        }
                                        
                                        const patientImage = app.patient ? getImage(app.patient.avatarId) : undefined;

                                        return (
                                            <Card key={app.id}>
                                                <CardContent className="p-3 flex items-center gap-4">
                                                    <div className="w-20 text-center">
                                                        <p className="font-semibold text-primary">{app.time}</p>
                                                        <p className="text-xs text-muted-foreground">{app.duration} min</p>
                                                    </div>
                                                    <div className="flex-1 flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage src={patientImage?.imageUrl} alt={app.patient?.name} data-ai-hint={patientImage?.imageHint}/>
                                                            <AvatarFallback>{app.patient?.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-semibold">{app.patient?.name}</p>
                                                            <p className="text-sm text-muted-foreground">{app.reason}</p>
                                                        </div>
                                                    </div>
                                                    <div className={cn("flex items-center gap-1 text-sm font-medium", style.textColor)}>
                                                        <Icon className="h-4 w-4" />
                                                        <span>{app.status}</span>
                                                    </div>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            ) : (
                                <Card className="border-dashed">
                                    <CardContent className="p-4 text-center text-muted-foreground">
                                        No appointments for this day.
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )
                })}
            </div>
        )}
    </div>
  );
}
