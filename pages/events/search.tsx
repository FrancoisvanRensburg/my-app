import type { NextPage } from "next";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { IEvent } from "@/interfaces//event.interface";
import EventItem from "@/components/EventItem";
import { useRouter } from "next/router";
import Link from "next/link";

const qs = require("qs");

interface IProps {
  events: IEvent[] | null;
}

const SearchPage: NextPage<IProps> = ({ events }) => {
  const router = useRouter();
  return (
    <Layout>
      <Link href={"/events"}>Go back</Link>
      <h1>Search results for {router.query.term}</h1>
      {events?.length === 0 && <h3>There are no events yet.</h3>}
      {events?.map(event => {
        return (
          <div key={event.id}>
            <EventItem event={event} />
          </div>
        );
      })}
    </Layout>
  );
};

export default SearchPage;

export async function getServerSideProps({ query: { term } }: { query: { term: string } }) {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: { $contains: term }
          },
          {
            venue: { $contains: term }
          },
          {
            performers: { $contains: term }
          },
          {
            description: { $contains: term }
          }
        ]
      }
    },
    {
      encodeValuesOnly: true // mooi url
    }
  );

  const res = await fetch(`${API_URL}/events?${query}&populate=*`);
  const events: { data: IEvent[] } = await res.json();

  return {
    props: { events: events.data }
  };
}
