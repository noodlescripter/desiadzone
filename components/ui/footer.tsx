import Link from "next/link"
export default function Footer() {
      return (
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t fixed bottom-0 left-0 bg-white z-10">
            <p className="text-xs text-muted-foreground">&copy; 2024 Desiadzone. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link href="/misc/terms" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                Terms & Conditions
              </Link>
              <Link href="/misc/privacy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                Privacy
              </Link>
            </nav>
          </footer>
      )
}