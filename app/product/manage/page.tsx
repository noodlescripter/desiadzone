"use client"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useSession } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import BZAlert from "@/components/others/bzaltert"
import axios from "axios"
import { getStorage, ref, deleteObject } from "firebase/storage";
import {cloudinaryConfig} from "@/components/cloudinary/cloudinary";
import {Spinner} from "@/components/ui/spinner";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";


export default function Component() {
    const { session } = useSession();
    const [userSessionData, setUserSessionData] = useState({
        userId: "",
        firstName: "",
        lastName: "",
        isLoggedIn: false,
        emailAddress: ""
    });
    const [sCode, setScode] = useState("");
    const [getUserAds, setUserAds] = useState([]);
    const [alert, setAlert] = useState({
        variant: "",
        title: "",
        desc: "",
        show: null
    })
    useEffect(() => {
        if (session !== null && session?.user.firstName) {
            console.log(session.user.id);
            setUserSessionData({
                userId: session.user.id,
                isLoggedIn: true, // Ensure this is correctly set to true
                firstName: session.user.firstName,
                lastName: session.user.lastName || "",
                emailAddress: session.user.emailAddresses[0]?.emailAddress || "",
            });
        }
    }, [session]);

    useEffect(() => {
        const fetchUserAds = async () => {
            if (userSessionData.userId) {
                try {
                    const res = await axios.get(`http://localhost:5100/ads/${userSessionData.userId}/manageAds`);
                    setUserAds(res.data);
                    console.log(res.data)
                } catch (error) {           
                    console.error('Error fetching user ads:', error);
                }
            }
        };
        fetchUserAds();
    }, [userSessionData.userId]);

    if (!userSessionData.isLoggedIn) {
        return <Spinner></Spinner>
    }

    async function deleteRequestedProduct(productId: String){
        try {
            const product = getUserAds.filter((add) => add._id === productId);
            console.log(product)
            if(!product){
                console.error('Product not found');
                setScode("error");
                return;
            }
            const res = await axios.post(`http://localhost:5100/ads/${productId}/manageAds/delete`);
            const statusCode = res.status;
            if(statusCode === 200){
                console.log('Deleted fine');
                window.location.reload();
                setAlert({
                    show: true, desc: "Ad Deleted!!", variant: "success", title: "Deleted"
                })

            } else {
                console.log('Error while deleting')
                window.location.reload();
                setAlert({
                    show: true, desc: "Could not delete the ad", variant: "error", title: "Error"
                })
            }

        } catch(error){

        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto py-8">
            <BZAlert variant={alert.variant} title={alert.title} show={alert.show} desc={alert.desc}></BZAlert>
            <div className="flex items-center justify-between m-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/product/manage`}>Manage Ad</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Link
                    href="/postlisting"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    prefetch={false}
                >
                    Create New Ad
                </Link>
            </div>
            <div className="space-y-4">
                {
                    getUserAds.map((product) => (
                        <>
                            <Card key={product._id}>
                                <CardHeader>
                                    <CardTitle>{product.title}</CardTitle>
                                    <CardDescription>Created at: {product.createdAt}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img
                                        src={product.photoURLs[0].url}
                                        alt="Acme Summer Sale"
                                        width="600"
                                        height="300"
                                        className="rounded-md"
                                        style={{ aspectRatio: "600/300", objectFit: "cover" }}
                                    />
                                </CardContent>
                                <CardFooter className="flex items-center justify-between">
                                    <div />
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="icon">
                                                <TrashIcon className="h-5 w-5" />
                                                <span className="sr-only">Delete Ad</span>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete the ad.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => deleteRequestedProduct(product._id)}>Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </CardFooter>
                            </Card>
                        </>
                    ))
                }

            </div>
        </div>
    )
}

function TrashIcon(props) {
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
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    )
}