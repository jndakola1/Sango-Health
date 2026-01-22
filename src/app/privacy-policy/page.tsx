import PublicLayout from '@/app/public-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
              <p className="text-muted-foreground">
                Welcome to Amana Health. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
              <p className="text-muted-foreground">
                We may collect information about you in a variety of ways. The information we may collect on the Site includes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                <li>
                  <strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.
                </li>
                <li>
                  <strong>Health Information:</strong> Information related to your health, such as medical history, symptoms, diagnoses, treatments, and other health-related information that you provide to us or that is generated through your use of our services.
                </li>
                <li>
                  <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
              <p className="text-muted-foreground">
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
              </p>
               <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                <li>Create and manage your account.</li>
                <li>Provide you with our services, including teleconsultation and AI diagnosis.</li>
                <li>Email you regarding your account or order.</li>
                <li>Improve our website and services.</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              </ul>
            </section>
             <section>
              <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
              <p className="text-muted-foreground">
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">5. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions or comments about this Privacy Policy, please contact us at: privacy@amanahealth.com.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
