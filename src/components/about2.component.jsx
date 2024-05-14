import { Link } from "react-router-dom";
import { getFullDay } from "../common/date";

const AboutUser2 = ({ className, bio, social_links, joinedAt }) => {
    return (
        <div className={"md:w-[90%] md:mt-7 " + className}>      
            <p className="text-xl leading-7 text-dark-grey">Joined on {(joinedAt)}</p>
        </div>
    )
}

export default AboutUser2;