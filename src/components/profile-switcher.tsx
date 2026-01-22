'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, ChevronDown, UserPlus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { profiles } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function ProfileSwitcher() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const currentUser = profiles.find(p => p.isCurrentUser);
  const getImage = (avatarId?: string) => PlaceHolderImages.find(p => p.id === avatarId);


  const content = (
    <div className="p-4 pt-0">
        <ul className="space-y-2">
            {profiles.map(profile => (
                 <li key={profile.id}>
                    <Button variant="ghost" className="w-full justify-start h-auto p-3">
                        <div className="flex items-center gap-3 w-full">
                            <Avatar>
                                <AvatarImage src={getImage(profile.avatarId)?.imageUrl} alt={profile.name} data-ai-hint={getImage(profile.avatarId)?.imageHint}/>
                                <AvatarFallback className="bg-primary/20 text-primary font-semibold">{profile.initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-left">
                                <p className="font-semibold">{profile.name} {profile.isCurrentUser && '(me)'}</p>
                            </div>
                            {profile.isCurrentUser && <Check className="w-5 h-5 text-primary" />}
                        </div>
                    </Button>
                </li>
            ))}
        </ul>
        <div className="mt-4 border-t pt-4">
             <Button variant="ghost" className="w-full justify-start h-auto p-3">
                <UserPlus className="w-5 h-5 mr-3 text-primary"/>
                <span className="font-semibold">Edit list</span>
            </Button>
        </div>
    </div>
  );

  const triggerButton = (
     <Button
        variant="ghost"
        className="flex items-center gap-2 text-xl font-bold p-0 h-auto hover:bg-transparent"
        >
        {currentUser?.name.split(' ')[0]} N.
        <ChevronDown className="w-5 h-5" />
    </Button>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {triggerButton}
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-lg">
          <SheetHeader className="text-center pb-4">
            <SheetTitle>Switch profile</SheetTitle>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {triggerButton}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end">
            <DropdownMenuLabel>Switch profile</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {content}
        </DropdownMenuContent>
    </DropdownMenu>
  );
}
