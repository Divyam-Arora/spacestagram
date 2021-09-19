import classes from "./ListEl.module.css";
import { dateActions, likedActions } from "../store";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import newDate from "../utils/newDate";

const ListEl = function (props) {
  const liRef = useRef();
  const [btnCLick, setBtnCLick] = useState(false);
  const [linkClick, setLinkClick] = useState(false);
  const [likeClick, setLikeClick] = useState(null);
  const [likeFill, setLikeFill] = useState(props.liked);
  const [moreClick, setMoreClick] = useState(false);
  //   const [justLoaded, setJustLoaded] = useState(true);
  const dispatch = useDispatch();
  const mediaEl =
    props.el.media_type === "video" ? (
      <iframe title={props.el.title} src={props.el.url}></iframe>
    ) : (
      <img src={props.el.url} alt={props.title}></img>
    );

  const humanDate = (date) => {
    const dateObj = new Date(date);
    const today = new Date();
    const diff = today.getDate() - dateObj.getDate();
    if (
      diff > 1 ||
      today.getMonth() !== dateObj.getMonth() ||
      today.getFullYear() !== dateObj.getFullYear()
    ) {
      return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(date));
    } else {
      if (diff === 1) {
        return "Yesterday";
      } else {
        return "Today";
      }
    }
  };

  const moreExpHandler = () => {
    setMoreClick(true);
  };

  const shortexp = (exp) => {
    const explist = exp.split(" ");
    if (explist.length < 40) {
      return <p>explist.join(" ")</p>;
    } else {
      return (
        <p>
          {explist.slice(0, 40).join(" ")}...
          <span onClick={moreExpHandler}> more</span>
        </p>
      );
    }
  };

  const linkCopyHandler = function (e) {
    navigator.clipboard.writeText(props.el.url);
    setLinkClick(true);
    setTimeout(() => {
      setLinkClick(false);
    }, 3000);
  };

  const likeClickHandler = function (e) {
    setBtnCLick(true);
    setLikeClick(!likeFill);
    setLikeFill(!likeFill);
    setTimeout(() => {
      setBtnCLick(false);
    }, 300);
  };

  useEffect(() => {
    if (likeClick === null) return;
    if (likeClick) {
      dispatch(likedActions.addLike(props.el.date));
    } else {
      dispatch(likedActions.removeLike(props.el.date));
    }
  }, [likeClick, props.el.date, dispatch]);

  useEffect(() => {
    if (props.lastEl) {
      new IntersectionObserver(
        function (entries, observer) {
          if (entries[0].isIntersecting) {
            dispatch(
              dateActions.setDate({
                date: newDate(props.el.date, 1),
                count: 10,
              })
            );

            observer.disconnect();
          }
        },
        {
          root: null,
        }
      ).observe(liRef.current);
    }
  }, [dispatch, props.lastEl, props.el.date]);
  return (
    <li ref={liRef} className={classes.list_el}>
      <h4>{`@ ${props.el.copyright ?? "anonymous"}`}</h4>
      <figure>{mediaEl}</figure>
      <div className={classes.actions}>
        <button
          onClick={likeClickHandler}
          className={
            (btnCLick ? classes.clicked : "") +
            " " +
            (likeFill ? classes["like--active"] : "")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 0 24 24"
            width="32px"
            fill="#FFFFFF"
            transform="scale(1)"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
              fill="white"
            />
            <path
              id="like_fill"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              opacity="0"
              fill="red"
            />
          </svg>
        </button>
        <button onClick={linkCopyHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 0 24 24"
            width="32px"
            fill="#FFFFFF"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z" />
          </svg>
        </button>
        <p className={linkClick ? classes.tool_tip : ""}>link copied!</p>
      </div>
      <div className={classes.content}>
        <h2>{props.el.title}</h2>
        {moreClick ? (
          <p>{props.el.explanation}</p>
        ) : (
          shortexp(props.el.explanation)
        )}
        <p>{humanDate(props.el.date)}</p>
      </div>
    </li>
  );
};

export default ListEl;
