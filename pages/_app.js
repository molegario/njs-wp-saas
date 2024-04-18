import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import MainMenu from "components/MainMenu/MainMenu";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return <div className="font-body">
    <MainMenu menuItems={pageProps?.mainMenuItems ?? []} cta={pageProps?.cta ?? {}} />
    <Component {...pageProps} />
  </div>;
}

export default MyApp;
