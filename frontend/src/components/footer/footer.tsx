import style from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={style.colorfooter}>
      <div className={style.logo}>
        <h1>Delivery</h1>
        <p>
          Don't worry if something doesn't work. If everything worked, you'd be
          fired.
        </p>
      </div>
      © Web development 2023
    </footer>
  );
};
