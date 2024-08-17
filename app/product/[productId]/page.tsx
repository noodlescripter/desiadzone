/**
 * v0 by Vercel.
 * @see https://v0.dev/t/IiZbw4euZBU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import { Spinner } from "@/components/ui/spinner";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import Link from "next/link"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogClose, DialogFooter } from "@/components/ui/dialog"

import { Textarea } from "@/components/ui/textarea"
import ChatComponent from "@/components/chat/chatComponent"

export default function Component({ params }) {
    const [getProduct, setProducts] = useState(null);


    useEffect(() => {
        const getOneProducts = async function () {
            try {
                const product = await axios.get(`${process.env.NEXT_PUBLIC_BACK_END_URL}/ads/products/${params.productId}`);
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

    function ProductsIcon(props: any) {
        return (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-80q-33 0-56.5-23.5T120-160v-451q-18-11-29-28.5T80-680v-120q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v120q0 23-11 40.5T840-611v451q0 33-23.5 56.5T760-80H200Zm0-520v440h560v-440H200Zm-40-80h640v-120H160v120Zm200 280h240v-80H360v80Zm120 20Z" /></svg>
        )
    }
    
    function HomeIcon(props: any) {
        return (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" /></svg>
        )
    }

    function ListIcon(props: any){
        return (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"/></svg>
        )
    }

    return (
        <div>
            <Breadcrumb className={"content-start m-6"}>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="p-2" href="/"><HomeIcon></HomeIcon></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="p-2" href="/adlisting"><ListIcon></ListIcon></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/product/${getProduct._id}`}>{getProduct.title}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-20 px-4 md:px-6 shadow-2xl mb-10 rounded-2xl">
                <div>
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
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
                <div className="grid gap-6">
                    <div>
                        <h1 className="text-3xl font-bold">{getProduct.title}</h1>
                        <p className="text-muted-foreground text-lg">Posted on: {getProduct.createdAt.slice(0, 10)}</p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <h2 className="text-xl font-semibold">Description</h2>
                            <p className="text-muted-foreground">
                                {getProduct.description}
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <h2 className="text-xl font-semibold">Contact Information</h2>
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                    <PackageIcon className="w-5 h-5 text-muted-foreground" />
                                    <span className="font-medium">{getProduct.userName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <PhoneIcon className="w-5 h-5 text-muted-foreground" />
                                    <span>{getProduct.phoneNumber}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MailIcon className="w-5 h-5 text-muted-foreground" />
                                    <span>{getProduct.email}</span>
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Link href={`tel:${getProduct.phoneNumber}`}>
                                <Button size="lg">
                                    <CellIcon></CellIcon>
                                </Button>
                            </Link>
                            <Link href={`email:${getProduct.email}`}>
                                <Button size="lg">
                                    <EmailIcon></EmailIcon>
                                </Button>
                            </Link>

                        </div>
                    </div>

                </div>
            </div>

        </div>

    )
}

function MailIcon(props) {
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
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    )
}


function PackageIcon(props) {
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
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    )
}
function MessageCircleIcon(props) {
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
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
    )
}
function SendIcon(props) {
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
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
        </svg>
    )
}


function XIcon(props) {
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}
function PhoneIcon(props) {
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
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    )
}
// return (
//     <div>
//         <Breadcrumb className={"content-start m-6"}>
//             <BreadcrumbList>
//                 <BreadcrumbItem>
//                     <BreadcrumbLink href="/">Home</BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator />
//                 <BreadcrumbItem>
//                     <BreadcrumbLink href={`/product/${getProduct._id}`}>{getProduct.title}</BreadcrumbLink>
//                 </BreadcrumbItem>
//             </BreadcrumbList>
//         </Breadcrumb>
//         <div className="grid gap-8 p-4 md:p-6 lg:grid-cols-2 lg:gap-12">
//             <div className="grid gap-6">
//                 <Carousel className="rounded-lg overflow-hidden">
//                     <CarouselContent>
//                         {
//                             getProduct.photoURLs.map((url) => (
//                                 <>
//                                     <CarouselItem>
//                                         <img
//                                             src={url.url}
//                                             alt="Product Image"
//                                             width={800}
//                                             height={600}
//                                             className="object-cover w-full aspect-[4/3]"
//                                         />
//                                     </CarouselItem>
//                                 </>
//                             ))
//                         }
//                     </CarouselContent>
//                     <CarouselPrevious />
//                     <CarouselNext />
//                 </Carousel>
//                 <div className="grid gap-2">
//                     <h1 className="text-2xl font-bold">{getProduct.title}</h1>
//                     <p className="text-muted-foreground">
//                         {getProduct.description}
//                     </p>
//                     {/* TODO --- future release */}
//                     {/* <div className="flex items-center gap-2">
//                         <div className="flex items-center gap-0.5">
//                             <StarIcon className="w-5 h-5 fill-primary" />
//                             <StarIcon className="w-5 h-5 fill-primary" />
//                             <StarIcon className="w-5 h-5 fill-primary" />
//                             <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
//                             <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
//                         </div>
//                         <span className="text-sm text-muted-foreground">(12 reviews)</span>
//                     </div> */}
//                     <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
//                         <div className="text-3xl font-bold">${getProduct.price}.00</div>
//                         <div className="flex gap-2">
//                             <Link href={`tell:${getProduct.phoneNumber}`}>
//                                 <Button size="icon"><CellIcon></CellIcon></Button>
//                             </Link>
//                             <Link href={`email:${getProduct.email}`}>
//                                 <Button size="icon">
//                                     <EmailIcon></EmailIcon>
//                                 </Button>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="grid gap-6">
//                 <Card>
//                     <CardHeader>
//                         <div className="flex items-center gap-4">
//                             <Avatar className="w-12 h-12">
//                                 <AvatarImage src="/placeholder-user.jpg" alt="Seller Avatar" />
//                                 <AvatarFallback>{getProduct.userName.charAt(0)}</AvatarFallback>
//                             </Avatar>
//                             <div>
//                                 <h3 className="font-semibold">{getProduct.userName}</h3>
//                                 <p className="text-sm text-muted-foreground">Seller</p>
//                             </div>
//                         </div>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="grid gap-4">
//                             <div className="flex items-center gap-2">
//                                 <LocateIcon className="w-5 h-5 text-muted-foreground" />
//                                 <span className="text-muted-foreground">{getProduct.city}, {getProduct.state}</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <span className="text-muted-foreground">Email: {getProduct.email}</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <span className="text-muted-foreground">Phone: {getProduct.phoneNumber}</span>
//                             </div>
//                             {/* Future Release */}
//                             {/* <div className="flex items-center gap-2">
//                                 <div className="flex items-center gap-0.5">
//                                     <StarIcon className="w-5 h-5 fill-primary" />
//                                     <StarIcon className="w-5 h-5 fill-primary" />
//                                     <StarIcon className="w-5 h-5 fill-primary" />
//                                     <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
//                                     <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
//                                 </div>
//                                 <span className="text-muted-foreground">(4.5 / 5)</span>
//                             </div> */}
//                             <div className="grid gap-2">
//                                 <h4 className="font-semibold">Seller Reviews</h4>
//                                 <div className="grid gap-4">
//                                     <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
//                                         <Avatar className="w-10 h-10">
//                                             <AvatarImage src="/placeholder-user.jpg" alt="Reviewer Avatar" />
//                                             <AvatarFallback>JS</AvatarFallback>
//                                         </Avatar>
//                                         <div className="grid gap-1">
//                                             <div className="flex items-center gap-2">
//                                                 <h5 className="font-semibold">Jane Smith</h5>
//                                                 <div className="flex items-center gap-0.5">
//                                                     {/* <StarIcon className="w-4 h-4 fill-primary" />
//                                                     <StarIcon className="w-4 h-4 fill-primary" />
//                                                     <StarIcon className="w-4 h-4 fill-primary" />
//                                                     <StarIcon
//                                                         className="w-4 h-4 fill-muted stroke-muted-foreground" />
//                                                     <StarIcon
//                                                         className="w-4 h-4 fill-muted stroke-muted-foreground" /> */}
//                                                 </div>
//                                             </div>
//                                             <p className="text-sm text-muted-foreground">
//                                                 The product is great and the seller was very helpful. Highly
//                                                 recommended!
//                                             </p>
//                                         </div>
//                                     </div>
//                                     <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
//                                         <Avatar className="w-10 h-10">
//                                             <AvatarImage src="/placeholder-user.jpg" alt="Reviewer Avatar" />
//                                             <AvatarFallback>JS</AvatarFallback>
//                                         </Avatar>
//                                         <div className="grid gap-1">
//                                             <div className="flex items-center gap-2">
//                                                 <h5 className="font-semibold">Michael Johnson</h5>
//                                                 <div className="flex items-center gap-0.5">
//                                                     <StarIcon className="w-4 h-4 fill-primary" />
//                                                     <StarIcon className="w-4 h-4 fill-primary" />
//                                                     <StarIcon className="w-4 h-4 fill-primary" />
//                                                     <StarIcon className="w-4 h-4 fill-primary" />
//                                                     <StarIcon
//                                                         className="w-4 h-4 fill-muted stroke-muted-foreground" />
//                                                 </div>
//                                             </div>
//                                             <p className="text-sm text-muted-foreground">
//                                                 I'm very satisfied with the product and the seller's responsiveness.
//                                                 Highly recommended.
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//                 <div className="aspect-video rounded-lg overflow-hidden">
//                     <div />
//                 </div>
//             </div>
//         </div>
//     </div>

// )

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
            <line x1="2" x2="5" y1="12" y2="12" />
            <line x1="19" x2="22" y1="12" y2="12" />
            <line x1="12" x2="12" y1="2" y2="5" />
            <line x1="12" x2="12" y1="19" y2="22" />
            <circle cx="12" cy="12" r="7" />
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
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}

function CellIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>)
}

function EmailIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
    )
}