const CountTitle = ({ len, name }) => {
  return (
    <div className="count_title">
      По данной выборке всего - {len} {name}
    </div>
  );
};

export default CountTitle;
