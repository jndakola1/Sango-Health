'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getDiagnosisSuggestions } from '@/app/lib/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { IntelligentDiagnosisSuggestionsOutput } from '@/ai/flows/intelligent-diagnosis-suggestions';
import { Loader2, AlertCircle, Upload, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

const FormSchema = z.object({
  symptoms: z.string().min(10, { message: 'Please describe symptoms in at least 10 characters.' }),
  medicalHistory: z.string().min(10, { message: 'Please describe medical history in at least 10 characters.' }),
  symptomImage: z.string().optional(),
});

export function DiagnosisForm() {
  const [result, setResult] = useState<IntelligentDiagnosisSuggestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      symptoms: '',
      medicalHistory: '',
      symptomImage: '',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
        form.setValue('symptomImage', dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = () => {
    setPreview(null);
    form.setValue('symptomImage', undefined);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  }


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await getDiagnosisSuggestions(data);
      setResult(response);
    } catch (e) {
      setError('An error occurred while getting suggestions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Patient Information</CardTitle>
                    <CardDescription>This tool is for informational purposes only and is not a substitute for professional medical advice.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                        control={form.control}
                        name="symptoms"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Symptoms</FormLabel>
                            <FormControl>
                                <Textarea placeholder="e.g., persistent cough, headache, fatigue..." {...field} rows={5} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="medicalHistory"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Medical History</FormLabel>
                            <FormControl>
                                <Textarea placeholder="e.g., previous conditions, allergies, current medications..." {...field} rows={5} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormItem>
                        <FormLabel>Symptom Image (Optional)</FormLabel>
                        <FormControl>
                             <div className="flex items-center gap-4">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    ref={fileInputRef}
                                    id="file-upload"
                                />
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <Button type="button" variant="outline" asChild>
                                        <span>
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload Image
                                        </span>
                                    </Button>
                                </label>
                                {preview && (
                                <div className="relative">
                                    <Image src={preview} alt="Symptom preview" width={80} height={80} className="rounded-md object-cover h-20 w-20" />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                        onClick={removeImage}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                                )}
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </CardContent>
            </Card>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Get Suggestions
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="flex items-center justify-center p-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card>
            <CardHeader>
                <CardTitle>AI-Generated Suggestions</CardTitle>
                 <Alert variant="default" className="bg-accent">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Disclaimer</AlertTitle>
                    <AlertDescription>{result.disclaimer}</AlertDescription>
                </Alert>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="diagnoses">
                        <AccordionTrigger className="text-lg font-semibold">Potential Diagnoses</AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc pl-5 space-y-2">
                                {result.potentialDiagnoses.map((diagnosis, index) => (
                                    <li key={index}>{diagnosis}</li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="treatments">
                        <AccordionTrigger className="text-lg font-semibold">Suggested Treatment Plans</AccordionTrigger>
                        <AccordionContent>
                           <ul className="list-disc pl-5 space-y-2">
                                {result.suggestedTreatmentPlans.map((plan, index) => (
                                    <li key={index}>{plan}</li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
