import React, { useEffect } from "react";
import background from "../../assets/background.webm";
import { useNavigate } from "react-router";

const Home = () => {
    let navigation = new useNavigate();
    function click() {
        navigation("/signin");
    }

    return (
        <>
            <div className="home">
                <video autoPlay loop muted>
                    <source type="video/webm" src={background} />
                </video>
                <button onClick={click}>Bắt đầu</button>
            </div>
        </>
    );
};

export default Home;
