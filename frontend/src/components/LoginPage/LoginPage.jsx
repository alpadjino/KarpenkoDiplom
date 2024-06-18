import { Box, Button, Input, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import React from "react";
import { loginRoute } from "../../utils/APIRoutes";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../slices/userSlice";
import axios from 'axios'

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

const onSubmit = async (data) => {
  await axios
    .post(loginRoute, {
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      localStorage.setItem("accessToken", res.data);
      dispatch(fetchUserData(res.data));

      navigate("/news");
    })
    .catch((err) => {
      console.log(err.response);
    });
};

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          width: "100%",
          height: "97.8vh",
          backgroundColor: "#0E1621",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "250px",
            padding: "70px",
            gap: "15px",
            backgroundColor: "#17212B",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              color: "#DAE0E6",
              textAlign: "center",
            }}
          >
            Вход
          </Typography>
          <TextField
            placeholder="Почта"
            name="email"
            type="email"
            sx={{
              backgroundColor: "#3E546A",
              borderRadius: "10px",
            }}
            {...register("email", {
              required: "Это обязательное поле",
              isEmail: "Неккоректная почта",
            })}
          />
          {errors.email && (
            <Typography
              sx={{
                color: "red",
              }}
            >
              {" "}
              {errors.email.message}{" "}
            </Typography>
          )}

          <TextField
            placeholder="Пароль"
            name="password"
            type="password"
            sx={{
              backgroundColor: "#3E546A",
              borderRadius: "10px",
            }}
            {...register("password", {
              required: "Это обязательное поле",
            })}
          />
          {errors.password && (
            <Typography
              sx={{
                color: "red",
              }}
            >
              {" "}
              {errors.password.message}{" "}
            </Typography>
          )}

          <Button
            variant="contained"
            type="submit"
            sx={{
              marginTop: "20px",
            }}
          >
            Войти
          </Button>

          <Box
            display={"flex"}
            gap={"10px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography sx={{ textAlign: "center" }} color={"#DAE0E6"}>
              Нет аккаунта?
            </Typography>
            <Link to={"/register"} cursor="pointer">
              <Typography sx={{textAlign: "right"}}>Создать аккаунт</Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </form>
  );
};
