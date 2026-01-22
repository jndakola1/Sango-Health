'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const totalSteps = 12;

const stepTitles = [
    "Patient Identification",
    "Emergency & Next of Kin",
    "Visit Information",
    "Vital Signs",
    "Medical History",
    "Lifestyle & Social History",
    "Women’s Health",
    "Initial Clinical Assessment",
    "Treatment Plan",
    "Billing & Administrative",
    "Consent & Compliance",
    "Review & Submit"
];

export default function NewPatientPage() {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(prev => (prev < totalSteps ? prev + 1 : prev));
    const prevStep = () => setStep(prev => (prev > 1 ? prev - 1 : prev));

    return (
        <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
            <PageHeader
                title="Add New Patient"
                description="Follow the steps to add a new patient record."
            />
            <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
                <Progress value={(step / totalSteps) * 100} className="w-full" />
            </div>
            
            <form onSubmit={(e) => e.preventDefault()}>
                <Card>
                    <CardHeader>
                        <CardTitle>{stepTitles[step-1]}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {step === 1 && <Step1 />}
                        {step === 2 && <Step2 />}
                        {step === 3 && <Step3 />}
                        {step > 3 && (
                            <div className="text-center py-10">
                                <p className="text-muted-foreground">This step is under construction.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="flex justify-between mt-6">
                    <Button variant="outline" type="button" onClick={prevStep} disabled={step === 1}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous
                    </Button>
                    {step < totalSteps ? (
                        <Button type="button" onClick={nextStep}>Next</Button>
                    ) : (
                        <Button type="submit">Submit</Button>
                    )}
                </div>
            </form>
        </div>
    );
}


const Step1 = () => (
    <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input id="first-name" placeholder="John" required />
        </div>
        <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input id="last-name" placeholder="Doe" required />
        </div>
        <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" type="date" required />
        </div>
        <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup defaultValue="male" className="flex items-center pt-2 gap-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="font-normal">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="font-normal">Female</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="font-normal">Other</Label>
                </div>
            </RadioGroup>
        </div>
         <div className="space-y-2">
            <Label htmlFor="national-id">National ID / Passport Number</Label>
            <Input id="national-id" placeholder="(Optional)" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (Primary)</Label>
            <Input id="phone" type="tel" required/>
        </div>
        <div className="space-y-2">
            <Label htmlFor="alt-phone">Alternative Phone Number</Label>
            <Input id="alt-phone" type="tel" placeholder="(Optional)" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="(Optional)" />
        </div>
        <div className="sm:col-span-2 space-y-2">
             <Label>Home Address</Label>
             <div className="grid gap-2 sm:grid-cols-3">
                <Input placeholder="Country" />
                <Input placeholder="City / Town" />
                <Input placeholder="Street / Landmark" />
             </div>
        </div>
    </div>
);

const Step2 = () => (
    <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
            <Label htmlFor="emergency-name">Emergency Contact Full Name</Label>
            <Input id="emergency-name" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="emergency-relationship">Relationship to Patient</Label>
            <Input id="emergency-relationship" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="emergency-phone">Phone Number</Label>
            <Input id="emergency-phone" type="tel" />
        </div>
         <div className="space-y-2">
            <Label htmlFor="emergency-alt-contact">Alternate Contact</Label>
            <Input id="emergency-alt-contact" placeholder="(Optional)" />
        </div>
    </div>
);

const Step3 = () => (
    <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
            <Label>Visit Type</Label>
            <RadioGroup defaultValue="new" className="flex flex-wrap items-center pt-2 gap-4">
                 <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new" className="font-normal">New Patient</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="follow-up" id="follow-up" />
                    <Label htmlFor="follow-up" className="font-normal">Follow-up</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="emergency" id="emergency" />
                    <Label htmlFor="emergency" className="font-normal">Emergency</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="teleconsultation" id="teleconsultation" />
                    <Label htmlFor="teleconsultation" className="font-normal">Teleconsultation</Label>
                </div>
            </RadioGroup>
        </div>
        <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="reason-for-visit">Reason for Visit (Chief Complaint)</Label>
            <Textarea id="reason-for-visit" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="symptoms-start">Symptoms Start Date</Label>
            <Input id="symptoms-start" type="date" />
        </div>
        <div className="space-y-2">
            <Label>Urgency Level</Label>
            <RadioGroup defaultValue="routine" className="flex items-center pt-2 gap-4">
                 <div className="flex items-center space-x-2">
                    <RadioGroupItem value="routine" id="routine" />
                    <Label htmlFor="routine" className="font-normal">Routine</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="urgent" id="urgent" />
                    <Label htmlFor="urgent" className="font-normal">Urgent</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="critical" id="critical" />
                    <Label htmlFor="critical" className="font-normal">Critical</Label>
                </div>
            </RadioGroup>
        </div>
    </div>
);
