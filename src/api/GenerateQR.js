import { saveAs } from 'file-saver';

const QrCodeUser = async id => {
	try {
		const res = await fetch(
			`https://quickchart.io/qr?text=${process.env.REACT_APP_API_URL}reviw/${id}&size=195&margin=1`
		);
		if (!res.ok) {
			throw new Error(`${res.status} | ${res.statusText}`);
		}
		return res;
	} catch (error) {
		console.error(error);
	}
};
export const handleOpenQR = async id => {
	const qr_user = await QrCodeUser(id);
	window.open(qr_user.url, '_blank');
};
export const handleDownloadQR = async data => {
	const qr_user = await QrCodeUser(data.id);
	const blob = await qr_user.blob();
	saveAs(blob, `${data.lastName}_${data.firstName}.png`);
};
