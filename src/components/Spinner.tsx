interface Props {
  shown: boolean;
}
const Spinner = ({shown} : Props) => {
  console.log("spinner: " + shown)
  return shown ? <div className={"spinner"}>Working..</div> : <div></div>;
};

export default Spinner;
