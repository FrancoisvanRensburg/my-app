import { NextPage } from "next";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { IEvent } from "@/interfaces/event.interface";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import DateTime from "@/components/shared/dateTime";

interface IProps {
  event: IEvent;
}

const EventPage: NextPage<IProps> = ({ event }) => {
  function deleteEvent() {
    console.log("will delete");
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
        {event.image && (
          <div className={styles.img}>
            <Image src={event.image} width={960} height={600} />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description</h3>
        <p>{event.description}</p>
        <h3>Venus: {event.venue}</h3>
        <p>{event.address}</p>

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

  const res = await fetch(`${API_URL}/api/events/${slug}`);

  const events: IEvent[] = await res.json();

  console.log("events", events);

  return {
    props: {
      event: events[0]
    }
  };
}
