import { NextPage } from "next";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { IEvent } from "@/interfaces/event.interface";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import DateTime from "@/components/shared/dateTime";
import * as utils from "@/components//shared/utils/utils";
import { useRouter } from "next/router";
const qs = require("qs");

interface IProps {
  event: IEvent;
}

const EventPage: NextPage<IProps> = ({ event }) => {
  const router = useRouter();
  async function deleteEvent() {
    if (confirm("Are you sure?")) {
      try {
        const res = await fetch(`${API_URL}/events/${event.id}`, {
          method: "DELETE"
        });

        if (res.ok) {
          await router.push("/events");
        }
        if (!res.ok) {
          console.log("all not good in the hood");
        }
      } catch (e) {
        console.error("Error caught", e);
      }
    }

    console.log("will delete");
  }

  if (!event) {
    return (
      <>
        <h3>Nothing to see here</h3>
      </>
    );
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <a>
              <FaPencilAlt /> edit event
            </a>
          </Link>
          <a href={"#"} className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete event
          </a>
        </div>
        <DateTime event={event} />
        {event.attributes.image && (
          <div className={styles.img}>
            <Image
              src={
                utils.getCloudinaryImage(event.attributes.image, "large") ??
                "/images/event-default.png"
              }
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{event.attributes.performers}</p>
        <h3>Description</h3>
        <p>{event.attributes.description}</p>
        <h3>Venus: {event.attributes.venue}</h3>
        <p>{event.attributes.address}</p>

        <Link href={"/events"}>
          <a className={styles.back}>Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default EventPage;

export async function getServerSideProps({
  query
}: {
  query: {
    slug: string;
  };
}) {
  const { slug } = query;

  const qry = qs.stringify(
    {
      filters: {
        slug: {
          $eq: `${slug}`
        }
      }
    },
    {
      encodeValuesOnly: true // mooi url
    }
  );

  const res = await fetch(`${API_URL}/events?${qry}&populate=*`);

  const events: { data: IEvent[] } = await res.json();

  return {
    props: {
      event: { ...events.data[0] }
    }
  };
}
