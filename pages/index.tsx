import type { NextPage } from "next";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { IEvent } from "@/interfaces//event.interface";
import EventItem from "@/components/EventItem";
import Link from "next/link";

interface IProps {
  events: IEvent[] | [];
}

const HomePage: NextPage<IProps> = ({ events }) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>There are no events yet.</h3>}
      {events.map(event => {
        return (
          <div key={event.id}>
            <EventItem event={event} />
          </div>
        );
      })}
      {events.length > 0 && (
        <Link href={"/events"}>
          <a className={"btn-secondary"}>View all events</a>
        </Link>
      )}
    </Layout>
  );
};

export default HomePage;

// Kinda like use effect but only runs once when page mounts
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  return {
    props: { events: events.slice(0, 3) },
    revalidate: 1
  };
}
