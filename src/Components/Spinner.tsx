import RingLoader from "react-spinners/RingLoader";
import "../Scss/Spinner.scss"
const Spinner: React.FC = () => {
    return (
        (
            <div className="sweet-loading">
                <RingLoader
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    color="rgb(163 202 202)"
                />
            </div>
        )
    )
}
export default Spinner;