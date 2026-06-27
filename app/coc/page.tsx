import { redirect } from "next/navigation";

// The canonical Code of Conduct lives upstream at the Go bits&bytes Foundation
// site. This route redirects there so we never duplicate CoC content locally.
export default function CoCPage() {
  redirect("https://gobitsnbytes.org/coc");
}
