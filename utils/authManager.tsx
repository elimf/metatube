import { useRouter } from "next/navigation";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import { JwtTokenManager } from "./jwtManager";


interface WrapperProps {
  // Ajoutez les propriétés du composant enveloppé ici
}
const checkIfUserIsAuthenticated = () => {
  const tokenManager = new JwtTokenManager();
  const token = tokenManager.getToken();
  if (!token) {
    return false;
  }
  return true;
};

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P & WrapperProps> = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Vérifier ici si l'utilisateur est connecté
      const isAuthenticated = checkIfUserIsAuthenticated();

      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      if (!isAuthenticated) {
        router.push("/login"); // Remplacez '/login' par le chemin de votre page de connexion
      }
    }, []);

    // Si l'utilisateur est connecté, renvoyer le composant enveloppé
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Vérifier ici si l'utilisateur est connecté lors du rendu côté serveur
  const isAuthenticated = checkIfUserIsAuthenticated();

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login", // Remplacez '/login' par le chemin de votre page de connexion
        permanent: false,
      },
    };
  }

  // Si l'utilisateur est connecté, renvoyer les propriétés du composant enveloppé
  return {
    props: {},
  };
};

export default withAuth;
