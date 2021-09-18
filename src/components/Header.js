import classes from "./Header.module.css";

const Header = function () {
  return (
    <header className={classes.header}>
      <h2>
        <a href={window.location.href}>Spacestagram</a>
      </h2>
      <p>Brought to you by NASA's APOD API</p>
    </header>
  );
};

export default Header;
