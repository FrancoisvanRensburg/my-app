import { NextPage } from "next";
import Layout from "../components/Layout";

const AboutPage: NextPage = () => {
  return (
    <Layout title={"About"}>
      <h1>About</h1>
      <p>
        This is an app to find the latest DJ and other musicians' performances on your location.
      </p>
      <p>Version 1.0.0</p>
    </Layout>
  );
};

export default AboutPage;
