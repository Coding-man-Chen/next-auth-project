import { getServerSession } from "next-auth";
import AuthForm from "../components/auth/auth-form";
import { authOptions } from "./api/auth/[...nextauth]";

function AuthPage() {
  return <AuthForm />;
}

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }
  return {
    props: {},
  };
};

export default AuthPage;
