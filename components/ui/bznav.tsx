"use client"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"
import {useSession} from "@clerk/nextjs"
import {SignOutButton} from "@clerk/nextjs"
import {useEffect, useState} from "react"
import {useAuth} from "@clerk/nextjs"
import {useClerk} from "@clerk/nextjs"
import {useRouter} from 'next/navigation';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


export default function Component() {
    const {session} = useSession();
    const {sessionId} = useAuth();
    const {signOut} = useClerk();
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

    return (
        <header
            className="flex h-16 w-full items-center justify-between bg-background shadow-md sticky top-0 px-4 md:px-6">
            <Link href="/adlisting" className="flex items-center" prefetch={false}>
                <img src={'/logo.png'} alt="Bangla-Bazaar Logo" className="h-20 w-20"/>
                {/*//<span className="sr-only">Bangla-Bazaar</span>*/}
            </Link>
            <div className="flex items-center gap-4">
                {
                    loggedIn ?
                        (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-full">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={userImage}/>
                                                <AvatarFallback>{firstName}</AvatarFallback>
                                            </Avatar>
                                            <span className="sr-only">Toggle user menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <div className="flex items-center gap-2 p-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={userImage}/>
                                            </Avatar>
                                            <div className="grid gap-0.5 leading-none">
                                                <div className="font-semibold">{firstName} {lastName}</div>
                                                <div className="font-semibold">{email}</div>
                                                <div className="text-sm text-muted-foreground"></div>
                                            </div>
                                        </div>

                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem asChild>
                                            <Link href="/product/manage" className="flex items-center gap-2"
                                                  prefetch={false}>
                                                <div className="h-4 w-4"/>
                                                <span>Manage Ads</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/postlisting" className="flex items-center gap-2"
                                                  prefetch={false}>
                                                <div className="h-4 w-4"/>
                                                <span>Post Ads</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem onSelect={onSignOut}>
                                            <div className="flex items-center gap-2">
                                                <div className="h-4 w-4"/>
                                                <span>Sign Out</span>
                                            </div>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) :
                        (
                            <>
                                <Link href={"/sign-in"}>
                                    <Button variant="outline" hidden={!!loggedIn}>Sign in</Button>
                                </Link>
                            </>
                        )
                }
            </div>

        </header>

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
            <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
        </svg>
    )
}

