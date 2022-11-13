import { FaExclamationTriangle } from "react-icons/fa";
import Layout from "@/components/Layout";
import styles from "@/styles/404.module.css";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <>
      <Layout title={"Where are you"}>
        <div className={styles.error}>
          <h1>
            <FaExclamationTriangle />
            404
          </h1>
          <h4>You, not found poes</h4>
          <Link href={"/"}>
            <a>Go home</a>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default NotFoundPage;
