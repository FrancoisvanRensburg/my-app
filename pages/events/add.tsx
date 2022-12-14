import { NextPage } from "next";
import Layout from "@/components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Form.module.css";
import Link from "next/link";
import { API_URL } from "@/config/index";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import { IEvent } from "@/interfaces/event.interface";

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

  async function handleSubmit(e: any) {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some((el: string) => el.length === 0);

    if (hasEmptyFields) {
      console.log("please fill in all the fields");
    }

    let newValues = {
      ...values,
      slug: values.name.toLocaleLowerCase().replaceAll(" ", "-")
    };

    try {
      const res = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({ data: newValues })
      });
      if (res.ok) {
        const event: { data: IEvent } = await res.json();

        await router.push(`/events/${event.data.attributes.slug}`);
      }
      if (!res.ok) {
        console.error("res not ok");
      }
    } catch (e) {
      console.error("something not right", e);
    }
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
