"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const initialAds = [
  {
    id: 1,
    image: "/placeholder.svg",
    title: "Luxury Apartment in Downtown",
    description: "Spacious 2-bedroom apartment with stunning city views.",
    price: 2500,
    location: "New York, NY",
    category: "Real Estate",
  },
  {
    id: 2,
    image: "/placeholder.svg",
    title: "Handcrafted Wooden Furniture",
    description: "Unique and durable furniture pieces for your home.",
    price: 500,
    location: "Los Angeles, CA",
    category: "Home & Garden",
  },
  {
    id: 3,
    image: "/placeholder.svg",
    title: "Vintage Sports Car for Sale",
    description: "Fully restored 1967 Mustang in excellent condition.",
    price: 35000,
    location: "Chicago, IL",
    category: "Automotive",
  },
  {
    id: 4,
    image: "/placeholder.svg",
    title: "Organic Produce Delivery",
    description: "Fresh, locally-sourced fruits and vegetables delivered weekly.",
    price: 50,
    location: "Seattle, WA",
    category: "Food & Drink",
  },
  {
    id: 5,
    image: "/placeholder.svg",
    title: "Handmade Pottery Collection",
    description: "Unique ceramic pieces crafted by a local artist.",
    price: 100,
    location: "Austin, TX",
    category: "Arts & Crafts",
  },
  {
    id: 6,
    image: "/placeholder.svg",
    title: "Vintage Clothing Boutique",
    description: "Curated selection of high-quality vintage fashion.",
    price: 75,
    location: "Portland, OR",
    category: "Apparel",
  },
]

export default function Adslisting() {
  const [ads, setAds] = useState(initialAds)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("price")
  const [filterCategory, setFilterCategory] = useState("")
  const observerRef = useRef(null)

  const loadMoreAds = useCallback(() => {
    // Simulate loading more ads from a server
    const newAds = [
      {
        id: ads.length + 1,
        image: "/placeholder.svg",
        title: `New Ad ${ads.length + 1}`,
        description: "Description for new ad.",
        price: 100 + ads.length * 10,
        location: "New Location",
        category: "New Category",
      },
      {
        id: ads.length + 2,
        image: "/placeholder.svg",
        title: `New Ad ${ads.length + 2}`,
        description: "Description for new ad.",
        price: 200 + ads.length * 10,
        location: "New Location",
        category: "New Category",
      },
    ]
    setAds((prevAds) => [...prevAds, ...newAds])
  }, [ads])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreAds()
        }
      },
      { threshold: 1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [loadMoreAds])

  const filteredAds = ads
    .filter((ad) => {
      return (
        ad.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === "" || ad.category === filterCategory)
      )
    })
    .sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price
      } else if (sortBy === "location") {
        return a.location.localeCompare(b.location)
      } else {
        return 0
      }
    })

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Ads Listing</h1>
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
              <DropdownMenuCheckboxItem checked={filterCategory === ""} onCheckedChange={() => setFilterCategory("")}>
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterCategory === "Real Estate"}
                onCheckedChange={() => setFilterCategory("Real Estate")}
              >
                Real Estate
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterCategory === "Home & Garden"}
                onCheckedChange={() => setFilterCategory("Home & Garden")}
              >
                Home & Garden
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
              <DropdownMenuCheckboxItem
                checked={filterCategory === "Arts & Crafts"}
                onCheckedChange={() => setFilterCategory("Arts & Crafts")}
              >
                Arts & Crafts
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterCategory === "Apparel"}
                onCheckedChange={() => setFilterCategory("Apparel")}
              >
                Apparel
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAds.map((ad) => (
          <div key={ad.id} className="bg-background rounded-lg shadow-md overflow-hidden">
            <img src={ad.image} alt={ad.title} width={400} height={300} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{ad.title}</h3>
              <p className="text-muted-foreground mb-4">{ad.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-primary font-bold">${ad.price}</div>
                <Button size="sm">View Ad</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div ref={observerRef} className="h-4"></div>
    </div>
  )
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
  )
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
