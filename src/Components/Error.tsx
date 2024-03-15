import '../Scss/Error.scss';
import { Link } from 'react-router-dom';
const Error: React.FC = () => {
  // const isDevelopment = import.meta.env.VITE_APP_ENV === "development"
  return (
    <section className="error">
      <header className="error__header">
        <h1 className="error__heading">Oops! Algo salió mal...</h1>
        <p className="error__message">Parece que has llegado a una página que no existe.</p>
      </header>
      <article className="error__content">
        <img
          className="error__image"
          src="img/error404/error.png"
          alt="Error 404"
        />
        <p className="error__back">
          <Link to={"/"}>  Vuelve a lapágina principal </Link>
        </p>
      </article>
    </section>
  );
};

export default Error;
