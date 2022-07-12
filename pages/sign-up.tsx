import useMutation from "lib/client/useMutation";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CreateForm } from "types";

const CreateAccount: NextPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateForm>();
    const [create, { loading, data }] = useMutation("/api/users/create");

    const onValid = (validForm: CreateForm) => {
        if (loading) return;
        create(validForm);
        reset();
    };
    useEffect(() => {
        if (data) {
            if (data.ok) {
                router.push("/log-in");
            } else if (data.error) {
                window.confirm(data.error);
            }
        }
    }, [data, router]);
    return (
        <>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit(onValid)}>
                <div>
                    <label htmlFor="email">Email : </label>
                    <input
                        {...register("email", {
                            required: "Please write down your email.",
                        })}
                        type="email"
                    />
                    {errors.email?.message}
                </div>
                <div>
                    <label htmlFor="name">Name : </label>
                    <input
                        {...register("name", {
                            required: "Please write down your name.",
                        })}
                        type="name"
                    />
                    {errors.name?.message}
                </div>
                <input type="submit" value="Create Account"></input>
            </form>
        </>
    );
};

export default CreateAccount;
