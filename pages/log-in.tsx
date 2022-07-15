import Button from "components/Button";
import Input from "components/Input";
import useMutation from "lib/client/useMutation";
import useUser from "lib/client/useUser";
import { NextPage } from "next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { EnterForm } from "types";

const Enter: NextPage = () => {
    const { mutateUser } = useUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EnterForm>();
    const [enter, { loading, data }] = useMutation("/api/users/enter");

    const onValid = (validForm: EnterForm) => {
        if (loading) return;
        enter(validForm);
        reset();
    };

    useEffect(() => {
        if (data && data.ok) {
            mutateUser();
        }
    }, [data]);
    return (
        <div className="mt-16 px-4">
            <h3 className="text-center text-3xl font-bold">Log in to Tweet</h3>
            <div className="mt-12">
                <form
                    onSubmit={handleSubmit(onValid)}
                    className="mt-8 flex flex-col space-y-4"
                >
                    <Input
                        register={register("email", {
                            required: true,
                        })}
                        name="email"
                        label="Email address"
                        type="email"
                        required
                    />
                    <Input
                        register={register("password", {
                            required: true,
                        })}
                        name="password"
                        label="Password"
                        type="password"
                        required
                    />
                    {data?.error && <h4 className=" mt-10">{data?.error}</h4>}
                    <Button text={loading ? "Loading" : "Log in"} />
                </form>
            </div>
        </div>
    );
};

export default Enter;
