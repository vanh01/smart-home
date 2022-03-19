import React from "react";
import { useState } from 'react';
import { Line } from "react-chartjs-2";
import {
    CategoryScale, Chart,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
Chart.register(CategoryScale)
Chart.register(LinearScale)
Chart.register(PointElement)
Chart.register(LineElement)
Chart.register(Title)
Chart.register(Tooltip)
Chart.register(Legend)



const ActivityLog = () => {

    let [yValue, setXValue] = useState([0, 1, 0, 1, 0, 1, 0])
    let [xValue, setYValue] = useState(["2022-03-18 7:00:00", "2022-03-18 7:01:00", "2022-03-18 7:02:00", "2022-03-18 7:03:00", "2022-03-18 7:04:00", "2022-03-18 7:05:00", "2022-03-18 7:06:00"])


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
            <h5 > Thiết bị:  </h5>
            <ul className="device__select-box">
                <li className="device__select" onClick={showDevice}> Đèn</li>
                <div className="device__option-list">
                    <li className="device__option" onClick={selectDevice}>Đèn</li>
                    <li className="device__option" onClick={selectDevice}>Khí Gas</li>
                    <li className="device__option" onClick={selectDevice}>Điều hòa</li>
                    <li className="device__option" onClick={selectDevice}>Cảm biến ánh sáng</li>
                    <li className="device__option" onClick={selectDevice}>Cảm biến âm thanh</li>
                    <li className="device__option" onClick={selectDevice}>Cảm biến khí gas</li>
                    <li className="device__option" onClick={selectDevice}>Cảm biến DHT11</li>
                </div>
            </ul>
            <div className="activity__date">
                <input type="date" className="date__select-box date__select" defaultValue="2022-03-14"></input>
                <i className="fa-regular fa-arrow-right"></i>
                <input type="date" className="date__select-box date__select" defaultValue="2022-03-14"></input>
            </div>
        </div>
        <div className="activity__chart">
            {/* <Line
                data={{
                    labels: xValue,
                    datasets: [{
                        data: yValue,
                        fill: false,
                        backgroundColor: '#e1e1e1',
                        label: "độ ẩm",
                        borderColor: '#0fff9c'
                    }]
                }}
                options={{
                    title: {
                        display: true,
                        title: 'Nhật kí đèn'
                    },
                    legend: {
                        display: true,
                        position: "bottom",
                        title: "status"
                    }
                }}
            /> */}
            <Line
                data={{
                    labels: xValue,
                    datasets: [{
                        data: yValue,
                        fill: false,
                        backgroundColor: '#e1e1e1',
                        borderColor: '#0fff9c',
                        label: "trạng thái đèn"
                    }]
                }}
                options={{
                    title: {
                        display: true,
                        text: 'Nhật kí đèn'
                    },
                    legend: {
                        display: true,
                        position: "bottom",
                        title: "status"
                    }
                }}
            />
        </div>
        <table className="activity__table">
            <tr className="table__row">
                <th className="table_header">Stt</th>
                <th className="table_header">Trạng thái</th>
                <th className="table_header">Tác nhân</th>
                <th className="table_header">Thời điểm</th>
                <th className="table_header">Ngày</th>
            </tr>
            <tr className="table__row">
                <td className="table_col">1</td>
                <td className="table_col">0</td>
                <td className="table_col">Công tắc</td>
                <td className="table_col">7:00:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
            <tr className="table__row">
                <td className="table_col">2</td>
                <td className="table_col">1</td>
                <td className="table_col">Công tắc</td>
                <td className="table_col">7:01:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
            <tr className="table__row">
                <td className="table_col">3</td>
                <td className="table_col">0</td>
                <td className="table_col">Công tắc</td>
                <td className="table_col">7:02:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
        </table>
    </div>



};

export default ActivityLog;
