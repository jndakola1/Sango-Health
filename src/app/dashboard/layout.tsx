import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { DashboardNav } from '@/components/dashboard-nav';
import { UserNav } from '@/components/user-nav';
import { Stethoscope } from 'lucide-react';
import { MobileNav } from '@/components/mobile-nav';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <a href="/" className="flex items-center gap-2">
            <Stethoscope className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">Amana Health</span>
          </a>
        </SidebarHeader>
        <SidebarContent className="p-0">
          <DashboardNav />
        </SidebarContent>
        <SidebarFooter className="p-2">
          <UserNav />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        {children}
        <MobileNav />
      </SidebarInset>
    </SidebarProvider>
  );
}
