import { Link } from "react-router-dom";
import Tag from "../Tag/Tag";

function EventCard({ event }) {
  return (
    <div className="flex flex-column">
      <Link to={`/event/${event.id}`}>
        <div className="w-96 h-96 overflow-hidden">
          <img
            className="h-72  mb-4 rounded-3xl border-solid border-8 border-primary-blue border-opacity-20"
            src={event.cover_url}
            alt=""
          />
          <div className="flex flex-col gap-4">
            {event.tags.forEach((element) => {
              return <Tag tag={element} />;
            })}
            <div className="flex flex-col gap-0.5">
              <h2 className="text-xl text-textColor font-bold">
                {event.title}
              </h2>
              <div className="flex flex-row gap-2">
                <img src="icons/iconCalendar.svg" alt="" />
                <span className="text-sm text-secondaryRed font-medium">
                  {new Date(event.date_start).toLocaleDateString({
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(event.date_end).toLocaleDateString({
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default EventCard;
