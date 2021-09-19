import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import Loader from "./components/UI/Loader";
import useHttp from "./hooks/use-http";
import { likedActions } from "./store";
import newDate from "./utils/newDate";

function App() {
  const [list, setList] = useState([]);
  // const [justLoaded, setJustLoaded] = useState(true);
  const { error, isLoading, sendRequest } = useHttp();
  const { date, count } = useSelector((state) => state.date);
  const { liked } = useSelector((state) => state.liked);
  const dispatch = useDispatch();

  useEffect(() => {
    const startDate = newDate(date, count);
    const reverseList = (data) => {
      data.reverse();
      setList((prevState) => {
        return prevState.concat(data);
      });
    };
    sendRequest({ startDate, endDate: date }, reverseList);
  }, [date, count, sendRequest]);

  useEffect(() => {
    if (!liked) return;
    window.localStorage.setItem("liked", JSON.stringify(liked));
  }, [liked]);

  useEffect(() => {
    const likedList = JSON.parse(window.localStorage.getItem("liked"));
    if (likedList) {
      dispatch(likedActions.init(likedList));
    } else {
      dispatch(likedActions.init([]));
    }
  }, [dispatch]);

  return (
    <main className="app">
      <Header />
      {list && <List list={list} likedList={liked} />}
      {error && <p style={{ color: "#aaa", textAlign: "center" }}>{error}</p>}
      {isLoading && <Loader />}
    </main>
  );
}

export default App;
