import SearchBar from "../SearchBar/SearchBar.jsx";
import Tag from "../Tag/Tag.jsx";
import EventCard from "../Card/EventCard.jsx";
import Filter from "../Filter/Filter.jsx";
import FloatingIcons from "../Icons/FloatingIcon.jsx";

import React, { useState, useEffect } from "react";

import { MapContainer, TileLayer } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./home.css";
import Footer from "../Footer/Footer.jsx";

const apiRoutes = [
  { path: "/api/tags", name: "Mots-clés" },
  { path: "/api/accessTypes", name: "Sur réservation" },
  { path: "/api/priceTypes", name: "Tarifs" },
  { path: "/api/audiences", name: "Public" },
  { path: "/api/groups", name: "Groupe" },
];

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.results);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <img src="icons/logoQFAP.svg" alt="" className="mt-12 mb-9 ml-32" />
      <div className="flex flex-row container m-auto mt-24 mb-10 justify-center gap-24 ">
        <FloatingIcons icons={[1, 2, 3, 4, 5, 6]} />
        <div className="flex flex-col items-center gap-10">
          <img className="w-64 h-24" src="./icons/logoQFAP.svg" alt="" />
          <SearchBar />
        </div>
        <FloatingIcons icons={[7, 8, 9, 11, 12, 13]} />
      </div>
      <div className="flex flex-row justify-center gap-6 mb-12">
        <Tag tag="Nouveaux"></Tag>
        <Tag tag="Bientôt Fini"></Tag>
      </div>
      <h4 className="text-primary-blue font-medium text-xl text-right mr-32 mb-6">
        Tout voir
      </h4>
      <div className="flex flex-row">
        <div>
          <h2 className="text-5xl text-textColor font-medium mb-6 ml-5">
            Filtres
          </h2>
          <Filter apiRoutes={apiRoutes} />
        </div>
        <div>
          <div className="flex flex-row gap-12 flex-wrap ml-24 mb-12">
            {events &&
              events.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
          <div className="flex flex-row justify-center gap-6 mb-24">
            {/* <Tag></Tag>
            <Tag></Tag> */}
          </div>
          <h2 className="text-5xl text-textColor font-medium mb-6">
            Carte de Paris
          </h2>

          <div className="mb-6">
            <MapContainer
              style={{
                height: "50vh",
                width: "50vw",
                borderRadius: "25px",
              }}
              center={[48.866667, 2.333333]}
              zoom={12}
            >
              <TileLayer
                attribution="Google Maps"
                url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
              />
              {events &&
                events.map((event) => (
                  <Marker position={[event.lat, event.lon]} key={event.id}>
                    <Popup>
                      {event.title}
                      <img src={event.cover_url} alt="" />
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
