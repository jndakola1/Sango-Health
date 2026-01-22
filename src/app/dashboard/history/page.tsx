import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/page-header';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function MedicalHistoryPage() {
  return (
    <div className="p-4 sm:p-6">
      <PageHeader 
        title="Medical History"
        description="Keep your medical profile up to date for better care."
      />
      <main className="pt-6">
        <form>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" defaultValue="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" defaultValue="1990-01-01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select defaultValue="female">
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blood-type">Blood Type</Label>
                  <Select defaultValue="o-positive">
                    <SelectTrigger id="blood-type">
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a-positive">A+</SelectItem>
                      <SelectItem value="a-negative">A-</SelectItem>
                      <SelectItem value="b-positive">B+</SelectItem>
                      <SelectItem value="b-negative">B-</SelectItem>
                      <SelectItem value="ab-positive">AB+</SelectItem>
                      <SelectItem value="ab-negative">AB-</SelectItem>
                      <SelectItem value="o-positive">O+</SelectItem>
                      <SelectItem value="o-negative">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Medical Conditions & Allergies</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="conditions">Chronic Conditions</Label>
                  <Textarea
                    id="conditions"
                    placeholder="e.g., Asthma, Diabetes"
                    defaultValue="Mild Asthma"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea
                    id="allergies"
                    placeholder="e.g., Penicillin, Peanuts"
                    defaultValue="Pollen"
                  />
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
