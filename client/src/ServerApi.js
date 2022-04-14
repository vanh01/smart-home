
let baseUrl = "https://localhost:5001";
//- Đăng nhập: username, password -> key (get)
// https://localhost:5001/api/account/key?phonenumber=1&password=1
export async function accountGetKey(phonenumber, password) {
	let accountKey = "";
	var requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};

	await fetch(`${baseUrl}/api/account/key?phonenumber=${phonenumber}&password=${password}`, requestOptions)
		.then(response => response.text())
		.then(result => { accountKey = result; console.log(result) })
		.catch(error => console.log('error', error));
	return accountKey;
}

//- Lấy được số căn hộ: key -> list căn hộ (get)
// https://localhost:5001/api/apartment/11klasklslk11232
export async function apartmentGetOne(key) {
	let apartmentInfo;
	var requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};

	await fetch(`${baseUrl}/api/apartment/${key}`, requestOptions)
		.then(response => response.json())
		.then(result => { apartmentInfo = result; })
		.catch(error => console.log('error', error));
	return apartmentInfo;
}

//- Lấy được list thiết bị: key, tên căn hộ -> list thiết bị (get)
// https://localhost:5001/api/device/asaxkioiowe123as?apartmentname=nct
export async function getListDevice(key, apartmentname) {
	let listDevice;
	var requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};

	await fetch(`${baseUrl}/api/device/${key}?apartmentname=${apartmentname}`, requestOptions)
		.then(response => response.json())
		.then(result => { listDevice = result; })
		.catch(error => console.log('error', error));
	return listDevice;
}

// - Lấy được nhật ký của tất cả thiết bị: key, tên căn hộ -> list hoạt động (get)
// Ex: https://localhost:5001/api/log/getAllLogs?key=asaxkioiowe123as&name=nct
export async function getAllLogs(key, name) {
	let allLog;
	var requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};

	await fetch(`${baseUrl}/api/log/getAllLogs?key=${key}&name=${name}`, requestOptions)
		.then(response => response.json())
		.then(result => { allLog = result; })
		.catch(error => console.log('error', error));
	return allLog;
}

//- Lấy nhật ký mới nhất của thiết bị: key, tên căn hộ, id -> object (get)
// Ex:
export async function getLastLog(key, apartmentName) {
	let lastLog;
	var requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};

	await fetch(`${baseUrl}/api/log/${key}/last?apartmentName=${apartmentName}`, requestOptions)
		.then(response => response.json())
		.then(result => { lastLog = result; })
		.catch(error => console.log('error', error));
	return lastLog;
}

export async function deleteAccount(key, adminKey) {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify(adminKey);

	var requestOptions = {
		method: 'PUT',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	await fetch(baseUrl +  "/api/account/" + key + "/delete", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
}


export async function updateAccount(key, account, information) {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		"phonenumber": account.phonenumber,
		"password": account.password,
		"rules": account.rules,
		"privatekey": ""
	});

	var requestOptions = {
		method: 'PUT',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	await fetch(baseUrl + "/api/account/" + key + "/update", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));

	myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	raw = JSON.stringify({
		"phonenumber": "",
		"email": information.email,
		"name": information.name,
		"datecreated": "",
		"dateupdated": ""
	});

	requestOptions = {
		method: 'PUT',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	await fetch(baseUrl + "/api/information/" + key + "/update", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
}

export async function addApartment(key, phonenumber, apartment) {
    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            phonenumber: phonenumber,
            apartmentname: apartment.name,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        await fetch(
            `${baseUrl}/api/apartment/${key}/add`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
};

export async function addDevices (key, systems, apartmentname) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let temp = [];
        temp.push({
            id: "1",
            apartmentname: apartmentname,
            phonenumber: "1",
            devicename: "led",
            active: true,
            limited: 100,
        });
        temp.push({
            id: "3",
            apartmentname: apartmentname,
            phonenumber: "1",
            devicename: "speaker",
            active: true,
            limited: 100,
        });
        temp.push({
            id: "2",
            apartmentname: apartmentname,
            phonenumber: "1",
            devicename: "air-condition",
            active: true,
            limited: 100,
        });
        systems.forEach((system) => {
            if (system.name === "Hệ thống khí gas") {
                temp.push({
                    id: "8",
                    apartmentname: apartmentname,
                    phonenumber: "1",
                    devicename: "gas",
                    active: system.active,
                    limited: 100,
                });
            } else if (system.name === "Hệ thống đèn qua cảm biến âm thanh") {
                temp.push({
                    id: "4",
                    apartmentname: apartmentname,
                    phonenumber: "1",
                    devicename: "sound",
                    active: system.active,
                    limited: 100,
                });
            } else if (system.name === "Hệ thống đèn qua cảm biến ánh sáng") {
                temp.push({
                    id: "5",
                    apartmentname: apartmentname,
                    phonenumber: "1",
                    devicename: "light",
                    active: system.active,
                    limited: 100,
                });
            } else if (system.name === "Hệ thống đèn qua công tắc") {
                temp.push({
                    id: "9",
                    apartmentname: apartmentname,
                    phonenumber: "1",
                    devicename: "switch-led",
                    active: system.active,
                    limited: 100,
                });
            } else if (system.name === "Hệ thống điều hòa qua cảm biến") {
                temp.push({
                    id: "6",
                    apartmentname: apartmentname,
                    phonenumber: "1",
                    devicename: "temp",
                    active: system.active,
                    limited: 100,
                });
                temp.push({
                    id: "7",
                    apartmentname: apartmentname,
                    phonenumber: "1",
                    devicename: "humid",
                    active: system.active,
                    limited: 100,
                });
            } else if (system.name === "Hệ thống điều hòa qua công tắc") {
                temp.push({
                    id: "10",
                    apartmentname: apartmentname,
                    phonenumber: "1",
                    devicename: "switch-air-condition",
                    active: system.active,
                    limited: 100,
                });
            }
        });

        let raw = JSON.stringify(temp);
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        await fetch(
            `${baseUrl}/api/device/${key}/add`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
};


export async function deleteApartment(key, apartment) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        apartmentname: apartment.apartmentname,
        phonenumber: apartment.phonenumber
    });

    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    await fetch(`${baseUrl}/api/apartment/${key}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

export async function getAccount(phonenumber, password) {
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };
    let temp;
    await fetch(`${baseUrl}/api/account/account?phonenumber=${phonenumber}&password=${password}`, requestOptions)
        .then(response => {
            if (response.status === 200)
                return response.json();
            else
                return {};
        })
    .then(result => temp = result)
    .catch(error => console.log('error', error));
    return temp;
}

export async function forgotPassword(phonenumber) {
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };
    
    let temp;
    await fetch(`${baseUrl}/api/account/account/forgot?phonenumber=${phonenumber}`, requestOptions)
    .then(response => {
        if (response.status === 200)
            return response.json();
        else
            return {};
    })
    .then(result => temp = result)
    .catch(error => console.log('error', error));
    return temp;
}