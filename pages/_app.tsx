// import App from 'next/app'
import Head from "next/head";
import { SearchForm } from "~/components";

import { createGlobalStyle } from "styled-components";
import { ProgressBar } from "components/ProgressBar";

const GlobalStyles = createGlobalStyle`

  // body {
  //   background: #1f1f1f;
  // }
`;

export default ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        />
      </Head>
      <GlobalStyles />
      <ProgressBar />
      <nav className="py-2 mb-3 bg-dark">
        <div className="container text-white">
          <SearchForm />
        </div>
      </nav>

      {/* <header>
        
      </header> */}
      <main className="container">
        <Component {...pageProps} />
      </main>
    </>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }
