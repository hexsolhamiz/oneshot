import { Footer } from "@/components/static/footer";
import { Footnote } from "@/components/static/footnote";
import Header from "@/components/static/header";


export default function StaticLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Header />
        {children}
        <Footer />
        <Footnote />
      </body>
    </html>

);
}