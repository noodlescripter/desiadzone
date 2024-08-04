/**
 * v0 by Vercel.
 * @see https://v0.dev/t/y7wO1u9U98q
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from 'react';
import { storage } from '@/components/firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import { useSession } from "@clerk/nextjs"
import axios from "axios"

export default function Component() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { session } = useSession();

  //check point for user if they are logged in
  useEffect(() => {
    //is user logged in 
    console.log('user session: ', session)
    if (session != null && session.user.firstName) {
      setUserLoggedIn(true);
    }

  }, [session]);

  /* User ads posting */
  const [adsData, setAdsData] = useState({
    isUserLoggedIn: session ? true : false,
    //optional
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    category: '',
    phoneNumber: '',
    price: ''
  })

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setAdsData({
      ...adsData,
      [name]: value
    })
  }

  const handlePosting = async (e: any) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:5000/ads/posting', adsData, {
        headers: {
          "Content-Length":"multipart/formdata"
        }
      })  
    } catch(error) {

    }
  };

  const handleUpload = async (adsData: string) => {
    if (!file) return;
    try {
      const options = {
        maxSizeMB: 0.02, // Max file size in MB (20 KB)
        maxWidthOrHeight: 1920, // Max width/height
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const storageRef = ref(storage, `photos/${compressedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, compressedFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Upload failed:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDownloadURL(url);
          });
        }
      );
    } catch (error) {
      console.error('Compression failed:', error);
    }
  };

  if (!userLoggedIn) {
    return (
      <div>
        <div>
          <h1>Sorry sir/mam you are not logged in to use this service</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h1 className="text-3xl font-bold">Add Listing</h1>
        <div className="flex gap-2">
          <Button variant="outline">Discard</Button>
          <Button onClick={handlePosting}>Save Listing</Button>
        </div>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="address" className="text-sm font-medium">
                Address
              </Label>
              <Input id="address" placeholder="123 Main St" value={adsData.address} name="address" onChange={handleFormChange} required/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city" className="text-sm font-medium">
                City
              </Label>
              <Input id="city" placeholder="San Francisco"
                name="city"
                value={adsData.city}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="state" className="text-sm font-medium">
                State
              </Label>
              <Input id="state" placeholder="CA"
                name="state"
                value={adsData.state}
                onChange={handleFormChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="zip" className="text-sm font-medium">
                Zip Code
              </Label>
              <Input id="zip" placeholder="94101"
                name="zipCode"
                value={adsData.zipCode}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phoneNumber" className="text-sm font-medium">
              Phone Number
            </Label>
            <Input id="phoneNumber" type="number" placeholder="+1"
              name="phoneNumber"
              value={adsData.phoneNumber}
              onChange={handleFormChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bedrooms" className="text-sm font-medium">
              Category
            </Label>
            <Select id="categories"
              name="categories"
              value={adsData.category}
              onValueChange={handleFormChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Electronics</SelectItem>
                <SelectItem value="2">Fasion</SelectItem>
                <SelectItem value="3">Housing</SelectItem>
                <SelectItem value="4">Beauty</SelectItem>
                <SelectItem value="5">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* <div className="grid gap-2">
            <Label htmlFor="bathrooms" className="text-sm font-medium">
              Bathrooms
            </Label>
            <Select id="bathrooms">
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          {/* <div className="grid gap-2">
            <Label htmlFor="square-footage" className="text-sm font-medium">
              Square Footage
            </Label>
            <Input id="square-footage" type="number" placeholder="2,000" />
          </div> */}
          <div className="grid gap-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Price
            </Label>
            <Input id="price" type="number" placeholder="$500,000"
              name="price"
              value={adsData.price}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea id="description" rows={5} placeholder="Describe your property..."
              name="description"
              value={adsData.description}
              onChange={handleFormChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="images" className="text-sm font-medium">
              Upload Images
            </Label>
            <Input id="images" type="file" onChange={handleFileChange} multiple />
          </div>
        </div>
      </form>
    </div>
  )
}