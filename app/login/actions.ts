"use server";

export async function handleForm(prevState:any, formdata:FormData) {
    return {
        errors:["wrong password", "password too short"],
    };
}