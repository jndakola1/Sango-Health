'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, MessageSquare, User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/appointments', label: 'Appointments', icon: Calendar },
  { href: '/dashboard/health', label: 'Health', icon: Heart },
  { href: '/dashboard/messaging', label: 'Messages', icon: MessageSquare },
  { href: '/dashboard/account', label: 'Account', icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  // A helper function to determine if a nav item is active.
  // It should match for the exact path or a parent path.
  const isItemActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    if (href === '/dashboard/health') {
      return pathname.startsWith('/dashboard/health') || pathname.startsWith('/dashboard/history') || pathname.startsWith('/dashboard/diagnosis');
    }
    return pathname.startsWith(href);
  };
  

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-50">
      <nav className="h-full">
        <ul className="flex justify-around items-center h-full">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 text-xs font-medium w-16',
                  isItemActive(item.href) ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <item.icon className="h-6 w-6" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
