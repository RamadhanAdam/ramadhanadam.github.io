import { Link } from "react-router-dom";
import { links } from "../data";
import { Glide } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-faint sm:px-8">
        <p>© {new Date().getFullYear()} Ramadhan Adam Zome · Nairobi and Higashi-Hiroshima</p>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-ink">Home</Link>
          <Link to="/writing" className="hover:text-ink">Writing</Link>
          <Glide href={links.source} className="hover:text-ink">Source</Glide>
        </div>
      </div>
    </footer>
  );
}
