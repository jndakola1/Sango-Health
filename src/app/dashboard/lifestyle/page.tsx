import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';
import { Cigarette, Wine, PersonStanding, Briefcase } from 'lucide-react';
import Link from 'next/link';

const lifestyleItems = [
  {
    icon: Cigarette,
    label: 'Tobacco or nicotine',
    value: 'No information',
    href: '#',
  },
  {
    icon: Wine,
    label: 'Alcohol',
    value: 'No information',
    href: '#',
  },
  {
    icon: PersonStanding,
    label: 'Physical activity',
    value: 'No information',
    href: '#',
  },
  {
    icon: Briefcase,
    label: 'Occupation or status',
    value: 'No information',
    href: '#',
  },
];

export default function LifestylePage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <PageHeader title="My lifestyle" />

      <div className="space-y-4">
        {lifestyleItems.map((item) => (
          <Link href={item.href} key={item.label}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
                  <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
