'use client';

import {
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';
import { ProfileSwitcher } from '@/components/profile-switcher';

const healthProfileItems = [
  {
    label: 'Documents',
    href: '#',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="20" fill="#E0F2FE" />
        <path
          d="M26.25 29.375H13.75C13.087 29.375 12.5 28.788 12.5 28.125V11.875C12.5 11.212 13.087 10.625 13.75 10.625H20.4L27.5 17.725V28.125C27.5 28.788 26.913 29.375 26.25 29.375Z"
          stroke="#0284C7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.375 10.625V17.75H27.5"
          stroke="#0284C7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.5 21.875H17.5"
          stroke="#F87171"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 19.375V24.375"
          stroke="#F87171"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'AI Diagnosis',
    href: '/dashboard/diagnosis',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="20" fill="#F3E8FF" />
        <path d="M20 15C22.2091 15 24 16.7909 24 19C24 21.2091 22.2091 23 20 23C17.7909 23 16 21.2091 16 19C16 16.7909 17.7909 15 20 15Z" stroke="#A855F7" strokeWidth="1.5" />
        <path d="M20 23V28" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 15V10" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M15 19H10" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M30 19H25" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 15L13 12" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M27 12L24 15" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 23L13 26" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M27 26L24 23" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Medical conditions',
    href: '/dashboard/history',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="20" fill="#FEE2E2" />
        <path
          d="M18.75 14.375C18.75 12.5417 20.2083 11.25 21.875 11.25C23.5417 11.25 25 12.5417 25 14.375C25 15.625 24.2917 16.875 23.125 17.5V17.5C22.5417 17.8333 21.875 18.25 21.875 18.75V20M21.875 28.75C26.125 28.75 28.75 26.2083 28.75 23.125C28.75 19.375 25.625 17.5 21.875 17.5C18.125 17.5 15 19.375 15 23.125C15 26.2083 17.625 28.75 21.875 28.75Z"
          stroke="#EF4444"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Medications',
    href: '#',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="20" fill="#FCE7F3" />
        <path
          d="M20.625 11.25H25.625C26.9602 11.25 28.0196 12.1458 28.2188 13.4375L29.375 21.25L23.75 23.125L21.25 18.125L15 20.625L11.875 14.375C11.6758 13.0859 12.6352 11.9902 13.9219 11.791L20.625 10.8594V11.25Z"
          fill="#F9A8D4"
          stroke="#DB2777"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M11.25 28.75C14.7018 28.75 17.5 25.9518 17.5 22.5C17.5 19.0482 14.7018 16.25 11.25 16.25C7.79822 16.25 5 19.0482 5 22.5C5 25.9518 7.79822 28.75 11.25 28.75Z"
          fill="#A5B4FC"
          stroke="#6366F1"
          strokeWidth="1.5"
        />
        <path
          d="M30 27.5C32.7614 27.5 35 25.2614 35 22.5C35 19.7386 32.7614 17.5 30 17.5C27.2386 17.5 25 19.7386 25 22.5C25 25.2614 27.2386 27.5 30 27.5Z"
          fill="#FCD34D"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    label: 'Allergies',
    href: '#',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="20" fill="#D1FAE5" />
        <path
          d="M17.5 15C19.275 14.125 20.725 14.125 22.5 15"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.875 18.75L12.5 17.5"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.125 18.75L27.5 17.5"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.125 25.625L12.5 27.5"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.875 25.625L27.5 27.5"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5 29.375H22.5"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 11.25C23.4518 11.25 26.25 14.0482 26.25 17.5V25C26.25 27.0711 24.5711 28.75 22.5 28.75H17.5C15.4289 28.75 13.75 27.0711 13.75 25V17.5C13.75 14.0482 16.5482 11.25 20 11.25Z"
          fill="#A7F3D0"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 28.75V30"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Lifestyle',
    href: '/dashboard/lifestyle',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="20" fill="#FEF3C7" />
        <path
          d="M13.75 15V11.25H21.25"
          stroke="#FBBF24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.75 11.25L10.8333 13.125C10.3125 13.4583 10 14.0417 10 14.6667V17.5H13.75"
          stroke="#FBBF24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="10"
          y="17.5"
          width="7.5"
          height="11.25"
          rx="1"
          fill="#FDE68A"
          stroke="#FBBF24"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle
          cx="24.375"
          cy="23.125"
          r="4.375"
          fill="#FB923C"
          stroke="#F97316"
          strokeWidth="1.5"
        />
        <path
          d="M28.75 18.75L26.875 20.625"
          stroke="#F97316"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M24.375 16.25V18.75"
          stroke="#F97316"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 18.75L21.875 20.625"
          stroke="#F97316"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: 'Family history',
    href: '#',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="20" fill="#E0E7FF" />
        <path
          d="M17.5 11.25C15.84 11.25 14.25 12.3 13.75 13.75M22.5 28.75C24.16 28.75 25.75 27.7 26.25 26.25M13.75 13.75C12.9 15.26 12.9 17.02 13.75 18.53L18.69 27.2C19.54 28.71 21.29 29.34 22.81 28.5L26.25 26.25M13.75 13.75L17.19 11.5C18.71 10.66 20.46 11.29 21.31 12.8L26.25 21.47C27.1 22.98 26.47 24.73 24.95 25.56L22.5 26.88M26.25 21.47L28.75 22.81"
          stroke="#818CF8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Surgical history',
    href: '#',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="20" fill="#CFFAFE" />
        <path
          d="M16.25 15L23.75 22.5"
          stroke="#0891B2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="15"
          cy="23.75"
          r="2.5"
          stroke="#0891B2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="25"
          cy="13.75"
          r="2.5"
          stroke="#0891B2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.25 22.5L23.75 15"
          stroke="#0891B2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function HealthPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-gradient-to-b from-sky-100 to-slate-50 p-4 sm:p-6 pb-12">
        <PageHeader title="">
            <ProfileSwitcher />
        </PageHeader>
      </div>

      <div className="p-4 sm:p-6 space-y-6 -mt-10">
        <div className="space-y-2">
          <h2 className="text-base font-semibold text-gray-600">
            Health reminders
          </h2>
          <Card className="shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold">You're up to date</p>
                <p className="text-sm text-muted-foreground">
                  We'll notify you when you have new health reminders
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-semibold text-gray-600">
            Health profile
          </h2>
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {healthProfileItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center p-4 gap-4"
                    >
                      {item.icon}
                      <span className="font-medium flex-1">{item.label}</span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
