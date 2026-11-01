import { auth, supabase } from "@/auth";
import CourseClient from "./CourseClient";

export default async function Page() {
  const session = await auth();

  let status: "no-session" | "unregistered" | "registered" = "no-session";

  if (session?.user?.email) {
    const { data, error } = await supabase
      .from("registrations")
      .select("course_id")
      .eq("user_email", session.user.email)
      .maybeSingle();

    if (error) {
      console.error("Error fetching user registration:", error);
    } else {
      status = data?.course_id ? "registered" : "unregistered";
    }
  }

  return <CourseClient status={status} />;
}
