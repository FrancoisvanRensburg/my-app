import { NextPage } from "next";
import { API_URL } from "@/config/index";
import { IEvent } from "@/interfaces/event.interface";
import Layout from "@/components/Layout";
import Modal from "@/components/shared/Modal";
import Link from "next/link";
import styles from "@/styles/Form.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as utils from "@/components/shared/utils/utils";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import ImageUpload from "@/components/shared/ImageUpload";
const qs = require("qs");

type formData = {
  name: string;
  venue: string;
  address: string;
  performers: string;
  date: string;
  time: string;
  description: string;
};

interface IProps {
  event: IEvent;
}

const EditPage: NextPage<IProps> = ({ event }) => {
  const [showModal, setShoeModal] = useState<boolean>(false);
  const [values, setValues] = useState<formData>({
    name: "",
    venue: "",
    address: "",
    performers: "",
    date: "",
    time: "",
    description: ""
  });
  const [imagePreview, setImagePreview] = useState<any>(event.attributes.image);
  const router = useRouter();

  useEffect(() => {
    let newObj: any = {};
    Object.keys(values).forEach(value => {
      // @ts-ignore
      newObj[value] = event.attributes[value] ?? "";
    });
    setValues({ ...newObj, date: utils.humanFormatDate(newObj.date) });
  }, []);

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
      const res = await fetch(`${API_URL}/events/${event.id}`, {
        method: "PUT",
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

  async function imageUploaded(img: any) {
    const res = await fetch(`${API_URL}/events/${event.id}?populate=*`);

    const data: { data: IEvent } = await res.json();

    setImagePreview(data.data.attributes.image);
    setShoeModal(false);
  }

  return (
    <Layout title={"Add new event"}>
      <Link href={"/events"}>Go back</Link>
      <h1>Edit event</h1>
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
        <input type={"submit"} value={"Edit event"} className={"btn"} />
      </form>

      <h2>Event image</h2>
      <Image
        src={utils.getCloudinaryImage(imagePreview, "thumbnail") ?? "/images/event-default.png"}
        width={234}
        height={156}
      />
      <div>
        <button className={"btn-secondary"} onClick={() => setShoeModal(true)}>
          <FaImage /> Set image
        </button>
      </div>
      {/*{showModal && (*/}
      <Modal show={showModal} onClose={() => setShoeModal(false)}>
        <div>Image upload</div>
        <ImageUpload imageUploaded={imageUploaded} eventId={event.id} />
      </Modal>
      {/*)}*/}
    </Layout>
  );
};

export default EditPage;

export async function getServerSideProps({
  params
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  const res = await fetch(`${API_URL}/events/${id}?populate=*`);

  const events: { data: IEvent[] } = await res.json();

  return {
    props: {
      event: { ...events.data }
    }
  };
}
