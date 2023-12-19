function Footer() {
  return (
    <footer className="bg-slate-400 mt-14 p-12">
      <div className="flex flex-col m-auto">
        <p className="self-center text-white">© 2023 - QFAP</p>
        <div className="flex flex-row justify-between">
          <a href="https://ecole-du-digital.com/">
            <img src="./icons/logoEcole.png" alt="" />
          </a>
          <a href="https://www.paris.fr/quefaire">
            <img src="./icons/logoParisMairie.svg" alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
