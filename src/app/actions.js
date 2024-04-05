"use server";
const { default: excuteQuery, db } = require("@/lib/db");
import { strtotime } from "@/lib/functions";
import { message } from "antd";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const fetchCategorysMenu = async () => {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM table_product_list WHERE FIND_IN_SET('menu', status) and type = ? ORDER BY numb,id DESC",
            values: ["movies"],
        });
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log(error);
    }
};

export const fetchCategorysNB = async () => {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM table_product_list WHERE FIND_IN_SET('noibat', status) and type = ? ORDER BY numb,id DESC",
            values: ["movies"],
        });
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log(error);
    }
};

export const fetchMoviesHot = async () => {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM table_product_cat WHERE FIND_IN_SET('hot', status) and type = ? ORDER BY numb,id DESC limit 0,5",
            values: ["movies"],
        });
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log(error);
    }
};

export const fetchMoviesHay = async () => {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM table_product_cat WHERE FIND_IN_SET('hay', status) and type = ? ORDER BY numb,id DESC limit 0,12",
            values: ["movies"],
        });
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log(error);
    }
};

export const fetchMoviesVip = async () => {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM table_product_cat WHERE type = ? AND FIND_IN_SET('vip', status) ORDER BY numb,id DESC",
            values: ["movies"],
        });
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log(error);
    }
};

export const fetchMoviesByCategory = async ({ id_list, limit = "" }) => {
    try {
        const result = await excuteQuery({
            query: `SELECT * FROM table_product_cat WHERE FIND_IN_SET('hienthi', status) and type = ? and id_list = ? ORDER BY numb,id DESC ${limit}`,
            values: ["movies", id_list],
        });
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log(error);
    }
};

export const fetchMovie = async ({ id }) => {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM table_product_cat WHERE id = ?",
            values: [id],
            type: "fetch",
        });
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log(error);
    }
};

export const fetchMovieSlug = async ({ slug }) => {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM table_product_cat WHERE slugvi = ? and type = ?",
            values: [slug, "movies"],
            type: "fetch",
        });
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log(error);
    }
};

export const fetchEpisodeServer = async ({ id_parent }) => {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM table_gallery WHERE id_parent = ? and type = ? and com='product' and kind='man' and val = ? and FIND_IN_SET('hienthi', status) ORDER BY numb,id DESC",
            values: [id_parent, "movies", "server"],
        });
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log(error);
    }
};

export const fetchEpisodes = async ({ id_cat }) => {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM table_product WHERE id_cat = ? and type = ? and FIND_IN_SET('hienthi', status) ORDER BY numb,id DESC",
            values: [id_cat, "movies"],
        });
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log(error);
    }
};

export const fetchMovieEpisode = async ({ slug }) => {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM table_product WHERE slugvi = ? and type = ?",
            values: [slug, "movies"],
            type: "fetch",
        });
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log(error);
    }
};

export const fetchCategorysBySlug = async ({ slug }) => {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM table_product_list WHERE slugvi = ? and type = ?",
            values: [slug, "movies"],
            type: "fetch",
        });
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log(error);
    }
};

export const fetchUserByEmail = async (email) => {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM table_member WHERE email = ?",
            values: [email],
            type: "fetch",
        });
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log(error);
    }
};

export const fetchUserById = async (id) => {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM table_member WHERE id = ?",
            values: [id],
            type: "fetch",
        });
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log(error);
    }
};

export const fetchUserByPhone = async (phone) => {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM table_member WHERE phone = ? and FIND_IN_SET('hienthi', status)",
            values: [phone],
            type: "fetch",
        });
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log(error);
    }
};

export const createNewUser = async (data) => {
    try {
        const key = Object.keys(data).join(",");
        if (data?.password) {
            const hash = await bcrypt.hash(data.password, 10);
            data.password = hash;
        }
        const values = Object.values(data)
            .map((value) => `'${value}'`)
            .join(",");

        const results = await db
            .transaction()
            .query(`INSERT INTO table_member (${key}) VALUES(${values})`, [1])
            .rollback((e) => {
                console.log(e);
            })
            .commit();

        const insertId = results?.[0].insertId;
        if (!insertId) {
            return {
                error: true,
                message: "Đăng ký tài khoản không thành công",
            };
        }
        return {
            success: true,
            message:
                "Đăng ký tài khoản thành công.Vui lòng kiểm tra email để kích hoạt tài khoản.",
            insertId,
        };
    } catch (error) {
        console.log(error);
    }
};

export const ChangePassword = async ({
    id,
    password,
    newPassword,
    comfirmNewPassword,
}) => {
    try {
        const user = await excuteQuery({
            query: "SELECT password FROM table_member WHERE id = ?",
            values: [id],
            type: "fetch",
        });
        if (user?.password !== password) {
            return { error: true, message: "Mật khẩu cũ không chính xác" };
        }
        if (newPassword !== comfirmNewPassword) {
            return { error: true, message: "Mật khẩu mới không trùng khớp" };
        }
        await excuteQuery({
            query: `UPDATE table_member SET password = ? WHERE id = ?`,
            values: [newPassword, id],
            type: "fetch",
        });
        return { success: true, message: "Thay đổi mật khẩu thành công" };
    } catch (error) {
        console.log(error);
    }
};

export const updateVipUser = async ({ id, time }) => {
    try {
        await excuteQuery({
            query: `UPDATE table_member SET vip = ? WHERE id = ?`,
            values: [time, id],
            type: "fetch",
        });
        return { success: true, message: "Gia hạn vip thành công" };
    } catch (error) {
        console.log(error);
    }
};

export const activationUser = async ({ id }) => {
    try {
        await excuteQuery({
            query: `UPDATE table_member SET status = ? WHERE id = ?`,
            values: ["hienthi", id],
            type: "fetch",
        });
        return { success: true, message: "Kích hoạt tài khoản thành công" };
    } catch (error) {
        console.log(error);
    }
};

export const updateProfileUser = async ({ id, name, birthday, gender }) => {
    try {
        const res = await excuteQuery({
            query: `UPDATE table_member SET name = ?, birthday = ?, gender = ? WHERE id = ?`,
            values: [name, birthday, gender, id],
            type: "fetch",
        });
        if (res?.error) {
            console.log(res?.error?.sqlMessage);
            return { success: false, message: "Cập nhật thông tin thất bại" };
        }
        return { success: true, message: "Cập nhật thông tin thành công" };
    } catch (error) {
        return { success: false, message: "Cập nhật thông tin thất bại" };
    }
};

export const signJWT = (payload) => {
    const access_token = jwt.sign(
        {
            ...payload,
        },
        "access_token",
        {
            expiresIn: "1d",
        }
    );

    return access_token;
};
