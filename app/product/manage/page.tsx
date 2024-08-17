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
import { cloudinaryConfig } from "@/components/cloudinary/cloudinary";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
                    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_END_URL}/ads/${userSessionData.userId}/manageAds`);
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

    async function deleteRequestedProduct(productId: String) {
        try {
            const product = getUserAds.filter((ad) => ad._id === productId);
            console.log(product)
            if (!product) {
                console.error('Product not found');
                setScode("error");
                return;
            }
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_END_URL}/ads/${productId}/manageAds/delete`);
            const statusCode = res.status;
            if (statusCode === 200) {
                console.log('Deleted fine');
                setUserAds(getUserAds.filter((ad) => ad._id !== productId))
                setAlert({
                    show: true, desc: "Ad Deleted!!", variant: "success", title: "Deleted"
                })

            } else {
                console.log('Error while deleting')
                setAlert({
                    show: true, desc: "Could not delete the ad", variant: "error", title: "Error"
                })
            }
        } catch (error) {
            setAlert({
                show: true, desc: "Could not delete the ad", variant: "error", title: "Error"
            })
        }
    }

    async function handleSold(productId: String) {
        try {
            const product = getUserAds.filter((ad) => ad._id === productId);
            if (!product) {
                console.error('Product not found');
                setScode("error");
                return;
            }
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_END_URL}/ads/${productId}/manageAds/updatestatus/sold`);
            if (!res){
                setAlert({
                    show: true, desc: "Could not update the ad", variant: "error", title: "Update Error"
                })
            }
            setAlert({
                show: true, desc: "Ad marked as SOLD!", variant: "success", title: "Updated"
            })
            await allAdsAfterUpdate();
            
        } catch (error) {
        
            setAlert({
                show: true, desc: "Could not update the ad", variant: "error", title: "Error"
            })
         }
    }

    async function allAdsAfterUpdate(){
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_END_URL}/ads/${userSessionData.userId}/manageAds`);
            setUserAds(res.data);
            console.log(res.data)
        } catch (error) {
            console.error('Error fetching user ads:', error);
        }
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
        <div className="w-full max-w-4xl mx-auto py-8">
            <BZAlert variant={alert.variant} title={alert.title} show={alert.show} desc={alert.desc}></BZAlert>
            <div className="flex items-center justify-between m-6">
                <Breadcrumb>
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
                            <BreadcrumbLink href={`/product/manage`}>Manage Ad</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Link
                    href="/postlisting"
                    prefetch={false}
                >
                    <Button size="sm">List Item</Button>
                </Link>
            </div>
            {/* <div className="space-y-4">
                {
                    getUserAds.map((product) => (
                        <>
                            <Card key={product._id}>
                                <CardHeader>
                                    <CardTitle>{product.title}</CardTitle>
                                    <CardDescription>Created on: {product.createdAt.slice(0, 10)}</CardDescription>
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

            </div> */}
            <div className="container mx-auto pt-2 pb-12 px-7">
                {getUserAds.map((ad) => (
                    <Card key={ad.id} className="bg-white shadow-md rounded-lg overflow-hidden mt-8">
                        <img
                            src={ad.photoURLs[0].url}
                            alt={ad.title}
                            width={400}
                            height={300}
                            className="object-cover w-full h-48"
                            style={{ aspectRatio: "400/300", objectFit: "cover" }}
                        />
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold mb-2">{ad.title}</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">{ad.description.slice(0, 20)}...</p>
                            <div className="flex items-center justify-between">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${ad.status === "Active"
                                        ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                                        : "bg-red-100 text-red-600 dark:text-red-400"
                                        }`}
                                >
                                    {ad.status}
                                </span>

                                <div className="flex gap-2">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            {ad.status === "Active" && (
                                                <Button size="sm" variant="outline">
                                                    Mark as Sold
                                                </Button>
                                            )}
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Yay! You have made a sell!</AlertDialogTitle>
                                                <p className="text-sm text-yellow-600">This action cannot be undone. This will permanently mark the ad as sold.</p>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogCancel className="bg-green-700" onClick={()=> handleSold(ad._id)}>Sold</AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button size="sm" variant="destructive" color="red">
                                                Delete
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                                                <p className="text-sm text-yellow-600">This action cannot be undone. This will permanently delete the ad.</p>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogCancel className="bg-red-600" onClick={() => deleteRequestedProduct(ad._id)}>Delete</AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>


                            </div>
                        </CardContent>
                    </Card>
                ))}
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