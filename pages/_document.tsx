import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
          <div id={"modal-root"}></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
