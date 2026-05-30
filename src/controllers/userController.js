import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(createHttpError(400, 'No file'));
    }

    const result = await saveFileToCloudinary(req.file.buffer);

    const user = req.user;
    user.avatar = result.secure_url;
    await user.save();

    res.status(200).json({ url: user.avatar });
  } catch (error) {
    next(error);
  }
};
