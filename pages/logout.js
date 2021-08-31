import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation ($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        email
        role {
          name
          description
          type
        }
      }
    }
  }
`;

const Logout = () => {
  const { register, handleSubmit } = useForm();
  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION);

  const onSubmit = async (d) => {
    console.log('d',d);
    try {
      const result = await login({
        variables: {
          identifier: d.identifier,
          password: d.password,
        },
      });
      console.log("result", result);
    } catch (e) {
      console.log("e", e);
    }
  };

  const errors = [];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("identifier")} placeholder="Email" />
        <input {...register("password")} placeholder="password" type='password' />
        <input type="submit" />
      </form>
      <pre>{JSON.stringify(data,null,2)}</pre>
      <pre>error {JSON.stringify(error,null,2)}</pre>
    </>
  );
};

export default Logout;
