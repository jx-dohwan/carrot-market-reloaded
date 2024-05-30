import db from "@/lib/db";
import getAccessToken from "@/lib/github/getAccessToken";
import { getUserEmail } from "@/lib/github/getUserEmail";
import { getUserProfile } from "@/lib/github/getUserProfile";
import { LogIn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const code = req.nextUrl.searchParams.get("code");
    if (!code) return new Response(null, { status: 400 });
    const { error, access_token } = await getAccessToken(code);
    if (error) {
        return new Response(null, { status: 400 });
    }
    const { id, login, avatar_url } = await getUserProfile(access_token);
    const email = await getUserEmail(access_token);
    const user = await db.user.findFirst({
        where: {
            OR: [{ email: email ?? "" }, { github_id: id + "" }],
        },
        select: {
            id: true,
        },
    });
    if (user) {
        await LogIn(user.id);
    } else {
        const dbUser = await db.user.findUnique({
            where: {
                username: login,
            },
            select: {
                id: true,
            },
        });
        let username = login;
        if (dbUser) {
            username += id;
        }
        const newUser = await db.user.create({
            data: {
                username,
                email,
                github_id: id + "",
                avatar: avatar_url,
            },
            select: {
                id: true,
            },
        });
        await LogIn(newUser.id);
    }
    return redirect("/profile");
};