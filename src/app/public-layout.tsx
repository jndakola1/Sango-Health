import { Stethoscope, Twitter, Facebook, Linkedin, Bell } from 'lucide-react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MobileNav } from '@/components/mobile-nav';
import { Separator } from '@/components/ui/separator';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 text-foreground">
                <Stethoscope className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold">Amana Health</span>
            </Link>
            <div className="flex items-center gap-4">
                <nav className="hidden md:flex gap-6 text-sm font-medium">
                    <Link href="/#features" className="text-muted-foreground hover:text-foreground">Features</Link>
                    <Link href="/#how-it-works" className="text-muted-foreground hover:text-foreground">How It Works</Link>
                    <Link href="/provider" className="text-muted-foreground hover:text-foreground">For Doctors</Link>
                </nav>
                <div className="hidden md:flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Link href="/login">
                      <Button variant="ghost">Log in</Button>
                    </Link>
                    <Link href="/signup">
                      <Button>Sign up</Button>
                    </Link>
                </div>
            </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <div className="pb-16 md:pb-0"></div>
      <MobileNav />
      <footer className="bg-muted/50 border-t hidden md:block">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <Stethoscope className="w-8 h-8 text-primary" />
                        <span className="text-xl font-bold">Amana Health</span>
                    </Link>
                    <p className="text-muted-foreground text-sm">Your partner in modern healthcare.</p>
                    <div className="flex mt-4 space-x-4">
                        <Link href="#"><Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground"/></Link>
                        <Link href="#"><Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground"/></Link>
                        <Link href="#"><Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground"/></Link>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground">Press</Link></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold mb-4">Resources</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Amana Health. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
