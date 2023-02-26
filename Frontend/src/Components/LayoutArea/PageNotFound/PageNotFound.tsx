import imageSource from "../../../Assets/Images/not-found.png"
import "./PageNotFound.css";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <img src={imageSource} />
        </div>

    );
}

export default PageNotFound;
