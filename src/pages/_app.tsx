import React from "react";
import type { AppProps } from "next/app";
import wrapper from "@src/utils/state/wrapper";
import "@styles/global.scss";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
