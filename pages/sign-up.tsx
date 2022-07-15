import Button from "components/Button";
import Input from "components/Input";
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
        <div className="mt-16 px-4">
            <h3 className="text-center text-3xl font-bold">Create Account</h3>
            <div className="mt-12">
                <form
                    onSubmit={handleSubmit(onValid)}
                    className="mt-8 flex flex-col space-y-4"
                >
                    <Input
                        register={register("email", {
                            required: "Please write down your email.",
                        })}
                        name="email"
                        label="Email address"
                        type="email"
                        required
                    />
                    <Input
                        register={register("name", {
                            required: "Please write down your name.",
                        })}
                        name="name"
                        label="name"
                        type="text"
                        required
                    />
                    <Input
                        register={register("password", {
                            required: "Please write down your password.",
                        })}
                        name="password"
                        label="Password"
                        type="password"
                        required
                    />
                    <Button text={"Create Account"} />
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;
