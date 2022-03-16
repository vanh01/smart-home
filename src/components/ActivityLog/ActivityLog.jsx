import React from "react";


const ActivityLog = () => {

    function showDevice(e,) {
        let select = document.querySelectorAll('.device__option');
        select.forEach(element => {
            element.classList.toggle('device__option--show')
        });

    }
    function selectDevice(e) {
        let show = document.querySelector('.device__select');
        show.innerText = e.target.innerText;
        showDevice()
    }

    return <div className="activity-log">
        <div className="activity__button">
            <ul className="device__select-box">
                <li className="device__select" onClick={showDevice}> Đèn</li>
                <li className="device__option" onClick={selectDevice}>Đèn</li>
                <li className="device__option" onClick={selectDevice}>Khí Gas</li>
                <li className="device__option" onClick={selectDevice}>Điều hòa</li>
                <li className="device__option" onClick={selectDevice}>Cảm biến ánh sáng</li>
                <li className="device__option" onClick={selectDevice}>Cảm biến âm thanh</li>
                <li className="device__option" onClick={selectDevice}>Cảm biến khí gas</li>
                <li className="device__option" onClick={selectDevice}>Cảm biến DHT11</li>
            </ul>
            <div class="activity__date">
                <input type="date" class="device__select-box date__select" ></input>
                <i class="fa-regular fa-arrow-right"></i>
                <input type="date" class="device__select-box date__select"></input>
            </div>
        </div>
    </div>


};

export default ActivityLog;
