import { Link } from "@tanstack/react-router";
import { Menu, Newspaper, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const links = [{ to: "/", label: "Home" }, { to: "/check-news", label: "Check News" }, { to: "/how-it-works", label: "How It Works" }, { to: "/about", label: "About" }] as const;
export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border bg-background"><div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 lg:px-8">
      <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}><span className="grid size-10 place-items-center bg-primary text-primary-foreground"><Newspaper size={20}/></span><span className="font-display text-base font-bold tracking-normal sm:text-lg">FAKE NEWS DETECTION</span></Link>
      <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">{links.map((link) => <Link key={link.to} to={link.to} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>{link.label}</Link>)}</nav>
      <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button>
    </div>{open && <nav className="border-t border-border px-5 py-4 md:hidden" aria-label="Mobile navigation">{links.map((link) => <Link key={link.to} to={link.to} className="block py-3 text-sm font-semibold" onClick={() => setOpen(false)}>{link.label}</Link>)}</nav>}</header>
    {children}
    <footer className="border-t border-border bg-secondary"><div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>FAKE NEWS DETECTION</span><span>Evidence first. Share responsibly.</span></div></footer>
  </div>;
}
