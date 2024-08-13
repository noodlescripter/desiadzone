/**
 * v0 by Vercel.
 * @see https://v0.dev/t/IiZbw4euZBU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import {Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext} from "@/components/ui/carousel"
import {Button} from "@/components/ui/button"
import {Card, CardHeader, CardContent} from "@/components/ui/card"
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"
import {useEffect, useState} from "react"
import axios from "axios"
import {useParams} from "next/navigation"
import {Spinner} from "@/components/ui/spinner";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink, 
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

export default function Component({params}) {
    const [getProduct, setProducts] = useState(null);

    useEffect(() => {
        const getOneProducts = async function () {
            try {
                const product = await axios.get(`http://localhost:5100/ads/products/${params.productId}`);
                console.log(product.data);
                if (!product) {
                    return null;
                }
                setProducts(product.data);
            } catch (error) {

            }
        }
        getOneProducts();
    }, []);

    if (!getProduct) {
        return (
            <>
                <div className={"m-2"}>
                    <Spinner></Spinner>
                </div>
            </>
        )
    }

    return (
        <div>
            <Breadcrumb className={"content-start m-6"}>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/product/${getProduct._id}`}>{getProduct.title}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="grid gap-8 p-4 md:p-6 lg:grid-cols-2 lg:gap-12">
                <div className="grid gap-6">
                    <Carousel className="rounded-lg overflow-hidden">
                        <CarouselContent>
                            {
                                getProduct.photoURLs.map((url) => (
                                    <>
                                        <CarouselItem>
                                            <img
                                                src={url.url}
                                                alt="Product Image"
                                                width={800}
                                                height={600}
                                                className="object-cover w-full aspect-[4/3]"
                                            />
                                        </CarouselItem>
                                    </>
                                ))
                            }
                        </CarouselContent>
                        <CarouselPrevious/>
                        <CarouselNext/>
                    </Carousel>
                    <div className="grid gap-2">
                        <h1 className="text-2xl font-bold">Acme Prism Tee</h1>
                        <p className="text-muted-foreground">
                            Introducing the Acme Prism T-Shirt, a perfect blend of style and comfort for the modern
                            individual.
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                <StarIcon className="w-5 h-5 fill-primary"/>
                                <StarIcon className="w-5 h-5 fill-primary"/>
                                <StarIcon className="w-5 h-5 fill-primary"/>
                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground"/>
                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground"/>
                            </div>
                            <span className="text-sm text-muted-foreground">(12 reviews)</span>
                        </div>
                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                            <div className="text-3xl font-bold">$49.99</div>
                            <div className="flex gap-2">
                                <Button size="lg">Add to Cart</Button>
                                <Button size="lg" variant="outline">
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src="/placeholder-user.jpg" alt="Seller Avatar"/>
                                    <AvatarFallback>JS</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold">John Doe</h3>
                                    <p className="text-sm text-muted-foreground">Seller</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="flex items-center gap-2">
                                    <LocateIcon className="w-5 h-5 text-muted-foreground"/>
                                    <span className="text-muted-foreground">New York, USA</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="w-5 h-5 fill-primary"/>
                                        <StarIcon className="w-5 h-5 fill-primary"/>
                                        <StarIcon className="w-5 h-5 fill-primary"/>
                                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground"/>
                                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground"/>
                                    </div>
                                    <span className="text-muted-foreground">(4.5 / 5)</span>
                                </div>
                                <div className="grid gap-2">
                                    <h4 className="font-semibold">Seller Reviews</h4>
                                    <div className="grid gap-4">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                                            <Avatar className="w-10 h-10">
                                                <AvatarImage src="/placeholder-user.jpg" alt="Reviewer Avatar"/>
                                                <AvatarFallback>JS</AvatarFallback>
                                            </Avatar>
                                            <div className="grid gap-1">
                                                <div className="flex items-center gap-2">
                                                    <h5 className="font-semibold">Jane Smith</h5>
                                                    <div className="flex items-center gap-0.5">
                                                        <StarIcon className="w-4 h-4 fill-primary"/>
                                                        <StarIcon className="w-4 h-4 fill-primary"/>
                                                        <StarIcon className="w-4 h-4 fill-primary"/>
                                                        <StarIcon
                                                            className="w-4 h-4 fill-muted stroke-muted-foreground"/>
                                                        <StarIcon
                                                            className="w-4 h-4 fill-muted stroke-muted-foreground"/>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    The product is great and the seller was very helpful. Highly
                                                    recommended!
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                                            <Avatar className="w-10 h-10">
                                                <AvatarImage src="/placeholder-user.jpg" alt="Reviewer Avatar"/>
                                                <AvatarFallback>JS</AvatarFallback>
                                            </Avatar>
                                            <div className="grid gap-1">
                                                <div className="flex items-center gap-2">
                                                    <h5 className="font-semibold">Michael Johnson</h5>
                                                    <div className="flex items-center gap-0.5">
                                                        <StarIcon className="w-4 h-4 fill-primary"/>
                                                        <StarIcon className="w-4 h-4 fill-primary"/>
                                                        <StarIcon className="w-4 h-4 fill-primary"/>
                                                        <StarIcon className="w-4 h-4 fill-primary"/>
                                                        <StarIcon
                                                            className="w-4 h-4 fill-muted stroke-muted-foreground"/>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    I'm very satisfied with the product and the seller's responsiveness.
                                                    Highly recommended.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="aspect-video rounded-lg overflow-hidden">
                        <div/>
                    </div>
                </div>
            </div>
        </div>

    )
}

function LocateIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="2" x2="5" y1="12" y2="12"/>
            <line x1="19" x2="22" y1="12" y2="12"/>
            <line x1="12" x2="12" y1="2" y2="5"/>
            <line x1="12" x2="12" y1="19" y2="22"/>
            <circle cx="12" cy="12" r="7"/>
        </svg>
    )
}


function StarIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
    )
}