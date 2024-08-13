"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { useEffect, useState } from "react";
import axios from "axios";

export default function LandingPage() {
      const [featuredProducts, setFeaturedProducts] = useState([])
      useEffect(() => {
            const getProduct = async function () {
                  const res = await axios.get(`http://localhost:5100/ads/allads`);
                  if (res) {
                        setFeaturedProducts(res.data);
                  }
            }
            getProduct()
      }, []);
      return (
            <main className="flex-1">
                  <section className="w-full py-12 md:py-24 lg:py-32">
                        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6">
                              <div className="flex flex-col justify-center space-y-4">
                                    <div className="space-y-2">
                                          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                                Discover the Best Products for Your Needs
                                          </h1>
                                          <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                                Browse our wide selection of high-quality products and find the perfect fit for your lifestyle.
                                          </p>
                                    </div>
                                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                          <Link href={"/adlisting"}>
                                                <Button size="sm">Explore Products</Button>
                                          </Link>

                                          <Link href={"/postlisting"}>
                                                <Button variant="outline" size="sm">
                                                      Post an Ad
                                                </Button></Link>
                                    </div>
                              </div>
                              <div>
                                    <Carousel
                                          opts={{ align: "start", loop: true, autoplay: true, interval: 5000 }}
                                          className="w-full h-[400px] rounded-lg overflow-hidden"
                                    >
                                          <CarouselContent>
                                                <CarouselItem>
                                                      <img
                                                            src="https://firebasestorage.googleapis.com/v0/b/bangla-bazaar.appspot.com/o/photos%2Fpexels-mikebirdy-170811.jpg?alt=media&token=fdd4632d-d4d3-4fa4-92ad-97b3cb93af4d"
                                                            width="800"
                                                            height="400"
                                                            alt="Product 1"
                                                            className="w-full h-full object-cover"
                                                      />
                                                </CarouselItem>
                                                <CarouselItem>
                                                      <img
                                                            src="/placeholder.svg"
                                                            width="800"
                                                            height="400"
                                                            alt="Product 2"
                                                            className="w-full h-full object-cover"
                                                      />
                                                </CarouselItem>
                                                <CarouselItem>
                                                      <img
                                                            src="/placeholder.svg"
                                                            width="800"
                                                            height="400"
                                                            alt="Product 3"
                                                            className="w-full h-full object-cover"
                                                      />
                                                </CarouselItem>
                                          </CarouselContent>
                                    </Carousel>
                              </div>
                        </div>
                  </section>
                  <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                        <div className="container px-4 md:px-6">
                              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                    <div className="space-y-2">
                                          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Browse by Category</h2>
                                          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                                Explore our wide range of product categories to find exactly what you're looking for.
                                          </p>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                          <Link
                                                href="/product/category/automotive"
                                                className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-4 hover:bg-accent hover:text-accent-foreground"
                                                prefetch={false}
                                          >
                                                <AutomotiveIcon className="h-8 w-8" />
                                                <span className="text-sm font-medium group-hover:underline">Automotive</span>
                                          </Link>
                                          <Link
                                                href="#"
                                                className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-4 hover:bg-accent hover:text-accent-foreground"
                                                prefetch={false}
                                          >
                                                <HousingRentIcon className="h-8 w-8" />
                                                <span className="text-sm font-medium group-hover:underline">Rent</span>
                                          </Link>
                                          <Link
                                                href="#"
                                                className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-4 hover:bg-accent hover:text-accent-foreground"
                                                prefetch={false}
                                          >
                                                <HomeIcon className="h-8 w-8" />
                                                <span className="text-sm font-medium group-hover:underline">Real Estate</span>
                                          </Link>
                                          <Link
                                                href="#"
                                                className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-4 hover:bg-accent hover:text-accent-foreground"
                                                prefetch={false}
                                          >
                                                <FoodIcon className="h-8 w-8" />
                                                <span className="text-sm font-medium group-hover:underline">Foods</span>
                                          </Link>
                                    
                                          <Link
                                                href="#"
                                                className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-4 hover:bg-accent hover:text-accent-foreground"
                                                prefetch={false}
                                          >
                                                <JobIcon className="h-8 w-8" />
                                                <span className="text-sm font-medium group-hover:underline">Jobs</span>
                                          </Link>

                                          <Link
                                                href="#"
                                                className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-4 hover:bg-accent hover:text-accent-foreground"
                                                prefetch={false}
                                          >
                                                <AllIcon className="h-8 w-8" />
                                                <span className="text-sm font-medium group-hover:underline">All Other</span>
                                          </Link>
                              
                                    </div>
                              </div>
                        </div>
                  </section>
                  <section className="w-full py-12 md:py-24 lg:py-32">
                        <div className="container px-4 md:px-6">
                              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                    <div className="space-y-2">
                                          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Products</h2>
                                          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                                Discover our top-selling and most popular products.
                                          </p>
                                    </div>

                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                                    {
                                          featuredProducts.slice(0, 4).map((product, index) => (
                                                <>
                                                      <Card key={index}>
                                                            <CardHeader>
                                                                  <img
                                                                        src={product.photoURLs[0].url}
                                                                        width="300"
                                                                        height="200"
                                                                        alt="Product 1"
                                                                        className="w-full h-[200px] object-cover rounded-t-lg"
                                                                  />
                                                            </CardHeader>
                                                            <CardContent className="p-4">
                                                                  <div className="flex items-center justify-between">
                                                                        <h3 className="text-lg font-medium">{product.title}</h3>
                                                                        <span className="text-primary font-medium">${product.price}</span>
                                                                  </div>
                                                                  <p className="text-muted-foreground text-sm line-clamp-2">
                                                                        {product.description}
                                                                  </p>
                                                            </CardContent>
                                                            <CardFooter className="pt-4">
                                                                  <Button size="sm" className="w-full">
                                                                        View Product
                                                                  </Button>
                                                            </CardFooter>
                                                      </Card>
                                                </>
                                          ))
                                    }
                              </div>
                        </div>
                  </section>
            </main>
      )
}

