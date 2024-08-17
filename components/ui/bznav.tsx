"use client"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useSession } from "@clerk/nextjs"
import { SignOutButton } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { useClerk } from "@clerk/nextjs"
import { useRouter } from 'next/navigation';
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@radix-ui/react-select"


export default function Component() {
    const { session } = useSession();
    const { sessionId } = useAuth();
    const { signOut } = useClerk();
    const [loggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userImage, setUserImage] = useState(""); // Add state for user image
    const router = useRouter();

    useEffect(() => {
        if (session !== null && session?.user.firstName) {
            console.log('user is logged in', session);
            setIsLoggedIn(true)
            setFirstName(session.user.firstName);
            setLastName(session.user.lastName);
            setEmail(session.user.emailAddresses[0]?.emailAddress || ""); // Assuming emailAddresses is an array
            setUserImage(session.publicUserData.imageUrl); // Set user image URL
        }
    }, [session])

    function onSignOut(e) {
        e.preventDefault();
        signOut()
            .then(() => {
                router.push('/')
                window.location.reload();
            });
    }

    function redirectUser(url: any) {
        window.location.href = `${url}`
    }
    function HomeIcon(props: any) {
        return (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" /></svg>
        )
    }
    return (
        <header className="bg-background sticky top-0 z-50 w-full border-b border-muted shadow-2xl">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="#" className="text-lg font-bold" prefetch={false}>
                    <img src="/logo.png" className="h-36"></img>
                </Link>
                <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                    <Button onClick={() => redirectUser("/")} className="bg-transparent hover:bg-transparent" variant="ghost">Home</Button>
                    {/* <Link href="" className="hover:text-primary" prefetch={false}>
                        Home
                    </Link> */}
                    <Link href="/adlisting" className="hover:text-primary" prefetch={false}>
                        All Listings
                    </Link>
                    {loggedIn ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
                                        My Profile
                                    </Link>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <Link href={"/postlisting"}>
                                        <DropdownMenuItem>
                                            List Ad
                                        </DropdownMenuItem>
                                    </Link>

                                    <Link href={"/product/manage"}>
                                        <DropdownMenuItem>
                                            Manage Ads
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator />
                                    <Link href={"/sign-out"} onClick={onSignOut}>
                                        <DropdownMenuItem>
                                            Sign out
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in" className="hover:text-primary" prefetch={false}>
                                Sign In
                            </Link>
                        </>
                    )}

                    <Link href="/misc/about" className="hover:text-primary" prefetch={false}>
                        About Us
                    </Link>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden border-none">
                            <MenuIcon className="h-6 w-6" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[200px]">
                        <nav className="grid gap-4 p-4">
                            <Link href=" " className="hover:text-primary p-2" prefetch={false} onClick={() => redirectUser('/')}>
                                <HomeIcon/>
                            </Link>
                            <Link href="" className="hover:text-primary p-2" prefetch={false} onClick={()=> redirectUser('/adlisting')}>
                                Listings
                            </Link>
                            {loggedIn ? (
                                <>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Link href="#" className="hover:text-primary p-2" prefetch={false}>
                                                My Profile
                                            </Link>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <Link href={""} className="p-2" onClick={() => redirectUser('/postlisting')}>
                                                <DropdownMenuItem>
                                                    List Ad
                                                </DropdownMenuItem>
                                            </Link>

                                            <Link href={""} className="p-2" onClick={() => redirectUser('/product/manage')}>
                                                <DropdownMenuItem>
                                                    Manage Ads
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuSeparator />
                                            <Link href={"/sign-out"} className="p-2" onClick={onSignOut}>
                                                <DropdownMenuItem>
                                                    Sign out
                                                </DropdownMenuItem>
                                            </Link>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            ) : (
                                <>
                                    <Link href="" className="hover:text-primary p-2" prefetch={false} onClick={()=> redirectUser('/sign-in')}>
                                        Sign In
                                    </Link>
                                </>
                            )}
                            <Link href="" className="hover:text-primary p-2" prefetch={false} onClick={() => redirectUser('/misc/about')}>
                                About Us
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}

function MenuIcon(props) {
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
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}