import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Search, Pill, Heart, Bone, Baby, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

const categories = [
    { name: "Pain Relief", icon: Bone, imageId: "pharmacy-pain" },
    { name: "Cold & Flu", icon: Pill, imageId: "pharmacy-cold" },
    { name: "Skin Care", icon: Sun, imageId: "pharmacy-skin" },
    { name: "Vitamins", icon: Heart, imageId: "pharmacy-vitamins" },
    { name: "Baby & Child", icon: Baby, imageId: "pharmacy-baby" },
];

const recommendedProducts = [
    { name: "Ibuprofen 200mg", imageId: "product-ibuprofen" },
    { name: "Vitamin C Gummies", imageId: "product-vitaminc" },
    { name: "Allergy Relief Spray", imageId: "product-allergy" },
];

const getImage = (id: string) => PlaceHolderImages.find(p => p.id === id);

export default function PharmacyPage() {
    return (
        <div className="p-4 sm:p-6 space-y-6">
            <PageHeader
                title="Pharmacy Shop"
                description="Get your medications and wellness products delivered to your door."
            />
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search for medications, vitamins, and more..."
                    className="pl-11 text-base h-12 w-full rounded-lg bg-background border-border"
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Shop by Category</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {categories.map(category => {
                        const image = getImage(category.imageId);
                        return (
                            <Link href="#" key={category.name}>
                                <div className="group flex flex-col items-center text-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors">
                                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary">
                                        {image && <Image src={image.imageUrl} alt={category.name} data-ai-hint={image.imageHint} fill className="object-cover" />}
                                    </div>
                                    <p className="font-semibold text-sm mt-2">{category.name}</p>
                                </div>
                            </Link>
                        );
                    })}
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-primary/10 border-primary/20">
                    <CardHeader>
                        <CardTitle>Easy Prescription Refills</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Never run out of your important medications. We'll handle the refills and deliver them on time.</p>
                        <Button>Set Up Auto-Refills</Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Recommended For You</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {recommendedProducts.map(product => {
                             const image = getImage(product.imageId);
                             return (
                                <div key={product.name} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50">
                                    {image && <Image src={image.imageUrl} alt={product.name} data-ai-hint={image.imageHint} width={48} height={48} className="rounded-md object-cover h-12 w-12" />}
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">{product.name}</p>
                                    </div>
                                    <Button variant="outline" size="sm">Add to cart</Button>
                                </div>
                             )
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
