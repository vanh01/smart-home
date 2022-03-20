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

    let [xValue, setXValue] = useState(["2022-03-18 7:00:00", "2022-03-18 7:01:00", "2022-03-18 7:02:00", "2022-03-18 7:03:00", "2022-03-18 7:04:00", "2022-03-18 7:05:00", "2022-03-18 7:06:00"])
    let [yValue1, setYValue1] = useState([0, 1, 0, 1, 0, 1, 0])
    let [yValue2, setYValue2] = useState([0, 1, 0, 1, 0, 1, 0])

    let [device, setDevice] = useState(0);

    console.log(device)
    function showDevice(e) {
        let select = document.querySelectorAll('.device__option');
        select.forEach(element => {
            element.classList.toggle('device__option--show')
        });

    }
    function selectDevice(e) {
        let show = document.querySelector('.device__select');
        let select = e.target.innerText;
        show.innerText = select;
        if (select.indexOf('Đèn') != -1) {
            setDevice(0)
        }
        else if (select.indexOf('Loa') != -1) {
            setDevice(1)
        }
        else if (select.indexOf('Điều hòa') != -1) {
            setDevice(2)
        }
        else if (select.indexOf('sáng') != -1) {
            setDevice(3)
        }
        else if (select.indexOf('âm') != -1) {
            setDevice(4)
        }
        else if (select.indexOf('gas') != -1) {
            setDevice(5)
        }
        else if (select.indexOf('DHT11') != -1) {
            setDevice(6)
        }
        showDevice()
    }

    return <div className="activity-log">
        <div className="activity__button">
            <h5 > Thiết bị:  </h5>
            <ul className="device__select-box">
                <li className="device__select" onClick={showDevice}> Đèn</li>
                <div className="device__option-list">
                    <li className="device__option" onClick={selectDevice}>Đèn</li>
                    <li className="device__option" onClick={selectDevice}>Loa</li>
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

        <ShowChart device={device} xValue={xValue} yValue1={yValue1} yValue2={yValue2} />

        <ShowTable device={device} />

    </div>


};

export default ActivityLog;

function ShowChart(data) {
    if (data.device == 6) {
        return <div className="activity__chart">
            <Line
                data={{
                    labels: data.xValue,
                    datasets: [{
                        data: data.yValue1,
                        fill: false,
                        backgroundColor: '#e1e1e1',
                        borderColor: '#efff00',
                        label: "Nhiệt độ"
                    }]
                }}
                options={{
                    title: {
                        display: true,
                        text: 'Nhiệt độ'
                    },
                    legend: {
                        display: true,
                        position: "bottom",
                        title: "status"
                    }
                }}
            />
            <Line
                data={{
                    labels: data.xValue,
                    datasets: [{
                        data: data.yValue2,
                        fill: false,
                        backgroundColor: '#e1e1e1',
                        borderColor: '#00e5ff',
                        label: "Độ ẩm"
                    }]
                }}
                options={{
                    title: {
                        display: true,
                        text: 'Độ ẩm'
                    },
                    legend: {
                        display: true,
                        position: "bottom",
                        title: "status"
                    }
                }}
            />
        </div>
    }
    else {
        let name = "Trạng thái"
        switch (data.device) {
            case 0:
                name = "Trạng thái đèn"
                break;
            case 1:
                name = "Trạng thái loa"
                break;
            case 2:
                name = "Trạng thái điều hòa"
                break;
            case 3:
                name = "Cường độ ánh sáng"
                break;
            case 4:
                name = "Cường độ âm thanh"
                break;
            case 5:
                name = "Nồng độ khí gas"
                break;
        }
        return <div className="activity__chart">
            <Line
                data={{
                    labels: data.xValue,
                    datasets: [{
                        data: data.yValue1,
                        fill: false,
                        backgroundColor: '#e1e1e1',
                        borderColor: '#0fff9c',
                        label: name
                    }]
                }}
                options={{
                    title: {
                        display: true,
                        text: name
                    },
                    legend: {
                        display: true,
                        position: "bottom",
                        title: "status"
                    }
                }}
            />
        </div>
    }
    return <div>asdads</div>
}

