'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Calendar,
  CreditCard,
  History,
  MessageSquare,
  BrainCircuit,
  Video,
  Settings,
  MoreHorizontal,
  HeartPulse,
  User,
  PersonStanding,
  LayoutDashboard,
  Pill,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/appointments', label: 'Appointments', icon: Calendar },
  { href: '/dashboard/messaging', label: 'Messages', icon: MessageSquare },
  { href: '/dashboard/account', label: 'Account', icon: User },
];

const healthItems = [
  { href: '/dashboard/history', label: 'Medical History', icon: History },
  { href: '/dashboard/diagnosis', label: 'AI Diagnosis', icon: BrainCircuit },
  { href: '/dashboard/lifestyle', label: 'Lifestyle', icon: PersonStanding },
];

const moreItems = [
  { href: '/dashboard/teleconsultation', label: 'Teleconsultation', icon: Video },
  { href: '/dashboard/pharmacy', label: 'Pharmacy', icon: Pill },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();

  const isHealthActive = healthItems.some((item) =>
    pathname.startsWith(item.href)
  );
  const isMoreActive = moreItems.some((item) => pathname.startsWith(item.href));

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href)}
              tooltip={item.label}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={['health', 'more']}
      >
        <SidebarMenuItem asChild>
          <AccordionItem value="health" className="border-b-0">
            <AccordionTrigger
              className={cn(
                'flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 hover:no-underline',
                isHealthActive &&
                  'bg-sidebar-accent text-sidebar-accent-foreground font-medium',
                'group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2'
              )}
            >
              <div className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">
                  Health
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent asChild>
              <SidebarMenuSub>
                {healthItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                      <SidebarMenuSubButton
                        isActive={pathname.startsWith(item.href)}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenuSub>
            </AccordionContent>
          </AccordionItem>
        </SidebarMenuItem>
        <SidebarMenuItem asChild>
          <AccordionItem value="more" className="border-b-0">
            <AccordionTrigger
              className={cn(
                'flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 hover:no-underline',
                isMoreActive &&
                  'bg-sidebar-accent text-sidebar-accent-foreground font-medium',
                'group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2'
              )}
            >
              <div className="flex items-center gap-2">
                <MoreHorizontal className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">
                  More
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent asChild>
              <SidebarMenuSub>
                {moreItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                      <SidebarMenuSubButton
                        isActive={pathname.startsWith(item.href)}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenuSub>
            </AccordionContent>
          </AccordionItem>
        </SidebarMenuItem>
      </Accordion>
    </SidebarMenu>
  );
}
