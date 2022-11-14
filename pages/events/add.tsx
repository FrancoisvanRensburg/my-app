import { NextPage } from "next";
import Layout from "@/components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Form.module.css";
import Link from "next/link";

type formData = {
  name: string;
  venue: string;
  address: string;
  performers: string;
  date: string;
  time: string;
  description: string;
};

const AddEventPage: NextPage = () => {
  const [values, setValues] = useState<formData>({
    name: "",
    venue: "",
    address: "",
    performers: "",
    date: "",
    time: "",
    description: ""
  });
  const router = useRouter();

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log("values", values);
  }

  return (
    <Layout title={"Add new event"}>
      <Link href={"/events"}>Go back</Link>
      <h1>Add event</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor={"name"}>Event name</label>
            <input
              type={"text"}
              id={"name"}
              name={"name"}
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor={"name"}>Performers</label>
            <input
              type={"text"}
              id={"performers"}
              name={"performers"}
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor={"name"}>Venue</label>
            <input
              type={"text"}
              id={"venue"}
              name={"venue"}
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor={"name"}>Address</label>
            <input
              type={"text"}
              id={"address"}
              name={"address"}
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor={"name"}>Date</label>
            <input
              type={"date"}
              id={"date"}
              name={"date"}
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor={"name"}>Time</label>
            <input
              type={"text"}
              id={"time"}
              name={"time"}
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor={"description"}>Event description</label>
          <textarea
            typeof={"text"}
            name={"description"}
            id={"description"}
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <input type={"submit"} value={"Add event"} className={"btn"} />
      </form>
    </Layout>
  );
};

export default AddEventPage;
