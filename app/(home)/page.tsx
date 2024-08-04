import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

export default function LandingPage() {
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

                                          <Button variant="outline" size="sm">
                                                Post an Ad
                                          </Button>
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
                                                href="#"
                                                className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-4 hover:bg-accent hover:text-accent-foreground"
                                                prefetch={false}
                                          >
                                                <CircuitBoardIcon className="h-8 w-8" />
                                                <span className="text-sm font-medium group-hover:underline">Electronics</span>
                                          </Link>
                                          <Link
                                                href="#"
                                                className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-4 hover:bg-accent hover:text-accent-foreground"
                                                prefetch={false}
                                          >
                                                <MusicIcon className="h-8 w-8" />
                                                <span className="text-sm font-medium group-hover:underline">Fashion</span>
                                          </Link>
                                          <Link
                                                href="#"
                                                className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-4 hover:bg-accent hover:text-accent-foreground"
                                                prefetch={false}
                                          >
                                                <HomeIcon className="h-8 w-8" />
                                                <span className="text-sm font-medium group-hover:underline">Home</span>
                                          </Link>
                                          <Link
                                                href="#"
                                                className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-4 hover:bg-accent hover:text-accent-foreground"
                                                prefetch={false}
                                          >
                                                <ClubIcon className="h-8 w-8" />
                                                <span className="text-sm font-medium group-hover:underline">Sports</span>
                                          </Link>
                                          <Link
                                                href="#"
                                                className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-4 hover:bg-accent hover:text-accent-foreground"
                                                prefetch={false}
                                          >
                                                <GemIcon className="h-8 w-8" />
                                                <span className="text-sm font-medium group-hover:underline">Beauty</span>
                                          </Link>
                                          <Link
                                                href="#"
                                                className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-4 hover:bg-accent hover:text-accent-foreground"
                                                prefetch={false}
                                          >
                                                <ToyBrickIcon className="h-8 w-8" />
                                                <span className="text-sm font-medium group-hover:underline">Toys</span>
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
                                    {/* <div className="flex items-center gap-2 w-full">
                                          <div className="flex-1">
                                                <Input
                                                      type="search"
                                                      placeholder="Search products..."
                                                      className="w-full rounded-lg bg-background pl-8"
                                                />
                                          </div>
                                          <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                      <Button variant="outline" size="sm" className="h-10 gap-1">
                                                            <FilterIcon className="h-4 w-4" />
                                                            <span>Filter</span>
                                                      </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                                      <DropdownMenuSeparator />
                                                      <DropdownMenuCheckboxItem checked>Price: Low to High</DropdownMenuCheckboxItem>
                                                      <DropdownMenuCheckboxItem>Price: High to Low</DropdownMenuCheckboxItem>
                                                      <DropdownMenuCheckboxItem>Newest First</DropdownMenuCheckboxItem>
                                                      <DropdownMenuCheckboxItem>Oldest First</DropdownMenuCheckboxItem>
                                                </DropdownMenuContent>
                                          </DropdownMenu>
                                    </div> */}
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                                    <Card>
                                          <CardHeader>
                                                <img
                                                      src="/placeholder.svg"
                                                      width="300"
                                                      height="200"
                                                      alt="Product 1"
                                                      className="w-full h-[200px] object-cover rounded-t-lg"
                                                />
                                          </CardHeader>
                                          <CardContent className="p-4">
                                                <div className="flex items-center justify-between">
                                                      <h3 className="text-lg font-medium">Product 1</h3>
                                                      <span className="text-primary font-medium">$49.99</span>
                                                </div>
                                                <p className="text-muted-foreground text-sm line-clamp-2">
                                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                </p>
                                          </CardContent>
                                          <CardFooter className="pt-4">
                                                <Button size="sm" className="w-full">
                                                      Add to Cart
                                                </Button>
                                          </CardFooter>
                                    </Card>
                                    <Card>
                                          <CardHeader>
                                                <img
                                                      src="/placeholder.svg"
                                                      width="300"
                                                      height="200"
                                                      alt="Product 2"
                                                      className="w-full h-[200px] object-cover rounded-t-lg"
                                                />
                                          </CardHeader>
                                          <CardContent className="p-4">
                                                <div className="flex items-center justify-between">
                                                      <h3 className="text-lg font-medium">Product 2</h3>
                                                      <span className="text-primary font-medium">$99.99</span>
                                                </div>
                                                <p className="text-muted-foreground text-sm line-clamp-2">
                                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                </p>
                                          </CardContent>
                                          <CardFooter className="pt-4">
                                                <Button size="sm" className="w-full">
                                                      Add to Cart
                                                </Button>
                                          </CardFooter>
                                    </Card>
                                    <Card>
                                          <CardHeader>
                                                <img
                                                      src="/placeholder.svg"
                                                      width="300"
                                                      height="200"
                                                      alt="Product 3"
                                                      className="w-full h-[200px] object-cover rounded-t-lg"
                                                />
                                          </CardHeader>
                                          <CardContent className="p-4">
                                                <div className="flex items-center justify-between">
                                                      <h3 className="text-lg font-medium">Product 3</h3>
                                                      <span className="text-primary font-medium">$24.99</span>
                                                </div>
                                                <p className="text-muted-foreground text-sm line-clamp-2">
                                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                </p>
                                          </CardContent>
                                          <CardFooter className="pt-4">
                                                <Button size="sm" className="w-full">
                                                      Add to Cart
                                                </Button>
                                          </CardFooter>
                                    </Card>
                                    <Card>
                                          <CardHeader>
                                                <img
                                                      src="/placeholder.svg"
                                                      width="300"
                                                      height="200"
                                                      alt="Product 4"
                                                      className="w-full h-[200px] object-cover rounded-t-lg"
                                                />
                                          </CardHeader>
                                          <CardContent className="p-4">
                                                <div className="flex items-center justify-between">
                                                      <h3 className="text-lg font-medium">Product 4</h3>
                                                      <span className="text-primary font-medium">$79.99</span>
                                                </div>
                                                <p className="text-muted-foreground text-sm line-clamp-2">
                                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                </p>
                                          </CardContent>
                                          <CardFooter className="pt-4">
                                                <Button size="sm" className="w-full">
                                                      Add to Cart
                                                </Button>
                                          </CardFooter>
                                    </Card>
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