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
        <>
            <h2>Log in</h2>
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
                <input type="submit" value="Log in"></input>
            </form>
        </>
    );
};

export default Enter;
