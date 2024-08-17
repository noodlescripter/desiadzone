"use client";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {useEffect, useState} from 'react';
import {storage} from '@/components/firebase/firebase';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import {useSession} from "@clerk/nextjs";
import axios from "axios";
import {Spinner} from "@/components/ui/spinner";
import {set} from "@firebase/database";
import {cloudinaryConfig} from '@/components/cloudinary/cloudinary'
import BZAlert from "@/components/others/bzaltert";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

export default function Component() {
    const server_url = process.env.NEXT_PUBLIC_BACK_END_URL;
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState([]);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const {session} = useSession();
    const [saveButton, setSaveButton] = useState(false);
    const [userId, setUserId] = useState(null);
    const [spinnerShow, setSpinnerShow] = useState(false);
    let [photo, setPhotos] = useState([]);
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')

    const [alert, setAlert] = useState({
        variant: "",
        title: "",
        desc: "",
        show: null
    });
    // Check if user is logged in
    useEffect(() => {
        if (session != null && session.user.firstName) {
            console.log(session)
            setUserLoggedIn(true);
            setUserId(session.user.id);
            setUserName(session.publicUserData.firstName);
            setEmail(session.publicUserData.identifier);
        }
    }, [session]);

    // Initialize adsData state
    const [adsData, setAdsData] = useState({
        isUserLoggedIn: !!session,
        userId: '',
        title: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        description: '',
        category: '',
        phoneNumber: '',
        price: '',
        email: '',
        userName: ''
    });

    // Update adsData when userLoggedIn changes
    useEffect(() => {
        setAdsData(prevData => ({
            ...prevData,
            isUserLoggedIn: userLoggedIn,
            userId: userId,
            email:  email,
            userName: userName
        }));
    }, [userLoggedIn, userId, email, userName]);

    // Handle file change
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files).slice(0, 3);
        setFiles(selectedFiles);
    };

    // Handle form change
    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setAdsData({
            ...adsData,
            [name]: value
        });
    };

    // Check if all required fields are filled
    const allFieldsFilled = () => {
        for (let key in adsData) {
            if (adsData[key] === '') {
                return false;
            }
        }
        return true
    };

    // Update save button state based on form validity
    useEffect(() => {
        setSaveButton(allFieldsFilled());
    }, [adsData, files]);


    const handleUpload = async () => {
        let uploadedUrls = [];
    
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const options = {
                maxSizeMB: 0.02,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };
    
            try {
                const time = Math.floor(Date.now() / 1000);
                console.log('Timestamp:', time); // Debugging line
    
                const compressedFile = await imageCompression(file, options);
                const formData = new FormData();
                formData.append('file', compressedFile);
                formData.append('api_key', cloudinaryConfig.api_key);
    
                // Convert time to string before appending
                formData.append('timestamp', time.toString());
                formData.append('folder', cloudinaryConfig.folder);
    
                // Generate signature (assuming it's done server-side)
                const signature = cloudinaryConfig.generateSignature({
                    timestamp: time,
                    folder: cloudinaryConfig.folder,
                });
                formData.append('signature', signature);
    
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`,
                    formData
                );
    
                if (response.status === 200) {
                    const res = response.data;
                    console.log('Uploaded to Cloudinary:', res);
                    uploadedUrls.push({ url: res.secure_url, imageKey: res.public_id });
                } else {
                    console.error('Error uploading to Cloudinary:', response);
                }
            } catch (e) {
                console.error('Error during file upload:', e);
            }
        }
    
        console.log(uploadedUrls, "from handle upload");
    
        // Send the uploaded URLs to your server
        try {
            await axios.post(`${server_url}/ads/posting/getImageUrls`, { imageData: uploadedUrls });
        } catch (error) {
            console.error('Error posting image URLs to server:', error);
        }
    };
    

    // Handle posting ad
    const handlePosting = async () => {
        try {
            setSpinnerShow(true)
            setTimeout(async () => {
                await handleUpload();
                console.log(adsData)
                const res = await axios.post(`${server_url}/ads/posting`, adsData, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (res.status === 200) {
                    setAlert({
                        variant: "success",
                        title: "Success",
                        desc: "Ads uploaded successfully",
                        show: true
                    })
                    console.log('uploaded succesfully')
                } else {
                    setAlert({
                        variant: "error",
                        title: "Error",
                        desc: "Something happened. Please try again",
                        show: true
                    })
                    console.log('nothing happended')
                }
                setSpinnerShow(false)
                handleDiscard()
            }, 2000)

        } catch (error) {
            console.log(error)
        }
    };


    const handleDiscard = () => {
        try {
            setAdsData({
                isUserLoggedIn: !!session,
                userId: '',
                title: '',
                address: '',
                city: '',
                state: '',
                zipCode: '',
                description: '',
                category: '',
                phoneNumber: '',
                price: '',
                email: email,
                userName: userName
            })
        } catch (error) {

        }
    }

    if (!userLoggedIn) {
        return (
            <div>
                <Spinner></Spinner>
            </div>
        );
    }

    

    return (
        <div className="container shadow-2xl max-w-4xl mx-auto p-6 sm:p-8 md:p-10 mt-10 mb-10">
            <div className="content-center text-sa">
                <Spinner size={"large"} show={spinnerShow}></Spinner>
                <BZAlert variant={alert.variant} title={alert.title} desc={alert.desc} show={alert.show}></BZAlert>
            </div>
            <div className="flex items-center justify-between mb-6 sm:mb-8">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/adlisting">All Ads</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/postlisting`}>Post Ad</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleDiscard}>Discard</Button>
                    <Button onClick={handlePosting} disabled={!saveButton}>Post Ad</Button>
                </div>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-sm font-medium">
                            Title
                        </Label>
                        <Input id="title" name="title" placeholder="Ad title" value={adsData.title}
                               onChange={handleFormChange} required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="address" className="text-sm font-medium">
                            Address
                        </Label>
                        <Input id="address" name="address" placeholder="123 Main St" value={adsData.address}
                               onChange={handleFormChange} required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="city" className="text-sm font-medium">
                            City
                        </Label>
                        <Input id="city" name="city" placeholder="New York" value={adsData.city}
                               onChange={handleFormChange} required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="state" className="text-sm font-medium">
                            State
                        </Label>
                        <Input id="state" name="state" placeholder="CA" value={adsData.state}
                               onChange={handleFormChange} required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="zipCode" className="text-sm font-medium">
                            Zip Code
                        </Label>
                        <Input id="zipCode" name="zipCode" placeholder="94101" value={adsData.zipCode}
                               onChange={handleFormChange} required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phoneNumber" className="text-sm font-medium">
                            Phone Number
                        </Label>
                        <Input id="phoneNumber" type="number" name="phoneNumber" placeholder="+1"
                               value={adsData.phoneNumber} onChange={handleFormChange} required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category" className="text-sm font-medium">
                            Category
                        </Label>
                        <Select name="category" value={adsData.category}
                                onValueChange={(value) => handleFormChange({target: {name: 'category', value}})}
                                required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="realestate">Real Estate</SelectItem>
                                <SelectItem value="rent">Housing/Rent</SelectItem>
                                <SelectItem value="automotive">Automotive</SelectItem>
                                <SelectItem value="foods">Food & Drinks</SelectItem>
                                <SelectItem value="others">Others</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="price" className="text-sm font-medium">
                            Price
                        </Label>
                        <Input id="price" type="number" name="price" placeholder="$500,000" value={adsData.price}
                               onChange={handleFormChange} required/>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="description" className="text-sm font-medium">
                            Description
                        </Label>
                        <Textarea id="description" name="description" rows={5} placeholder="Describe your property..."
                                  value={adsData.description} onChange={handleFormChange} required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="images" className="text-sm font-medium">
                            Upload Images (up to 3)
                        </Label>
                        <Input id="images" type="file" multiple onChange={handleFileChange} required/>
                    </div>
                </div>

            </form>
        </div>
    );
}
