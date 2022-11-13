import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";
import { IEvent } from "@/interfaces/event.interface";
import DateTime from "@/components/shared/dateTime";
import * as utils from "@/components//shared/utils/utils";

interface IProps {
  event: IEvent;
}

const EventItem: NextPage<IProps> = ({ event }) => {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            utils.getCloudinaryImage(event.attributes.image, "thumbnail") ??
            "/images/event-default.png"
          }
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <DateTime event={event} />
      </div>
      <div className={styles.link}>
        <Link href={`/events/${event.attributes.slug}`}>
          <a className={"btn"}>More info</a>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
