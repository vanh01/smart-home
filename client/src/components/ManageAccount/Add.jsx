import React from "react";

const Add = () => {
    return (
        <>
			<div className="addPage">
				<form action="#" className="addForm">
					<div className="col1">
						<label>Số điện thoại:</label> <br />
						<input type="number" /> <br />
						<label>Họ tên:</label> <br />
						<input type="text" /> <br />
						<label>Mật khẩu:</label> <br />
						<input type="password" /> <br />
						<label>Nhập lại mật khẩu:</label> <br />
						<input type="password" /> <br />
					</div>
					
					<div className="col2">
						<label>Quyền truy cập:</label> <br />
						<select name="role">
							<option value="user">Người dùng</option>
							<option value="admin">Admin</option>
						</select> <br />
						<label>Email:</label> <br />
						<input type="email" />
					</div>
					<div className="clear"></div> <br />
					<input type="submit" value="Thêm" class='button-add'/>
					<input type="button" value="Hủy" class='button-cancel'/>
				</form>
			</div>
        </>
    );
};

export default Add;
