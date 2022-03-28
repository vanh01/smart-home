//- Đăng nhập: username, password -> key (get)
// https://localhost:5001/api/account/key?phonenumber=1&password=1
export async function accountGetKey(phonenumber, password) {
	let accountKey = "";
	var requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};

	await fetch(`https://localhost:5001/api/account/key?phonenumber=${phonenumber}&password=${password}`, requestOptions)
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

	await fetch(`https://localhost:5001/api/apartment/${key}`, requestOptions)
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

	await fetch(`https://localhost:5001/api/device/${key}?apartmentname=${apartmentname}`, requestOptions)
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

	await fetch(`https://localhost:5001/api/log/getAllLogs?key=${key}&name=${name}`, requestOptions)
		.then(response => response.json())
		.then(result => { allLog = result; })
		.catch(error => console.log('error', error));
	return allLog;
}

//- Lấy nhật ký mới nhất của thiết bị: key, tên căn hộ, id -> object (get)
// Ex:
export async function getLastLog(key, apartmentName, id) {
	let lastLog;
	var requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};

	await fetch(`https://localhost:5001/api/log/${key}/last?apartmentName=${apartmentName}&id=${id}`, requestOptions)
		.then(response => response.json())
		.then(result => { lastLog = result; })
		.catch(error => console.log('error', error));
	return lastLog;
}
