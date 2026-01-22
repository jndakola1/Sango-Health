'use client';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreVertical } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { patients } from '@/lib/data';
import Link from 'next/link';

export default function ProviderDashboardPage() {
    const getImage = (avatarId: string) => PlaceHolderImages.find(p => p.id === avatarId);

    const recentPatients = patients.slice(0, 4);

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <Card className="relative overflow-hidden bg-gradient-to-r from-primary/10 to-primary/20">
                <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-primary-dark dark:text-primary-foreground">Welcome back, Dr. Jonathan!</h2>
                        <p className="text-muted-foreground">Here's a summary of your activity today.</p>
                    </div>
                    <Button className="mt-4 sm:mt-0" asChild>
                        <Link href="/provider/patients/new">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Patient
                        </Link>
                    </Button>
                </CardContent>
            </Card>
            <main>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,254</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">2 upcoming</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">5</div>
                            <p className="text-xs text-muted-foreground">From 3 patients</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Open Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-muted-foreground">3 high priority</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Patients</CardTitle>
                            <CardDescription>A list of your most recently seen patients.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead className="hidden sm:table-cell">Reason for Visit</TableHead>
                                    <TableHead className="hidden md:table-cell">Last Visit</TableHead>
                                    <TableHead className="text-right"></TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {recentPatients.map((patient) => (
                                    <TableRow key={patient.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={getImage(patient.avatarId)?.imageUrl} alt={patient.name} data-ai-hint={getImage(patient.avatarId)?.imageHint}/>
                                                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{patient.name}</p>
                                                <p className="text-sm text-muted-foreground hidden sm:block">{patient.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge variant="outline">{patient.reason}</Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{patient.lastVisit}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
