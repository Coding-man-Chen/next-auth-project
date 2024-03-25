import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function UserProfile() {
  // Redirect away if NOT auth
  // const router = useRouter();
  // const { status } = useSession();
  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.replace("/");
  //   }
  // }, [status]);
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