function CircuitBoardIcon(props) {
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
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M11 9h4a2 2 0 0 0 2-2V3" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="M7 21v-4a2 2 0 0 1 2-2h4" />
                  <circle cx="15" cy="15" r="2" />
            </svg>
      )
}


function ClubIcon(props) {
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
                  <path d="M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z" />
                  <path d="M12 17.66L12 22" />
            </svg>
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


function GemIcon(props) {
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
                  <path d="M6 3h12l4 6-10 13L2 9Z" />
                  <path d="M11 3 8 9l4 13 4-13-3-6" />
                  <path d="M2 9h20" />
            </svg>
      )
}


function HomeIcon(props) {
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
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
      )
}


function MountainIcon(props) {
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
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
            </svg>
      )
}


function MusicIcon(props) {
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
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
            </svg>
      )
}


function ToyBrickIcon(props) {
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
                  <rect width="18" height="12" x="3" y="8" rx="1" />
                  <path d="M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3" />
                  <path d="M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3" />
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

function JobIcon(props){
      return (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z"/></svg>
      )
}

function AllIcon(props){
      return (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h80v-80h-80v80Zm160 0h80v-80h-80v80Zm160 0h80v-80h-80v80Zm160 0h80v-80h-80v80ZM200-680h80v-80h-80v80Zm0 160h80v-80h-80v80Zm0 160h80v-80h-80v80Zm160-320h80v-80h-80v80Zm0 160h80v-80h-80v80Zm0 160h80v-80h-80v80Zm160-320h80v-80h-80v80Zm0 160h80v-80h-80v80Zm0 160h80v-80h-80v80Zm160-320h80v-80h-80v80Zm0 160h80v-80h-80v80Zm0 160h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"/></svg>
      )
}

function FoodIcon(props){
      return (
            <svg{...props} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366h-80Zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800h-80Z"/></svg>
      )
}

function HousingRentIcon(props){
      return (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-120v-560h160v-160h400v320h160v400H520v-160h-80v160H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z"/></svg>
      )
}
function AutomotiveIcon(props) {
      return (
<svg {...props}xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-200v40q0 17-11.5 28.5T200-120h-40q-17 0-28.5-11.5T120-160v-320l84-240q6-18 21.5-29t34.5-11h440q19 0 34.5 11t21.5 29l84 240v320q0 17-11.5 28.5T800-120h-40q-17 0-28.5-11.5T720-160v-40H240Zm-8-360h496l-42-120H274l-42 120Zm-32 80v200-200Zm100 160q25 0 42.5-17.5T360-380q0-25-17.5-42.5T300-440q-25 0-42.5 17.5T240-380q0 25 17.5 42.5T300-320Zm360 0q25 0 42.5-17.5T720-380q0-25-17.5-42.5T660-440q-25 0-42.5 17.5T600-380q0 25 17.5 42.5T660-320Zm-460 40h560v-200H200v200Z"/></svg>      )
}
