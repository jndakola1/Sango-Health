'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  ClipboardList,
  Star,
  Archive,
  FileText,
  MessageCircleQuestion,
  LifeBuoy,
  Crown,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const navItems = [
  { href: '/provider', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/provider/patients', label: 'Patients', icon: Users },
  { href: '/provider/schedule', label: 'Schedule', icon: Calendar },
  { href: '/provider/messages', label: 'Messages', icon: MessageSquare },
  { href: '/provider/consultation', label: 'Consultation', icon: ClipboardList },
];

const favoriteItems = [
  { href: '#', label: 'VIP Patient', icon: Star },
  { href: '#', label: 'Equipment', icon: Archive },
  { href: '#', label: 'Staff Report', icon: FileText },
];

const supportItems = [
  { href: '#', label: 'Feedback', icon: MessageCircleQuestion },
  { href: '#', label: 'Help Center', icon: LifeBuoy },
  { href: '/provider/settings', label: 'Settings', icon: Settings },
];

export function ProviderNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={
                  item.href === '/provider'
                    ? pathname === item.href
                    : pathname.startsWith(item.href)
                }
                tooltip={item.label}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <div className="px-2 mt-2 group-data-[collapsible=icon]:hidden">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
          Favorite
        </p>
      </div>
      <SidebarMenu>
        {favoriteItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={pathname.startsWith(item.href) && item.href !== '#'}
                tooltip={item.label}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <div className="flex-grow" />

      <Separator className="my-2" />

      <SidebarMenu>
        {supportItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={pathname.startsWith(item.href) && item.href !== '#'}
                tooltip={item.label}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <div className="p-2 mt-2 group-data-[collapsible=icon]:hidden">
        <Card className="bg-primary/10">
          <CardContent className="p-3 text-center">
            <div className="w-10 h-10 bg-primary/20 rounded-full mx-auto flex items-center justify-center mb-2">
              <Crown className="w-6 h-6 text-primary" />
            </div>
            <p className="font-semibold text-sm">Unlock Premium</p>
            <p className="text-xs text-muted-foreground mt-1">
              Get advanced tools and exclusive access.
            </p>
            <Button size="sm" className="w-full mt-3">
              Select Plan
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
