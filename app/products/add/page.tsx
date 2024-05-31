"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { uploadProduct } from "./actions";
import { useFormState } from "react-dom";

export default function AddProduct() {
    const [preview, setPreview] = useState("");
    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { files },

        } = event;
        if (!files) {
            return;
        }
        const file = files[0];

        // 이미지인지 확인
        if (!file.type.includes("image")) {
            return { error: "이미지 파일만 업로드 할수 있습니다." };
        }

        // 4MB이상 초과시 validtaion 처리를 할 예정
        if ((file.size / 1024) * 1024 > 4) {
            return { error: "크기가 4MB를 초과하는 이미지는 업로드 할수 없습니다." };
        }

        const url = URL.createObjectURL(file);
        setPreview(url);
    };
    const [state, action] = useFormState(uploadProduct, null);
    return (
        <div>
            <form action={action} className="p-5 flex flex-col gap-5">
                <label
                    htmlFor="photo"
                    className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
                    style={{
                        backgroundImage: `url(${preview})`,
                    }}
                >
                    {preview === "" ? (
                        <>
                            <PhotoIcon className="w-20" />
                            <div className="text-neutral-400 text-sm">
                                사진을 추가해주세요.
                                {state?.fieldErrors.photo}
                            </div>
                        </>
                    ) : null}
                </label>
                <input
                    onChange={onImageChange}
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    className="hidden"
                />
                <Input
                    name="title"
                    required
                    placeholder="제목"
                    type="text"
                    errors={state?.fieldErrors.title}
                />
                <Input
                    name="price"
                    type="number"
                    required
                    placeholder="가격"
                    errors={state?.fieldErrors.price}
                />
                <Input
                    name="description"
                    type="text"
                    required
                    placeholder="자세한 설명"
                    errors={state?.fieldErrors.description}
                />
                <Button text="작성 완료" />
            </form>
        </div>
    );
}