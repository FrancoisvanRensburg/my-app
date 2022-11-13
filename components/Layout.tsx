import { ReactNode } from "react";
import Head from "next/head";
import styles from "@/styles/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "@/components/Showcase";
import { useRouter } from "next/router";

interface IProps {
  description?: string;
  title?: string;
  keywords?: any;
  children?: ReactNode;
}

const Layout = ({ description, title, keywords, children }: IProps) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name={"description"} content={description} />
        <meta name={"keywords"} content={keywords} />
      </Head>
      <Header />
      {router.pathname === "/" && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "DJ Events | find the best kuiers",
  description: "This is the description",
  keywords: "This is the keywords"
};

export default Layout;
