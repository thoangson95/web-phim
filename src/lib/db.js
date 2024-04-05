import mysql from "serverless-mysql";
export const db = mysql({
    config: {
        host: process.env.NEXT_PUBLIC_MYSQL_HOST,
        port: process.env.NEXT_PUBLIC_MYSQL_PORT,
        database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
        user: process.env.NEXT_PUBLIC_MYSQL_USER,
        password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
    },
});

export default async function excuteQuery({
    query,
    values,
    type = "result",
    time = 10000,
}) {
    try {
        const results = await db.query({
            sql: query,
            timeout: time,
            values: values,
        });
        await db.end();
        return results?.length
            ? type === "fetch"
                ? results?.shift()
                : results
            : null;
    } catch (error) {
        return { error };
    }
}
