import type { NextPage } from "next";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { IEvent } from "@/interfaces//event.interface";
import EventItem from "@/components/EventItem";
import Link from "next/link";

interface IProps {
  events: IEvent[] | null;
}

const HomePage: NextPage<IProps> = ({ events }) => {
  console.log("events", events);
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events?.length === 0 && <h3>There are no events yet.</h3>}
      {events?.map(event => {
        return (
          <div key={event.id}>
            <EventItem event={event} />
          </div>
        );
      })}
      {/*@ts-ignore*/}
      {events?.length > 0 && (
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
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3&populate=*`);
  const events = await res.json();

  const resultObj = events.data;
  return {
    props: { events: resultObj },
    revalidate: 1
  };
}
