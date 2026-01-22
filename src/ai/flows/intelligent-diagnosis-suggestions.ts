'use server';

/**
 * @fileOverview Provides intelligent diagnostic suggestions based on patient symptoms and medical history.
 *
 * - intelligentDiagnosisSuggestions - A function that takes patient symptoms and medical history and returns potential diagnoses and treatment plans.
 * - IntelligentDiagnosisSuggestionsInput - The input type for the intelligentDiagnosisSuggestions function.
 * - IntelligentDiagnosisSuggestionsOutput - The return type for the intelligentDiagnosisSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentDiagnosisSuggestionsInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A detailed description of the patient\'s symptoms.'),
  medicalHistory: z
    .string()
    .describe('A comprehensive overview of the patient\'s medical history, including past illnesses, treatments, and relevant family history.'),
  symptomImage: z
    .string()
    .optional()
    .describe(
      "An optional photo of the patient's symptoms, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type IntelligentDiagnosisSuggestionsInput = z.infer<
  typeof IntelligentDiagnosisSuggestionsInputSchema
>;

const IntelligentDiagnosisSuggestionsOutputSchema = z.object({
  potentialDiagnoses: z
    .array(z.string())
    .describe('A list of potential diagnoses based on the provided symptoms and medical history.'),
  suggestedTreatmentPlans: z
    .array(z.string())
    .describe('A list of suggested treatment plans corresponding to the potential diagnoses.'),
  disclaimer: z
    .string()
    .describe('A disclaimer that the AI suggestions are not a substitute for professional medical advice.'),
});

export type IntelligentDiagnosisSuggestionsOutput = z.infer<
  typeof IntelligentDiagnosisSuggestionsOutputSchema
>;

export async function intelligentDiagnosisSuggestions(
  input: IntelligentDiagnosisSuggestionsInput
): Promise<IntelligentDiagnosisSuggestionsOutput> {
  return intelligentDiagnosisSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentDiagnosisSuggestionsPrompt',
  input: {schema: IntelligentDiagnosisSuggestionsInputSchema},
  output: {schema: IntelligentDiagnosisSuggestionsOutputSchema},
  prompt: `You are an AI assistant specialized in providing potential diagnoses and treatment plans based on patient-provided symptoms, medical history, and an optional image. It is very important to remember that the suggestions are not a substitute for professional medical advice.

  Symptoms: {{{symptoms}}}
  Medical History: {{{medicalHistory}}}
  {{#if symptomImage}}
  Symptom Image: {{media url=symptomImage}}
  {{/if}}

  Provide a list of potential diagnoses and suggested treatment plans, along with a disclaimer. Analyze the image if provided. Return the response in JSON format.
  Make sure the output matches this schema: ${JSON.stringify(
    IntelligentDiagnosisSuggestionsOutputSchema
  )}`,
});

const intelligentDiagnosisSuggestionsFlow = ai.defineFlow(
  {
    name: 'intelligentDiagnosisSuggestionsFlow',
    inputSchema: IntelligentDiagnosisSuggestionsInputSchema,
    outputSchema: IntelligentDiagnosisSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
