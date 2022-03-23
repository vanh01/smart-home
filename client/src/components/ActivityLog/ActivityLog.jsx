import React from "react";
import { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
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

    let [allLabel, setAllLabel] = useState(["2022-03-14 7:00:00", "2022-03-14 7:01:00", "2022-03-15 7:02:00", "2022-03-15 7:03:00", "2022-03-16 7:04:00", "2022-03-17 7:05:00", "2022-03-18 7:06:00"])
    let [allData1, setAllData1] = useState([0, 1, 0, 1, 0, 1, 0])
    let [allData2, setAllData2] = useState([0, 1, 0, 1, 0, 1, 0])
    let [device, setDevice] = useState(0);

    let [xValue, setXValue] = useState([])
    let [yValue1, setYValue1] = useState([])
    let [yValue2, setYValue2] = useState([])

    let [startDate, setStartDate] = useState(new Date("2022-03-14"))
    let [endDate, setEndDate] = useState(new Date("2022-03-15"))
    // let endDate = new Date("2022-03-14")

    useEffect(() => {
        fillData(device, startDate, endDate, allLabel, allData1, allData2, setXValue, setYValue1, setYValue2)
    }, [startDate, endDate, device])

    console.log(1)
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
        if (select.indexOf('Đèn') !== -1) {
            setDevice(0)
        }
        else if (select.indexOf('Loa') !== -1) {
            setDevice(1)
        }
        else if (select.indexOf('Điều hòa') !== -1) {
            setDevice(2)
        }
        else if (select.indexOf('sáng') !== -1) {
            setDevice(3)
        }
        else if (select.indexOf('âm') !== -1) {
            setDevice(4)
        }
        else if (select.indexOf('gas') !== -1) {
            setDevice(5)
        }
        else if (select.indexOf('DHT11') !== -1) {
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
                <input type="date" className="date__select-box date__select" defaultValue="2022-03-14" onChange={(e) => { setStartDate(new Date(e.target.value)) }}></input>
                <FontAwesomeIcon icon={faArrowRight} className="date__icon" />

                <input type="date" className="date__select-box date__select" defaultValue="2022-03-14" onChange={(e) => { let date = new Date(e.target.value); date.setDate(date.getDate() + 1); setEndDate(date) }}></input>
            </div>
        </div>

        <ShowChart device={device} xValue={xValue} yValue1={yValue1} yValue2={yValue2} />

        <ShowTable device={device} xValue={xValue} yValue1={yValue1} yValue2={yValue2} />

    </div>


};

export default ActivityLog;


function ShowChart(data) {
    if (data.device === 6) {
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
            default:
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

}

function ShowTable(data) {
    let stt = 1
    if (data.device === 0) {
        return <table className="activity__table">
            <tbody>
                <tr className="table__row">
                    <th className="table_header">Stt</th>
                    <th className="table_header">Trạng thái</th>
                    <th className="table_header">Tác nhân</th>
                    <th className="table_header">Thời điểm</th>
                    <th className="table_header">Ngày</th>
                </tr>
                {data.xValue.map((x, index) => {
                    return <tr key={x} className="table__row">
                        <td className="table_col">{stt++}</td>
                        <td className="table_col">{data.yValue1[index]}</td>
                        <td className="table_col">{data.yValue2[index]}</td>
                        <td className="table_col">{getTimeFromString(x)}</td>
                        <td className="table_col">{getDateFromString(x)} </td>
                    </tr>
                })}
            </tbody>
        </table>
    }
    else if (data.device === 1) {
        return <table className="activity__table">
            <tbody>
                <tr className="table__row">
                    <th className="table_header">Stt</th>
                    <th className="table_header">Trạng thái</th>
                    <th className="table_header">Thời điểm</th>
                    <th className="table_header">Ngày</th>
                </tr>
                {data.xValue.map((x, index) => {
                    return <tr key={x} className="table__row">
                        <td className="table_col">{stt++}</td>
                        <td className="table_col">{data.yValue1[index]}</td>
                        <td className="table_col">{getTimeFromString(x)}</td>
                        <td className="table_col">{getDateFromString(x)} </td>
                    </tr>
                })}
            </tbody>
        </table>
    }
    else if (data.device === 2) {
        return <table className="activity__table">
            <tbody>
                <tr className="table__row">
                    <th className="table_header">Stt</th>
                    <th className="table_header">Trạng thái</th>
                    <th className="table_header">Tác nhân</th>
                    <th className="table_header">Thời điểm</th>
                    <th className="table_header">Ngày</th>
                </tr>
                {data.xValue.map((x, index) => {
                    return <tr key={x} className="table__row">
                        <td className="table_col">{stt++}</td>
                        <td className="table_col">{data.yValue1[index]}</td>
                        <td className="table_col">{data.yValue2[index]}</td>
                        <td className="table_col">{getTimeFromString(x)}</td>
                        <td className="table_col">{getDateFromString(x)} </td>
                    </tr>
                })}
            </tbody>
        </table>
    }
    else if (data.device === 3) {
        return <table className="activity__table">
            <tbody>
                <tr className="table__row">
                    <th className="table_header">Stt</th>
                    <th className="table_header">Cường độ ánh sáng</th>
                    <th className="table_header">Thời điểm</th>
                    <th className="table_header">Ngày</th>
                </tr>
                {data.xValue.map((x, index) => {
                    return <tr key={x} className="table__row">
                        <td className="table_col">{stt++}</td>
                        <td className="table_col">{data.yValue1[index]}</td>
                        <td className="table_col">{getTimeFromString(x)}</td>
                        <td className="table_col">{getDateFromString(x)} </td>
                    </tr>
                })}
            </tbody>
        </table>
    }
    else if (data.device === 4) {
        return <table className="activity__table">
            <tbody>
                <tr className="table__row">
                    <th className="table_header">Stt</th>
                    <th className="table_header">Cường độ âm thanh</th>
                    <th className="table_header">Thời điểm</th>
                    <th className="table_header">Ngày</th>
                </tr>
                {data.xValue.map((x, index) => {
                    return <tr key={x} className="table__row">
                        <td className="table_col">{stt++}</td>
                        <td className="table_col">{data.yValue1[index]}</td>
                        <td className="table_col">{getTimeFromString(x)}</td>
                        <td className="table_col">{getDateFromString(x)} </td>
                    </tr>
                })}
            </tbody>
        </table>
    }
    else if (data.device === 5) {
        return <table className="activity__table">
            <tbody>
                <tr className="table__row">
                    <th className="table_header">Stt</th>
                    <th className="table_header">Nồng độ khí gas</th>
                    <th className="table_header">Thời điểm</th>
                    <th className="table_header">Ngày</th>
                </tr>
                {data.xValue.map((x, index) => {
                    return <tr key={x} className="table__row">
                        <td className="table_col">{stt++}</td>
                        <td className="table_col">{data.yValue1[index]}</td>
                        <td className="table_col">{getTimeFromString(x)}</td>
                        <td className="table_col">{getDateFromString(x)} </td>
                    </tr>
                })}
            </tbody>
        </table>
    }
    else {
        return <table className="activity__table">
            <tbody>
                <tr className="table__row">
                    <th className="table_header">Stt</th>
                    <th className="table_header">Nhiệt độ</th>
                    <th className="table_header">độ ẩm</th>
                    <th className="table_header">Thời điểm</th>
                    <th className="table_header">Ngày</th>
                </tr>
                {data.xValue.map((x, index) => {
                    return <tr key={x} className="table__row">
                        <td className="table_col">{stt++}</td>
                        <td className="table_col">{data.yValue1[index]}</td>
                        <td className="table_col">{data.yValue2[index]}</td>
                        <td className="table_col">{getTimeFromString(x)}</td>
                        <td className="table_col">{getDateFromString(x)} </td>
                    </tr>
                })}
            </tbody>
        </table>
    }
}

function fillData(device, startDate, endDate, allLabel, allData1, allData2, setXValue, setYValue1, setYValue2) {
    let indexList = []
    let x = []
    let y1 = []
    let y2 = []

    for (let i = 0; i < allLabel.length; i++) {
        if (startDate <= new Date(allLabel[i]) && endDate >= new Date(allLabel[i])) {
            indexList = [...indexList, i]
            x = [...x, allLabel[i]]
        }
    }
    if (device === 0) {
        // đèn
        y1 = allData1.filter((data, index) => (indexList.includes(index)))
        // y2 = allData2.filter((data, index) => (indexList.includes(index)))
        // test
        for (let i = 0; i < allData2.length; i++) {
            if (indexList.includes(i)) {
                y2 = [...y2, "Công tắc"]
            }
        }
    }
    if (device === 1) {
        // loa
        y1 = allData1.filter((data, index) => (indexList.includes(index)))
    }
    if (device === 2) {
        // điều hòa
        y1 = allData1.filter((data, index) => (indexList.includes(index)))
        // y2 = allData2.filter((data, index) => (indexList.includes(index)))
        for (let i = 0; i < allData2.length; i++) {
            if (indexList.includes(i)) {
                y2 = [...y2, "Công tắc"]
            }
        }
    }
    if (device === 3) {
        // ánh sáng
        y1 = allData1.filter((data, index) => (indexList.includes(index)))
    }
    if (device === 4) {
        // âm thanh
        y1 = allData1.filter((data, index) => (indexList.includes(index)))
    }
    if (device === 5) {
        // gass
        y1 = allData1.filter((data, index) => (indexList.includes(index)))
    }
    if (device === 6) {
        // DHT
        y1 = allData1.filter((data, index) => (indexList.includes(index)))
        y2 = allData2.filter((data, index) => (indexList.includes(index)))
    }

    setYValue1(y1)
    setYValue2(y2)
    setXValue(x)
}


function dateToString(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate())
}

function getDateFromString(date) {
    return date.split(' ')[0]
}

function getTimeFromString(date) {
    return date.split(' ')[1]
}