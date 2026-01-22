import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';
import { ChevronRight, ShieldCheck, User, Globe, Languages, KeyRound, LogOut, FileLock, Trash2, Info, UserCog, CreditCard } from 'lucide-react';
import Link from 'next/link';

const accountLinks = [
    {
        title: "Personal & Payment",
        links: [
            { icon: User, label: "My profile", value: "Jane Doe", href: "/dashboard/settings" },
            { icon: CreditCard, label: "Billing & Subscription", value: "Manage your subscription and payment methods", href: "/dashboard/billing" },
        ]
    },
    {
        title: "Settings & Confidentiality",
        links: [
            { icon: Globe, label: "Country", value: "Country where you need care", extra: "🇮🇹", href: "#" },
            { icon: Languages, label: "Language", value: "Account language settings", extra: "English", href: "#" },
            { icon: KeyRound, label: "Two-factor authentication", value: "Enable for extra protection", status: "Not activated", href: "#" },
            { icon: FileLock, label: "Encrypted documents", value: "Enable encryption to share documents", status: "Deactivated", href: "#" },
            { icon: UserCog, label: "My preferences", href: "#" },
            { icon: Info, label: "Legal information", href: "#" },
            { icon: Trash2, label: "Delete my account", href: "#" },
        ]
    }
]


export default function AccountPage() {
    return (
        <div className="p-4 sm:p-6 space-y-4">
            <PageHeader title="My Account" />

            <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                <CardContent className="p-4 flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900">
                        <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-blue-900 dark:text-blue-200">Your health. Your data.</h3>
                        <p className="text-sm text-blue-800 dark:text-blue-300">Your privacy is our top priority.</p>
                        <Link href="#" className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400">
                            Learn how we protect your privacy
                        </Link>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                {accountLinks.map(section => (
                    <div key={section.title}>
                        <h2 className="text-lg font-semibold mb-2 px-2">{section.title}</h2>
                         <Card>
                            <CardContent className="p-0">
                                <ul className="divide-y divide-border">
                                    {section.links.map(link => (
                                        <li key={link.label}>
                                            <Link href={link.href} className="flex items-center p-4 hover:bg-muted/50">
                                                <link.icon className="w-5 h-5 mr-4 text-muted-foreground" />
                                                <div className="flex-1">
                                                    <p className="font-medium">{link.label}</p>
                                                    {link.value && <p className="text-sm text-muted-foreground">{link.value}</p>}
                                                </div>
                                                {link.status && (
                                                    <div className="text-xs font-medium bg-yellow-100 px-2 py-1 rounded-full dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400">
                                                        {link.status}
                                                    </div>
                                                )}
                                                {link.extra && (
                                                     <p className="text-sm text-muted-foreground">{link.extra}</p>
                                                )}
                                                <ChevronRight className="w-5 h-5 ml-4 text-muted-foreground" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            <Card>
                <CardContent className="p-0">
                    <Link href="#" className="flex items-center p-4 hover:bg-muted/50 text-red-600 dark:text-red-500">
                        <LogOut className="w-5 h-5 mr-4" />
                        <span className="font-medium">Log out</span>
                        <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground" />
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}
