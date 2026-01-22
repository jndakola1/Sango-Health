
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/page-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Paperclip, Send, Mail, Edit, Phone, Video } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { doctors, messages as allMessages } from '@/lib/data';
import { Badge } from '@/components/ui/badge';


const supportContact = { id: 'support-team', name: 'Support Team', specialty: 'Amana Health', avatarId: 'support-avatar' };
const contacts = [...doctors.map(d => ({...d, specialty: d.specialty || ''})), supportContact];


export default function MessagingPage() {
  const getImage = (avatarId: string) => PlaceHolderImages.find(p => p.id === avatarId);
  const [selectedContact, setSelectedContact] = useState(contacts[1]);
  
  const hasMessages = allMessages.length > 0;

  const getContactLastMessage = (contactId: string) => {
    return allMessages.filter(m => m.contactId === contactId).pop();
  }

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="bg-blue-100 dark:bg-blue-900/50 p-6 rounded-full mb-6">
        <Mail className="w-16 h-16 text-blue-600 dark:text-blue-400" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Easily send messages to practitioners</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        Start a conversation with your practitioners. Ask about exam results, request referral letters, and more.
      </p>
      <Link href="#" className="text-primary font-semibold hover:underline mb-8">
        Learn more
      </Link>
      <div className="md:hidden fixed bottom-20 right-4 z-40">
        <Button size="lg" className="rounded-full shadow-lg">
            <Edit className="mr-2 h-5 w-5"/>
            Send a message
        </Button>
      </div>
    </div>
  );

  const messages = allMessages.filter(m => m.contactId === selectedContact.id);

  return (
    <div className="h-full max-h-[calc(100vh-2rem)] flex flex-col">
        <div className="p-4 sm:p-6 md:p-0">
          <PageHeader title="My messages" />
        </div>
        
        {!hasMessages ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-4 p-0 sm:p-2 sm:pt-0 flex-1">
              <Card className="md:col-span-1 hidden md:flex flex-col">
                  <CardHeader>
                      <Input placeholder="Search contacts..." />
                  </CardHeader>
                  <ScrollArea className="flex-1">
                      <CardContent className="space-y-1">
                      {contacts.map((contact) => (
                          <Button 
                            variant={selectedContact.id === contact.id ? "secondary" : "ghost"}
                            className="w-full justify-start h-auto p-2"
                            key={contact.id}
                            onClick={() => setSelectedContact(contact)}
                          >
                              <div className="flex items-center gap-3 w-full">
                                  <Avatar>
                                      <AvatarImage src={getImage(contact.avatarId)?.imageUrl} alt={contact.name} data-ai-hint={getImage(contact.avatarId)?.imageHint}/>
                                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 text-left">
                                      <p className="font-semibold">{contact.name}</p>
                                      <p className="text-xs text-muted-foreground truncate">{getContactLastMessage(contact.id)?.text}</p>
                                  </div>
                                  <div className="text-xs text-muted-foreground self-start">{getContactLastMessage(contact.id)?.time}</div>
                              </div>
                          </Button>
                      ))}
                      </CardContent>
                  </ScrollArea>
              </Card>
              <Card className="md:col-span-2 flex flex-col h-full">
              <CardHeader className="flex flex-row items-center justify-between border-b p-4">
                  <div className="flex items-center gap-3">
                      <Avatar>
                          <AvatarImage src={getImage(selectedContact.avatarId)?.imageUrl} alt={selectedContact.name} data-ai-hint={getImage(selectedContact.avatarId)?.imageHint}/>
                          <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{selectedContact.name}</p>
                        <p className="text-xs text-muted-foreground">{selectedContact.specialty}</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon">
                          <Video className="h-5 w-5 text-muted-foreground" />
                      </Button>
                  </div>
              </CardHeader>
              <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                      {messages.map((msg, index) => (
                          <div key={index} className={cn('flex items-end gap-2', msg.from === 'me' ? 'justify-end' : 'justify-start')}>
                              {msg.from !== 'me' && <Avatar className="h-6 w-6"><AvatarImage src={getImage(selectedContact.avatarId)?.imageUrl} alt={selectedContact.name} data-ai-hint={getImage(selectedContact.avatarId)?.imageHint}/><AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback></Avatar>}
                              <div className={cn('max-w-xs md:max-w-md rounded-lg p-3 text-sm', msg.from === 'me' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                  <p>{msg.text}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </ScrollArea>
              <CardFooter className="p-4 border-t">
                  <div className="relative w-full">
                      <Input placeholder="Type a message..." className="pr-20" />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                          <Button variant="ghost" size="icon"><Paperclip className="w-4 h-4"/></Button>
                          <Button variant="ghost" size="icon"><Send className="w-4 h-4"/></Button>
                      </div>
                  </div>
              </CardFooter>
              </Card>
          </div>
        )}
    </div>
  );
}
