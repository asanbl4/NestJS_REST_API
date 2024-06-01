import { extname } from "path";

export async function editFileName(req, file: Express.Multer.File, callback){
    const fileName = file.originalname.split('.')[0];
    const fileExt = extname(file.originalname);
    const randomSuffix = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    const newFileName = `${fileName}-${randomSuffix}${fileExt}`;
    callback(null, newFileName);
}