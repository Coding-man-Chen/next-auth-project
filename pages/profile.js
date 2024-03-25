import { getServerSession } from "next-auth";
import UserProfile from "../components/profile/user-profile";
import { authOptions } from "./api/auth/[...nextauth]";

function ProfilePage() {
  return <UserProfile />;
}

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props:{email: session.user.email}
  };
};
export default ProfilePage;
