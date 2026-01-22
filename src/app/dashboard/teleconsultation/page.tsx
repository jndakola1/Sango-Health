
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Video, PhoneOff, Mic, VideoOff, Settings } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PageHeader } from '@/components/page-header';

export default function TeleconsultationPage() {
    const doctorAvatar = PlaceHolderImages.find(p => p.id === "doctor-1");

  return (
    <div className="p-4 sm:p-6">
      <PageHeader
        title="Teleconsultation"
        description="Connect with your doctor from the comfort of your home."
      />
      <main className="pt-6">
        <Card>
          <CardHeader>
              <CardTitle>Upcoming Call: Dr. Sarah Connor</CardTitle>
              <CardDescription>Today at 2:00 PM</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center text-white relative">
                  <p>Video feed will appear here</p>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <Avatar>
                          <AvatarImage src={doctorAvatar?.imageUrl} alt="Dr. Sarah Connor" data-ai-hint={doctorAvatar?.imageHint} />
                          <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-white">Dr. Sarah Connor</span>
                  </div>
              </div>
          </CardContent>
          <CardFooter className="flex-col sm:flex-row gap-2 justify-center">
              <Button size="lg">
                  <Video className="mr-2 h-5 w-5"/> Start Call
              </Button>
              <div className="flex gap-2">
                  <Button variant="outline" size="icon"><Mic className="h-5 w-5"/></Button>
                  <Button variant="outline" size="icon"><VideoOff className="h-5 w-5"/></Button>
                  <Button variant="destructive" size="icon"><PhoneOff className="h-5 w-5"/></Button>
                  <Button variant="outline" size="icon"><Settings className="h-5 w-5"/></Button>
              </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
