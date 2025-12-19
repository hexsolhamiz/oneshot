// layouts/UserLayout.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/services/auth";
import Header from "@/components/static/header";
import { Footer } from "@/components/static/footer";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);



    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                localStorage.removeItem("user")
                return router.replace("/auth");
            }

            try {
                const res = await axiosInstance.get("/users/me");
                const role = res.data.role;

                if (!["USER"].includes(role)) {
                    // return router.replace("/profile");
                }
            } catch {
                localStorage.removeItem("token");
                router.replace("/auth");
            } finally {
                setIsCheckingAuth(false);
            }
        };

        checkUser();
    }, [router]);

    if (isCheckingAuth) return null;
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}