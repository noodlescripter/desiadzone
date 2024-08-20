"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { CardContent, CardDescription, CardFooter, CardHeader, Card } from "@/components/ui/card";

export default function Adslisting() {
  const [ads, setAds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [filterCategory, setFilterCategory] = useState("");
  const observerRef = useRef(null);
  const URL = process.env.BACK_END_URL;

  useEffect(() => {
    const getAds = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_END_URL}/ads/allads`);
        setAds(response.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    getAds();
  }, []);

  const filteredAds = ads
    .filter((ad) => {
      return (
        ad.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === "" || ad.category.toLowerCase() === filterCategory.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price;
      } else if (sortBy === "location") {
        return a.city.localeCompare(b.city);
      } else {
        return 0;
      }
    });

  function HomeIcon(props: any) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" /></svg>
    )
  }

  function ListIcon(props: any) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z" /></svg>
    )
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <div className={"flex flex-auto content-start text-xs m-3"}>
      </div>
      <div className="flex items-center justify-between mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="p-2" href="/"><HomeIcon></HomeIcon></BreadcrumbLink>
            </BreadcrumbItem>
           {/*  <BreadcrumbSeparator /> */}
            {/* <BreadcrumbItem>
              <BreadcrumbLink href="/adlisting"><ListIcon></ListIcon></BreadcrumbLink>
            </BreadcrumbItem> */}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search ads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-md border border-input focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <FilterIcon className="w-4 h-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="location">Location</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filterCategory === ""}
                onCheckedChange={() => setFilterCategory("")}
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterCategory === "Real Estate"}
                onCheckedChange={() => setFilterCategory("Real Estate")}
              >
                Real Estate
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterCategory === "Housing"}
                onCheckedChange={() => setFilterCategory("Housing")}
              >
                Housing/Rent
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterCategory === "Automotive"}
                onCheckedChange={() => setFilterCategory("Automotive")}
              >
                Automotive
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterCategory === "Food & Drink"}
                onCheckedChange={() => setFilterCategory("Food & Drink")}
              >
                Food & Drink
              </DropdownMenuCheckboxItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
        {filteredAds.map((ad, index) => (
          <Card key={index} className="bg-white rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={ad.photoURLs[0].url}
              alt={ad.title}
              width={400}
              height={300}
              className="object-cover w-full h-48"
              style={{ aspectRatio: "400/300", objectFit: "cover" }}
            />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-bold mb-2">{ad.title}</h2>
                <span className="text-primary font-medium">${ad.price}.00</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{ad.description}</p>
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
                  <Link href={`/product/${ad._id}`} className="w-full">
                    <Button size="sm" variant="default" color="red" className="rounded-2xl">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>


          /*  <Card key={index} className="flex flex-col h-full">
             <CardHeader>
               <img
                 src={ad.photoURLs[0].url}
                 width="300"
                 height="200"
                 alt="Product 1"
                 className="w-full h-[200px] object-cover rounded-t-lg"
               />
             </CardHeader>
             <CardContent className="p-4 flex-grow">
               <div className="flex items-center justify-between">
                 <h3 className="text-lg font-medium">{ad.title}</h3>
                 <span className="text-primary font-medium">${ad.price}.00</span>
               </div>
               <p className="text-muted-foreground text-sm line-clamp-2">
                 {ad.description}
               </p>
             </CardContent>
             <CardFooter className="mt-auto pt-4">
               <Link className="w-full" href={`/product/${ad._id}`}>
                 <Button className="sm w-full">View</Button>
               </Link>
             </CardFooter>
           </Card> */

        ))}
      </div>
      <div ref={observerRef} className="h-4"></div>
    </div>
  );
}

function FilterIcon(props) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
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
  );
}
