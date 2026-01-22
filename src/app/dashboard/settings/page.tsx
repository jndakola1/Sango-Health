
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/page-header"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Camera } from "lucide-react"

export default function SettingsPage() {
    const userAvatar = PlaceHolderImages.find(p => p.id === "user-avatar");

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <PageHeader 
        title="My Profile"
        description="Manage your personal information and account settings."
      />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
           <Card>
            <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                    <Avatar className="w-32 h-32">
                    <AvatarImage src={userAvatar?.imageUrl} alt="User" data-ai-hint={userAvatar?.imageHint} />
                    <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button size="icon" className="absolute bottom-1 right-1 h-8 w-8 rounded-full">
                        <Camera className="w-4 h-4"/>
                        <span className="sr-only">Change picture</span>
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-6">
           <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your public profile and personal details.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" defaultValue="Jane Doe" />
                </div>
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="jane.doe@example.com" disabled />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (123) 456-7890" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                </div>
                <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St, Anytown, USA" />
                </div>
            </CardContent>
             <CardContent>
                <Button>Update Profile</Button>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password for better security.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                </div>
            </CardContent>
             <CardContent>
                <Button>Update Password</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
