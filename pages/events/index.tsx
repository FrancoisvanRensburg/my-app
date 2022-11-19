import type { NextPage } from "next";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { IEvent } from "@/interfaces//event.interface";
import EventItem from "@/components/EventItem";
import { useState } from "react";
import { useRouter } from "next/router";
const qs = require("qs");

interface IProps {
  events: IEvent[] | null;
  currentPage: number;
  totalCount: number;
  limit: number;
}

const EventsPage: NextPage<IProps> = ({ events, currentPage, totalCount, limit }) => {
  const [page, setPage] = useState<number>(1);
  const router = useRouter();

  function handlePageChange(val: number) {
    router.push({
      pathname: "/events",
      search: `page=${val}`
    });
    setPage(val);
  }

  return (
    <Layout>
      <h1>Events</h1>
      {events?.length === 0 && <h3>There are no events yet.</h3>}
      {events?.map(event => {
        return (
          <div key={event.id}>
            <EventItem event={event} />
          </div>
        );
      })}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "0 auto",
          width: "300px",
          gap: "10px"
        }}
      >
        <button
          className={"btn"}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1 || !page}
        >
          Previous
        </button>
        <input
          type={"number"}
          value={page}
          min={1}
          step={1}
          onChange={(e: any) => {
            handlePageChange(e.target.value);
          }}
        />
        <button
          className={"btn"}
          onClick={() => handlePageChange(page + 1)}
          disabled={!(page * limit < totalCount)}
        >
          Next
        </button>
      </div>
    </Layout>
  );
};

export default EventsPage;

// Kinda like use effect but only runs once when page mounts
export async function getServerSideProps({ query: { page = 1 } }) {
  console.log("page", page);
  const start = +page === 1 ? 0 : (+page - 1) * 3;
  const query = qs.stringify(
    {
      pagination: {
        start: start,
        limit: 3
      },
      sort: ["date:asc"],
      populate: "*"
    },
    {
      encodeValuesOnly: true // prettify URL
    }
  );

  const res = await fetch(`${API_URL}/events?${query}`);
  const events: {
    data: IEvent[];
    meta: { pagination: { start: number; limit: 3; total: number } };
  } = await res.json();

  const resultObj = events.data;
  const meta = events.meta;

  console.log("events here", events);

  return {
    props: {
      events: resultObj,
      currentPage: +page,
      totalCount: meta.pagination.total,
      limit: meta.pagination.limit
    }
  };
}
