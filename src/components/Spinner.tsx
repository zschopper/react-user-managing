interface Props {
  shown: boolean;
}
const Spinner = ({shown} : Props) => {
  console.log("spinner: " + shown)
  return shown &&   <div id="overlay" className="visible"><div className="spinner"></div></div>;
};

export default Spinner;
