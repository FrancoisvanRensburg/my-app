import { IEvent } from "@/interfaces/event.interface";

interface IProps {
  event: IEvent;
}

export default function DateTime({ event }: IProps) {
  return (
    <>
      <span>
        {event.date} at {event.time}
      </span>
      <h3>{event.name}</h3>
    </>
  );
}
