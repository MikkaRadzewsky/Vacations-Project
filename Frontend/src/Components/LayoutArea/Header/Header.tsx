import "./Header.css";
import header from "../../../Assets/Images/galacticVacations.png"

function Header(): JSX.Element {
    return (
        <div className="Header">
            <img crossOrigin="anonymous" src={header}/>
        </div>
    );
}

export default Header;

