import { useRouter } from "next/navigation";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import { JwtTokenManager } from "./jwtManager";

interface WrapperProps {
  // Add the properties your wrapped component might need
  // For example, you can add user information, authentication status, etc.
}

export const checkIfUserIsAuthenticated = () => {
  const tokenManager = new JwtTokenManager();
  const token = tokenManager.getToken();
  return !!token; // Simplified check, returns true if token is present
};

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P & WrapperProps>
) => {
  const Wrapper: React.FC<P & WrapperProps> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = checkIfUserIsAuthenticated();

      if (!isAuthenticated) {
        router.push("/login"); // Replace '/login' with your login page path
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const isAuthenticated = checkIfUserIsAuthenticated();

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default withAuth;
