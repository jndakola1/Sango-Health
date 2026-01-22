import { PageHeader } from "@/components/page-header";
import { DiagnosisForm } from "./diagnosis-form";

export default function DiagnosisPage() {
    return (
        <div className="p-4 sm:p-6">
            <PageHeader 
                title="Intelligent Diagnosis Suggestions"
                description="Enter symptoms and medical history to get AI-powered diagnostic insights."
            />
            <main className="pt-6">
              <DiagnosisForm />
            </main>
        </div>
    )
}
