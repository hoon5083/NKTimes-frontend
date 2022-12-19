import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html className="font-sans bg-cp-2">
        <Head>
          <link href="/favicon.ico" rel="shortcut icon" />
          <script src="https://accounts.google.com/gsi/client" async defer></script>
          <script src="g.auth.js" type="text/javascript" async></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