function ShowTable(data) {
    console.log("asdasddasd: ", data.device);
    if (data.device == 0) {
        return <table className="activity__table">
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
    }
    else if (data.device == 1) {
        return <table className="activity__table">
            <tr className="table__row">
                <th className="table_header">Stt</th>
                <th className="table_header">Trạng thái</th>
                <th className="table_header">Thời điểm</th>
                <th className="table_header">Ngày</th>
            </tr>
            <tr className="table__row">
                <td className="table_col">1</td>
                <td className="table_col">0</td>
                <td className="table_col">7:00:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
            <tr className="table__row">
                <td className="table_col">2</td>
                <td className="table_col">1</td>
                <td className="table_col">7:01:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
            <tr className="table__row">
                <td className="table_col">3</td>
                <td className="table_col">0</td>
                <td className="table_col">7:02:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
        </table>
    }
    else if (data.device == 2) {
        return <table className="activity__table">
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
    }
    else if (data.device == 3) {
        return <table className="activity__table">
            <tr className="table__row">
                <th className="table_header">Stt</th>
                <th className="table_header">Cường độ ánh sáng</th>
                <th className="table_header">Thời điểm</th>
                <th className="table_header">Ngày</th>
            </tr>
            <tr className="table__row">
                <td className="table_col">1</td>
                <td className="table_col">0</td>
                <td className="table_col">7:00:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
            <tr className="table__row">
                <td className="table_col">2</td>
                <td className="table_col">1</td>
                <td className="table_col">7:01:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
            <tr className="table__row">
                <td className="table_col">3</td>
                <td className="table_col">0</td>
                <td className="table_col">7:02:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
        </table>
    }
    else if (data.device == 4) {
        return <table className="activity__table">
            <tr className="table__row">
                <th className="table_header">Stt</th>
                <th className="table_header">Cường độ âm thanh</th>
                <th className="table_header">Thời điểm</th>
                <th className="table_header">Ngày</th>
            </tr>
            <tr className="table__row">
                <td className="table_col">1</td>
                <td className="table_col">0</td>
                <td className="table_col">7:00:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
            <tr className="table__row">
                <td className="table_col">2</td>
                <td className="table_col">1</td>
                <td className="table_col">7:01:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
            <tr className="table__row">
                <td className="table_col">3</td>
                <td className="table_col">0</td>
                <td className="table_col">7:02:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
        </table>
    }
    else if (data.device == 5) {
        return <table className="activity__table">
            <tr className="table__row">
                <th className="table_header">Stt</th>
                <th className="table_header">Nồng độ khí gas</th>
                <th className="table_header">Thời điểm</th>
                <th className="table_header">Ngày</th>
            </tr>
            <tr className="table__row">
                <td className="table_col">1</td>
                <td className="table_col">0</td>
                <td className="table_col">7:00:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
            <tr className="table__row">
                <td className="table_col">2</td>
                <td className="table_col">1</td>
                <td className="table_col">7:01:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
            <tr className="table__row">
                <td className="table_col">3</td>
                <td className="table_col">0</td>
                <td className="table_col">7:02:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
        </table>
    }
    else {
        return <table className="activity__table">
            <tr className="table__row">
                <th className="table_header">Stt</th>
                <th className="table_header">Nhiệt độ</th>
                <th className="table_header">độ ẩm</th>
                <th className="table_header">Thời điểm</th>
                <th className="table_header">Ngày</th>
            </tr>
            <tr className="table__row">
                <td className="table_col">1</td>
                <td className="table_col">0</td>
                <td className="table_col">0</td>
                <td className="table_col">7:00:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
            <tr className="table__row">
                <td className="table_col">2</td>
                <td className="table_col">1</td>
                <td className="table_col">1</td>
                <td className="table_col">7:01:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
            <tr className="table__row">
                <td className="table_col">3</td>
                <td className="table_col">0</td>
                <td className="table_col">0</td>
                <td className="table_col">7:02:00</td>
                <td className="table_col">2022-03-18 </td>
            </tr>
        </table>
    }


    // switch (data.divice) {
    //     case 0:

    //     case 1:

    //         break;
    //     case 2:

    //     case 3:

    //     case 4:

    //     case 5:

    //     case 6:

    return <div>asdasdasd</div>
}

