import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Footer from "../Footer/Footer.jsx";

function EventDetail() {
  const { id } = useParams();

  console.log(id);

  const [event, setEvent] = useState({});

  useEffect(() => {
    fetch(`/api/event/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("BLABLABLA", data);
        setEvent(data);
      });
  }, [id]);

  return (
    <div>
      <img src="icons/logoQFAP.svg" alt="" className="mt-12 mb-9 ml-32" />
      <div className="flex mb-24">
        <div className=" ml-32 ">
          <img
            className="w-100 h-100 rounded-3xl border-solid border-8 border-primary-blue border-opacity-20"
            src={event.cover_url}
            alt=""
          />
        </div>
        <div className="flex flex-column justify-around ml-14 mr-32">
          <div>
            <div className="flex flex-row gap-2 mb-4">
              <img src="icons/iconCalendar.svg" alt="" />
              <span className="text-sm text-secondaryRed font-medium">
                {new Date(event.date_start).toLocaleDateString({
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                -
                {new Date(event.date_end).toLocaleDateString({
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <h2 className="text-5xl text-textColor font-medium mb-6">
              {event.title}
            </h2>
            <div className="flex gap-2 mb-6">
              <h3 className="text-base text-primary-blue font-bold font bg-primary-blue bg-opacity-10 text-center rounded-full py-2 px-8 w-28">
                loisirs
              </h3>
              <img src="icons/twitter.svg" alt="" />
              <img src="icons/Facebook.svg" alt="" />
            </div>
            <div>
              <div className="flex gap-2 mb-6">
                <img src="icons/iPhone.svg" alt="" />
                <p className="font-regular font-medium text-textColor">
                  {event.contact_phone}
                </p>
                <img src="icons/Outlined.svg" alt="" />
                <p className="font-regular font-medium text-textColor">
                  {event.blind === true
                    ? "Accessible aux malvoyants"
                    : "non accessible aux malvoyants"}
                  <br />
                  {event.deaf === true
                    ? "Accessible aux malentendants"
                    : "non accessible aux malentendants"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href={event.url}
                className="text-2xl text-primary-blue font-bold underline"
              >
                Voir la billeterie
              </a>
              <img src="icons/Arrow-Right.svg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="ml-32 mb-24 mr-96">
        <h2 className="mb-5 text-xl text-textColor font-medium">Description</h2>
        {event.description}
      </div>
      <div className="ml-32 mb-24 mr-32">
        <h2 className="mb-5 text-xl text-textColor font-medium">Endroit</h2>
        <MapContainer
          style={{
            height: "70vh",
            width: "80vw",
            borderRadius: "25px",
          }}
          // center={[event.lat, event.lon]}
          center={[48.866667, 2.333333]}
          zoom={12}
        >
          {/* add google map tile url  */}
          <TileLayer
            attribution="Google Maps"
            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
          />
        </MapContainer>
      </div>
      <Footer />
    </div>
  );
}

export default EventDetail;
