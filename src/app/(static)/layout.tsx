import { Footer } from "@/components/static/footer";
import { Footnote } from "@/components/static/footnote";
import Header from "@/components/static/header";

export default function StaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="static-layout">
      <main>
        <Header />
        {children}
        <Footer />
        <Footnote />
        </main>

    </div>
  );
}