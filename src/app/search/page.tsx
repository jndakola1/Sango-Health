

'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, MapPin, Star, Hospital, Stethoscope } from 'lucide-react';
import { searchResults, services, SearchResult } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PublicLayout from '../public-layout';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

function SearchPageContents() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('all');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [availability, setAvailability] = useState('any');
  const [searchType, setSearchType] = useState('all');

  const getImage = (avatarId: string) => PlaceHolderImages.find(p => p.id === avatarId);

  const specialties = useMemo(() => {
    const allSpecialties = searchResults.filter(r => r.type === 'doctor' && r.specialty).map(d => d.specialty!);
    return ['all', ...Array.from(new Set(allSpecialties))];
  }, []);

  const handleServiceChange = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };
  
  const filteredResults = useMemo(() => {
    return searchResults.filter(result => {
      const nameMatch = result.name.toLowerCase().includes(searchQuery.toLowerCase());
      const specialtyQueryMatch = result.specialty?.toLowerCase().includes(searchQuery.toLowerCase());
      const queryMatch = nameMatch || specialtyQueryMatch;

      const typeMatch = searchType === 'all' || 
                        (searchType === 'doctors' && result.type === 'doctor') ||
                        (searchType === 'facilities' && (result.type === 'clinic' || result.type === 'hospital'));

      const specialtyMatch = specialty === 'all' || result.specialty === specialty;
      
      const servicesMatch = selectedServices.length === 0 || selectedServices.every(serviceId => result.services.includes(serviceId));

      let finalSpecialtyMatch = true;
      if (searchType === 'doctors') {
        finalSpecialtyMatch = specialtyMatch;
      }


      return queryMatch && typeMatch && finalSpecialtyMatch && servicesMatch;
    });
  }, [searchQuery, searchType, specialty, selectedServices]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already happening in real-time
  }

  const renderResultCard = (result: SearchResult) => {
    switch (result.type) {
        case 'doctor':
            return (
                <div className="flex-1 p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Avatar className="w-20 h-20 border-4 border-background hidden sm:block">
                            <AvatarImage src={getImage(result.avatarId)?.imageUrl} alt={result.name} data-ai-hint={getImage(result.avatarId)?.imageHint}/>
                            <AvatarFallback>{result.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className='flex-1'>
                            <h3 className="text-xl font-bold">{result.name}</h3>
                            <p className="text-primary">{result.specialty}</p>
                            <div className="flex items-center gap-1 text-yellow-500 mt-2">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                <span className="text-muted-foreground text-sm ml-1">(123 reviews)</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground my-4 space-y-1">
                        <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" />123 Health St, Wellness City</p>
                        <p>Next available: Tomorrow</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button asChild>
                          <Link href={`/doctor/${result.id}`}>Book Appointment</Link>
                        </Button>
                        <Button variant="outline" asChild>
                           <Link href={`/doctor/${result.id}`}>View Profile</Link>
                        </Button>
                    </div>
                </div>
            );
        case 'clinic':
        case 'hospital':
            return (
                 <div className="flex-1 p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                         <Avatar className="w-20 h-20 border-4 border-background hidden sm:block">
                            <AvatarImage src={getImage(result.avatarId)?.imageUrl} alt={result.name} data-ai-hint={getImage(result.avatarId)?.imageHint}/>
                            <AvatarFallback><Hospital /></AvatarFallback>
                        </Avatar>
                        <div className='flex-1'>
                            <h3 className="text-xl font-bold">{result.name}</h3>
                            <p className="text-primary capitalize">{result.type}</p>
                             <div className="flex items-center gap-1 text-yellow-500 mt-2">
                                {[...Array(4)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                <Star className="w-4 h-4" />
                                <span className="text-muted-foreground text-sm ml-1">(89 reviews)</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground my-4 space-y-1">
                        <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" />{result.address}</p>
                        <p>{result.services.includes('7') ? 'Emergency Services Available' : 'Standard Hours Apply'}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button>View Details</Button>
                    </div>
                </div>
            )
        default:
            return null;
    }
  }

  return (
    <PublicLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="shadow-lg mb-8">
                <CardContent className="p-4">
                     <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div className="relative md:col-span-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            type="text" 
                            placeholder="Search by name, specialty, clinic..." 
                            className="pl-10 text-base h-12"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        </div>
                        <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            type="text" 
                            placeholder="Location" 
                            className="pl-10 text-base h-12"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        </div>
                        <Button type="submit" size="lg" className="w-full h-12">
                            Search
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="lg:col-span-1">
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Filters</h3>
                            <div className="space-y-6">
                                <div>
                                    <Label className="font-semibold">Category</Label>
                                    <Tabs value={searchType} onValueChange={setSearchType} className="w-full mt-2">
                                        <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="all">All</TabsTrigger>
                                            <TabsTrigger value="doctors"><Stethoscope className="w-4 h-4"/></TabsTrigger>
                                            <TabsTrigger value="facilities"><Hospital className="w-4 h-4"/></TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </div>
                                <Separator />
                                {searchType !== 'facilities' && (
                                    <div>
                                        <Label className="font-semibold">Specialty</Label>
                                        <Select value={specialty} onValueChange={setSpecialty} disabled={searchType === 'facilities'}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a specialty" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {specialties.map(s => (
                                                    <SelectItem key={s} value={s}>{s === 'all' ? 'All Specialties' : s}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                                
                                <Separator />
                                <div>
                                    <Label className="font-semibold">Services</Label>
                                    <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                                        {services.map(service => (
                                            <div key={service.id} className="flex items-center space-x-2">
                                                <Checkbox 
                                                    id={`service-${service.id}`}
                                                    checked={selectedServices.includes(service.id)}
                                                    onCheckedChange={() => handleServiceChange(service.id)}
                                                />
                                                <Label htmlFor={`service-${service.id}`} className="font-normal">{service.name}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Separator />
                                <div>
                                    <Label className="font-semibold">Availability</Label>
                                    <Select value={availability} onValueChange={setAvailability}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select availability" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="any">Anytime</SelectItem>
                                            <SelectItem value="today">Today</SelectItem>
                                            <SelectItem value="tomorrow">Tomorrow</SelectItem>
                                            <SelectItem value="this-week">This Week</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </aside>

                <main className="lg:col-span-3">
                    <h2 className="text-2xl font-bold mb-4">{filteredResults.length} results found</h2>
                    <div className="space-y-6">
                        {filteredResults.length > 0 ? (
                            filteredResults.map(result => (
                                <Card key={result.id} className="overflow-hidden">
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="flex-shrink-0 sm:w-48 sm:h-auto h-48 w-full relative">
                                            <Image
                                                src={getImage(result.avatarId)?.imageUrl || ''}
                                                alt={result.name}
                                                data-ai-hint={getImage(result.avatarId)?.imageHint}
                                                fill
                                                objectFit="cover"
                                            />
                                        </div>
                                        {renderResultCard(result)}
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <Card>
                                <CardContent className="p-10 text-center">
                                    <h3 className="text-xl font-semibold">No results found</h3>
                                    <p className="text-muted-foreground">Try adjusting your search filters.</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </main>
            </div>
        </div>
    </PublicLayout>
  );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchPageContents />
        </Suspense>
    )
}
