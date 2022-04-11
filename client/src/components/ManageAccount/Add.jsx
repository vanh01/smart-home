import React from "react";

const Add = ({ setShowAdd, accounts, setAccount }) => {

	// const postAccountInfo = async (accountAdd, infoAdd) => {
	// 	// const postAccount = async () => {
	// 	var myHeaders = new Headers();
	// 	myHeaders.append("Content-Type", "application/json");

	// 	// var raw = JSON.stringify({
	// 	// 	"phonenumber": "0984123456",
	// 	// 	"password": "abc12344",
	// 	// 	"privatekey": "key4",
	// 	// 	"rules": "1"
	// 	// });
	// 	var raw = JSON.stringify(accountAdd);

	// 	var requestOptions = {
	// 		method: 'POST',
	// 		headers: myHeaders,
	// 		body: raw,
	// 		redirect: 'follow'
	// 	};

	// 	await fetch("https://localhost:5001/api/account/add/abc1", requestOptions)
	// 		.then(response => response.text())
	// 		.then(result => console.log(result))
	// 		.catch(error => console.log('error', error));
	// }

	const postAccount = async (accountAdd) => {
		// const postAccount = async () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		// var raw = JSON.stringify({
		// 	"phonenumber": "0984123456",
		// 	"password": "abc12344",
		// 	"privatekey": "key4",
		// 	"rules": "1"
		// });
		var raw = JSON.stringify(accountAdd);

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		await fetch("https://localhost:5001/api/account/add/abc1", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
	}

	const postInfo = async (infoAdd) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(infoAdd);
		// var raw = JSON.stringify({
		// 	"phonenumber": "0985123457",
		// 	"name": "Nguyen Bon",
		// 	"email": "abon@gmail.com",
		// 	"datecreated": "2022-4-08",
		// 	"dateupdated": "2022-4-10"
		// });

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		await fetch("https://localhost:5001/api/information/add/abc1", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
	}

	return (
		<>
			<div className="addPage">
				<button className="manage-apartment__exit" onClick={() => setShowAdd(false)}>x</button>
				<form action="#" className="addForm">
					<div className="add__form1">
						<label>Số điện thoại:</label> <br />
						<input className="phone" type="number" required /> <br />
						<label>Họ tên:</label> <br />
						<input className="name" type="text" required /> <br />
						<label>Mật khẩu:</label> <br />
						<input className="password" type="password" required /> <br />
						<label>Nhập lại mật khẩu:</label> <br />
						<input className="passwordAgain" type="password" required /> <br />
					</div>
					<div className="add__form1">
						<label>Quyền truy cập:</label> <br />
						<select className="access" name="role">
							<option value="1">Người dùng</option>
							<option value="2">Quản trị viên</option>
						</select> <br />
						<label>Email:</label> <br />
						<input className="email" type="email" required />
					</div>
				</form>
				<div className="add__button">
					<button type="button" class='button-cancel' onClick={() => setShowAdd(false)}>Hủy</button>
					<button type="submit" class='button-add'
						onClick={() => {
							var phone = document.querySelector('.phone').value;
							var name = document.querySelector('.name').value;
							var email = document.querySelector('.email').value;
							var password = document.querySelector('.password').value;
							var passwordAgain = document.querySelector('.passwordAgain').value;
							if (!phone) {
								alert('Vui lòng nhập đúng số điện thoại');
							}
							else if (!name) {
								alert('Vui lòng nhập tên người dùng');
							}
							else if (!password) {
								alert('Vui lòng nhập mật khẩu');
							}
							else if (password !== passwordAgain) {
								alert('Nhập lại mật khẩu không chính xác, vui lòng nhập lại');
							}
							else if (!email) {
								alert('Vui lòng nhập email');
							}
							else {
								var today = new Date();
								var newData = {
									name: name,
									phonenumber: phone,
									password: password,
									email: email,
									rules: document.querySelector('.access').value,
									datecreated: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
									dateupdated: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
								}
								var newAccount = {
									phonenumber: phone,
									password: password,
									privatekey: MakeId(10),
									rules: document.querySelector('.access').value
								}
								var newInfo = {
									phonenumber: phone,
									email: email,
									name: name,
									datecreated: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
									dateupdated: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
								}
								console.log(newData);
								console.log(newInfo);
								setAccount([...accounts, newData]);
								postAccount(newAccount);
								postInfo(newInfo);
								setShowAdd(false)
							}

						}}
					>Thêm</button>
				</div>
			</div>
		</>
	);
};

export default Add;

function MakeId(length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}
