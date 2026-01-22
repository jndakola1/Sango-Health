import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import { Stethoscope } from 'lucide-react';
import { ProviderNav } from '@/components/provider-nav';

export default function ProviderLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <a href="/provider" className="flex items-center gap-2">
            <Stethoscope className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">Provider Dashboard</span>
          </a>
        </SidebarHeader>
        <SidebarContent className="p-2 flex flex-col">
          <ProviderNav />
        </SidebarContent>
        <SidebarFooter className="p-2">
          <UserNav />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
