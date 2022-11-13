import type { NextPage } from "next";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { IEvent } from "@/interfaces//event.interface";
import EventItem from "@/components/EventItem";

interface IProps {
  events: IEvent[] | [];
}

const EventsPage: NextPage<IProps> = ({ events }) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>There are no events yet.</h3>}
      {events.map(event => {
        return (
          <div key={event.id}>
            <EventItem event={event} />
          </div>
        );
      })}
    </Layout>
  );
};

export default EventsPage;

// Kinda like use effect but only runs once when page mounts
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  return {
    props: { events },
    revalidate: 1
  };
}
