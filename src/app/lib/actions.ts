'use server';

import { intelligentDiagnosisSuggestions } from "@/ai/flows/intelligent-diagnosis-suggestions";
import type { IntelligentDiagnosisSuggestionsInput } from "@/ai/flows/intelligent-diagnosis-suggestions";

export async function getDiagnosisSuggestions(input: IntelligentDiagnosisSuggestionsInput) {
    try {
        const result = await intelligentDiagnosisSuggestions(input);
        return result;
    } catch (error) {
        console.error("Error in getDiagnosisSuggestions server action:", error);
        throw new Error("Failed to get diagnosis suggestions from AI.");
    }
}
