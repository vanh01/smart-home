import React from "react";

const Modify = () => {
    return (
        <>
			<div className="modifyPage">
				<form action="#" className="modifyForm">
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
					<input type="button" value="Quản lý căn hộ" class='button-manage'/>
					<input type="submit" value="Lưu" class='button-save'/>
					<input type="button" value="Xóa" class='button-delete'/>
				</form>
			</div>
        </>
    );
};

export default Modify;
