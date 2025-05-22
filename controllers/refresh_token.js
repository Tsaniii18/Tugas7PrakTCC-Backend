import User from "../models/user_model.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user.refresh_token) return res.sendStatus(403);
    else
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) return res.sendStatus(403);
          const userPlain = user.toJSON();
          const { password: _, refresh_token: __, ...safeUserData } = userPlain;
          const accessToken = jwt.sign(
            safeUserData,
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "30s",
            }
          );
          res.json({ accessToken });
        }
      );
  } catch (error) {
    console.log(error);
  }
};