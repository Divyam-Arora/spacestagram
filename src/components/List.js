import ListEl from "./ListEl";

import classes from "./List.module.css";

const List = function (props) {
  const apodList = props.list.map((el, i, arr) => {
    return (
      <ListEl
        key={el.date}
        el={el}
        lastEl={arr.length - 1 === i ? true : false}
        liked={props.likedList.some((value) => value === el.date)}
      />
    );
  });
  return <ul className={classes.list}>{apodList}</ul>;
};

export default List;
