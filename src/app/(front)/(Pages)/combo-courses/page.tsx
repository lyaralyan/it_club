import { redirect } from "next/navigation";

export default function ComboCoursesRedirect() {
  redirect("/"); // կամ redirect('/404') կամ redirect('/some-info-page')
}
