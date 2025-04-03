import "@/styles/globals.css";
import type { AppProps } from "next/app";
import 'react-toastify/dist/ReactToastify.css';
import AuthGuard from "@/components/AuthGuard";
import { RecoilRoot } from "recoil";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";

NProgress.configure({ showSpinner: false});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return  <RecoilRoot>
            <AuthGuard>
              <Component {...pageProps} />;
            </AuthGuard>
          </RecoilRoot>
}
