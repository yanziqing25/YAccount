function getUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, C => {
		let r = Math.random() * 16 | 0,
			v = C == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

function getExt(filePath) {
	//获取最后一个.的位置
	const index = filePath.lastIndexOf('.');
	//获取后缀
	const ext = filePath.substr(index + 1);
	return ext;
}

/**
 * 获取上传到云端的文件名
 */
function getCloudPath(fileName) {
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const day = today.getDate();
	return 'bills/' + year + '/' + month + '/' + day + '/' + getUUID() + '.' + getExt(fileName);
}

async function deleteBill(_id, icon, iconType) {
	return await wx.cloud.callFunction({
		name: 'deleteBill',
		data: {
			_id,
			icon,
			iconType
		}
	});
}

export {
	getUUID,
	getExt,
	getCloudPath,
	deleteBill
}
