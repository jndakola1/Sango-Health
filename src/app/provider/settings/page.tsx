
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';


const initialWorkingHours = {
    monday: { enabled: true, start: '09:00', end: '17:00' },
    tuesday: { enabled: true, start: '09:00', end: '17:00' },
    wednesday: { enabled: true, start: '09:00', end: '17:00' },
    thursday: { enabled: true, start: '09:00', end: '17:00' },
    friday: { enabled: true, start: '09:00', end: '17:00' },
    saturday: { enabled: false, start: '10:00', end: '14:00' },
    sunday: { enabled: false, start: '10:00', end: '14:00' },
};

type DayKey = keyof typeof initialWorkingHours;

export default function ProviderSettingsPage() {
    const [workingHours, setWorkingHours] = useState(initialWorkingHours);
    const [holidays, setHolidays] = useState<Date[]>([]);
    const [newHoliday, setNewHoliday] = useState<Date | undefined>();

    const handleWorkingHoursChange = (day: DayKey, field: 'enabled' | 'start' | 'end', value: boolean | string) => {
        setWorkingHours(prev => ({
            ...prev,
            [day]: { ...prev[day], [field]: value }
        }));
    };

    const addHoliday = () => {
        if(newHoliday && !holidays.find(h => h.getTime() === newHoliday.getTime())) {
            setHolidays(prev => [...prev, newHoliday].sort((a,b) => a.getTime() - b.getTime()));
            setNewHoliday(undefined);
        }
    }

    const removeHoliday = (date: Date) => {
        setHolidays(prev => prev.filter(h => h.getTime() !== date.getTime()));
    }

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <PageHeader
                title="Availability Settings"
                description="Manage your working hours, holidays, and special availabilities."
            />
            <main className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Working Hours</CardTitle>
                        <CardDescription>Set your weekly recurring availability.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {Object.entries(workingHours).map(([day, { enabled, start, end }]) => (
                            <div key={day} className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-md bg-muted/50">
                                <div className="flex items-center gap-3 w-full sm:w-48">
                                    <Checkbox
                                        id={day}
                                        checked={enabled}
                                        onCheckedChange={(checked) => handleWorkingHoursChange(day as DayKey, 'enabled', !!checked)}
                                    />
                                    <Label htmlFor={day} className="capitalize font-medium">{day}</Label>
                                </div>
                                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                                    <Input
                                        type="time"
                                        value={start}
                                        onChange={(e) => handleWorkingHoursChange(day as DayKey, 'start', e.target.value)}
                                        disabled={!enabled}
                                    />
                                    <Input
                                        type="time"
                                        value={end}
                                        onChange={(e) => handleWorkingHoursChange(day as DayKey, 'end', e.target.value)}
                                        disabled={!enabled}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Holidays & Absences</CardTitle>
                        <CardDescription>Add specific dates you will be unavailable.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-end gap-2">
                             <div className="grid gap-1.5 flex-1">
                                <Label>Select a date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="justify-start text-left font-normal">
                                            {newHoliday ? format(newHoliday, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={newHoliday}
                                            onSelect={setNewHoliday}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                             </div>
                            <Button onClick={addHoliday}><PlusCircle className="mr-2 h-4 w-4"/> Add Holiday</Button>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            {holidays.length > 0 ? (
                                holidays.map(holiday => (
                                    <div key={holiday.toString()} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                                        <p>{format(holiday, 'PPP')}</p>
                                        <Button variant="ghost" size="icon" onClick={() => removeHoliday(holiday)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">No holidays added.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
                
                <div className="flex justify-end">
                    <Button size="lg">Save Changes</Button>
                </div>
            </main>
        </div>
    );
}
