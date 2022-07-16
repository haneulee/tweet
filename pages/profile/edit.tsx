import type { NextPage } from "next";
import Button from "components/Button";
import Input from "components/Input";
import Layout from "components/Layout";
import useUser from "lib/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useMutation from "lib/client/useMutation";
import { EditProfileResponse } from "types";
import Image from "next/image";
import UserImg from "public/user.svg";

interface EditProfileForm {
    email?: string;
    password?: string;
    name?: string;
    formErrors?: string;
}

const EditProfile: NextPage = () => {
    const { user } = useUser();
    const {
        register,
        setValue,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<EditProfileForm>();
    const [editProfile, { data, loading }] =
        useMutation<EditProfileResponse>(`/api/users/me`);
    const onValid = async ({ email, password, name }: EditProfileForm) => {
        if (loading) return;
        if (!email || !password || !name) {
            return setError("formErrors", {
                message: "Your profile is not valid. try again!",
            });
        }

        editProfile({
            email,
            password,
            name,
        });
    };
    useEffect(() => {
        if (user?.name) setValue("name", user.name);
        if (user?.email) setValue("email", user.email);
        if (user?.password) setValue("password", user.password);
    }, [user, setValue]);
    useEffect(() => {
        if (data && !data.ok && data.error) {
            setError("formErrors", { message: data.error });
        }
    }, [data, setError]);
    return (
        <Layout title="Edit Profile" canGoBack>
            <form
                onSubmit={handleSubmit(onValid)}
                className="space-y-4 py-10 px-4"
            >
                <div className="flex space-x-3 justify-center">
                    <div className="h-36 w-36 justify-center flex">
                        <Image src={UserImg} width={"100%"} />
                    </div>
                </div>
                <Input
                    register={register("name")}
                    required={false}
                    label="Name"
                    name="name"
                    type="text"
                />
                <Input
                    register={register("email")}
                    required={false}
                    label="Email address"
                    name="email"
                    type="email"
                />
                <Input
                    register={register("password")}
                    required={false}
                    label="Password number"
                    name="password"
                    type="text"
                />
                {errors.formErrors ? (
                    <span className="my-2 block text-center font-medium text-red-500">
                        {errors.formErrors.message}
                    </span>
                ) : null}
                <Button text={loading ? "Loading..." : "Update profile"} />
            </form>
        </Layout>
    );
};

export default EditProfile;
