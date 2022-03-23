import React from "react";

const Add = ({ setShowAdd, accounts, setAccount }) => {
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
							<option value="Người dùng">Người dùng</option>
							<option value="Quản trị viên">Quản trị viên</option>
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
							if (!phone){
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
							else if (!email){
								alert('Vui lòng nhập email');
							}
							else {
								var today = new Date();
								var newData = {
									name: document.querySelector('.name').value,
									phone: document.querySelector('.phone').value,
									password: password,
									email: document.querySelector('.email').value,
									access: document.querySelector('.access').value,
									createDate: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
									updateDate: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
								}
								console.log(newData);
								setAccount([...accounts, newData]);
							}

						}}
					>Thêm</button>
				</div>
			</div>
		</>
	);
};

export default Add;
