"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { navigationLinks } from "@/data/navigation"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import type { RootState } from "@/store/store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Avatar, AvatarImage } from "../ui/avatar"
import { toast } from "sonner"
import { clearUser } from "@/store/slices/user-slice"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function Header() {
  const router = useRouter()
  const localToken = typeof window !== "undefined" ? localStorage.getItem("token") : null
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged out successfully")
      dispatch(clearUser())
      router.push("/auth")
    } catch (err) {
      toast.error("Logout failed")
      console.error("Logout error:", err)
    }
  }

  useEffect(() => {
    if (!localToken) localStorage.removeItem("user")
  }, [localToken])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header className={`w-full shadow-xl flex justify-center items-center mx-auto`}>
        <div className="container my-2 mx-2 lg:mx-12 px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center justify-center space-x-1">
              <Image src={"/logos/logo.png"} alt="logo" width={60} height={50} />
            </Link>
            <div className="flex">
              {/* Desktop Navigation */}
              <nav className={`hidden lg:flex items-center space-x-1 mx-6`}>
                {navigationLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-black ${index === 7 ? "border-none" : "border-primary border-r"} px-2 font-normal transition-colors hover:text-primary duration-200`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {!user ? (
                <div className="button-box hidden lg:flex items-center space-x-3">
                  <>
                    <Link href="/auth">
                      <Button className="bg-secondary border border-primary text-primary hover:cursor-pointer rounded-full font-normal hover:bg-secondary hover:px-4">
                        Register
                      </Button>
                    </Link>
                    <Link href="/auth">
                      <Button
                        variant="outline"
                        className="bg-primary text-white hover:cursor-pointer rounded-full hover:bg-secondary font-normal hover:border-primary px-6 py-2"
                      >
                        Sign In
                      </Button>
                    </Link>
                  </>
                </div>
              ) : (
                <>
                  <div className="hidden lg:flex items-center justify-center gap-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none hover:cursor-pointer">
                        <Avatar className="w-10 h-10">
                          <AvatarImage
                            src={user.user.playerProfile.imageUrl || "/icons/users.png" || "/placeholder.svg"}
                            alt={`${user.user.playerProfile.firstName}'s profile`}
                          />
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 mt-2">
                        <DropdownMenuLabel>
                          <div className="text-sm font-medium">
                            {user.user.playerProfile.firstName} {user.user.playerProfile.lastName}
                          </div>
                          <div className="text-xs text-muted-foreground">{user.user.email}</div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href="/profile">
                          <DropdownMenuItem className="hover:cursor-pointer">Profile</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:cursor-pointer" onClick={handleLogout}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </>
              )}

              <button
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />

          {/* Slide-in menu */}
          <div className="absolute right-0 top-0 h-full w-[280px] bg-white shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Menu header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <Image src={"/logos/logo.png"} alt="logo" width={50} height={40} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </div>

            {/* User info section if logged in */}
            {user && (
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-primary">
                    <AvatarImage
                      src={user.user.playerProfile.imageUrl || "/icons/users.png"}
                      alt={`${user.user.playerProfile.firstName}'s profile`}
                    />
                  </Avatar>
                  <div>
                    <p className="font-medium text-black">
                      {user.user.playerProfile.firstName} {user.user.playerProfile.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{user.user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation links */}
            <nav className="flex flex-col p-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-3 text-black font-medium border-b border-gray-100 hover:bg-primary/5 hover:text-primary transition-colors rounded-lg"
                >
                  {link.name}
                </Link>
              ))}

              {/* Profile link for logged in users */}
              {user?.user.role === "USER" && (
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-3 text-black font-medium border-b border-gray-100 hover:bg-primary/5 hover:text-primary transition-colors rounded-lg"
                >
                  Profile
                </Link>
              )}
            </nav>

            {/* Auth buttons */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
              {!user ? (
                <div className="flex flex-col gap-3">
                  <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary text-white hover:bg-primary/90 rounded-full font-medium py-5">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary/5 rounded-full font-medium py-5 bg-transparent"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full bg-black text-white hover:bg-black/80 rounded-full font-medium py-5"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
