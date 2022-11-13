import { IEvent } from "@/interfaces/event.interface";
import * as utils from "@/components//shared/utils/utils";

interface IProps {
  event: IEvent;
}

export default function DateTime({ event }: IProps) {
  return (
    <>
      <span>
        {utils.humanFormatDate(event.attributes.date)} at {event.attributes.time}
      </span>
      <h3>{event.attributes.name}</h3>
    </>
  );
}
