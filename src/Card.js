import "./Card.css";
export default function Card(props) {
  var value = props.value;
  var filteredValue;
  if (props.item == "Days") {
    filteredValue = props.value[0];
  } else if (props.item == "Hours") {
    filteredValue = props.value[1];
  } else if (props.item == "Minutes") {
    filteredValue = props.value[2];
  } else {
    filteredValue = props.value[3];
  }
  return (
    <div className="card">
      <h1>{value}</h1>
      <h1>{props.item}</h1>
    </div>
  );
}
