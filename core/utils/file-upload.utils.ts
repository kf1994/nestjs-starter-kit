import { HttpException, HttpStatus } from "@nestjs/common";

export const imageFileFilter = (req, file, callback) => {
	if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|webp|png|gif)$/)) {
		return callback(new HttpException("Only image files are allowed!", HttpStatus.BAD_REQUEST), false);
	}
	callback(null, true);
};

export const editFileName = (req, file, callback) => {
	const name = file.originalname.split(".")[0];
	const fileExtName = ".png";
	const date = new Date().toLocaleString().replace(/[ ,\/\\:]/g, "-");

	callback(null, `${name}-${date}${fileExtName}`);
};
