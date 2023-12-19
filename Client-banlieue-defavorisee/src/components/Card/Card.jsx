import Tag from "../Tag";

function Card({ eventData }) {
  // Utilisation des données reçues via les props
  const { title, cover_url, date_start, date_end } = eventData;

  //Date formattage
  const formatDate = (rawDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(rawDate).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  return (
    <div className="flex flex-column">
      <div>
        <img
          className="w-78 h-96 mb-4 rounded-3xl border-solid border-8 border-primary-blue border-opacity-20"
          src={cover_url} // Assurez-vous d'avoir une propriété image dans vos données d'événement
          alt=""
        />
        <div className="flex flex-col gap-4">
          <Tag></Tag>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl text-textColor font-bold">
              {title} {/* Utilisation du titre de l'événement */}
            </h2>
            <div className="flex flex-row gap-1">
              <img className="w-5" src="icons/iconCalendar.svg" alt="" />
              <span className="text-sm text-secondaryRed font-medium">
                {"du" +
                  " " +
                  formatDate(date_start) +
                  " " +
                  "au" +
                  " " +
                  formatDate(date_end)}
                {/* Utilisation de la date de l'événement */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
