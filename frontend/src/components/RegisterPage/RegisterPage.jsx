import { Alert, Box, Button, Snackbar, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { registerRoute } from "../../utils/APIRoutes"
import { useState } from 'react'
import axios from 'axios'

export const RegisterPage = () => {
  const [open, setOpen] = useState(false);

  const handleAlert = () => {
    setOpen(!open);
  }

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await axios
      .post(registerRoute, {
        email: data.email,
        name: data.name,
        surname: data.surname,
        password: data.password,
      })
      .then((res) => {console.log(res.data)})
      .catch((err) => console.log(err));
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
            fontWeight={"bold"}
            fontSize={"25px"}
            color={"#DAE0E6"}
            textAlign={"center"}
          >
            Регистрация
          </Typography>
          {errors.surname && (
            <Typography
              sx={{
                color: "red",
              }}
            >
              {errors.surname.message}
            </Typography>
          )}
          <Box display={"flex"} gap={"10px"}>
            <TextField
              placeholder="Фамилия"
              name="surname"
              type="text"
              error={errors.surname ? true : false}
              onChange={(event) => handleChange(event)}
              sx={{
                borderRadius: "10px",
                backgroundColor: "#3E546A",
              }}
              {...register("surname", {
                required: "Это обязательное поле",
              })}
            />
            <TextField
              placeholder="Имя"
              name="name"
              type="text"
              error={errors.name ? true : false}
              onChange={(event) => handleChange(event)}
              sx={{
                borderRadius: "10px",
                backgroundColor: "#3E546A",
              }}
              {...register("name", {
                required: "Это обязательное поле",
                minLength: 3,
              })}
            />
          </Box>

            {errors.name && (
              <Typography
                sx={{
                  color: "red",
                  textAlign: "right"
                }}
              >
                {errors.name.message}
              </Typography>
            )}

          <TextField
            placeholder="Почта"
            name="email"
            type="email"
            error={errors.email ? true : false}
            autoComplete="false"
            onChange={(event) => handleChange(event)}
            sx={{
              backgroundColor: "#3E546A",
              borderRadius: "10px",
              outline: "none",
            }}
            {...register("email", {
              required: "Это обязательное поле",
              isEmail: "Неккоректная почта",
            })}
          />
          <Typography
            sx={{
              color: "red",
            }}
          >
            {errors.email && "Это обязательное поле"}
          </Typography>
          <TextField
            placeholder="Пароль"
            name="password"
            type="password"
            error={errors.password ? true : false}
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
              {errors.password.message}
            </Typography>
          )}

          <TextField
            error={errors.confirmPassword ? true : false}
            placeholder="Подтвердите пароль"
            name="confirmPassword"
            type="password"
            sx={{
              backgroundColor: "#3E546A",
              borderRadius: "10px",
            }}
            {...register("confirmPassword", {
              required: "Это обязательное поле",
              validate: (value) =>
                value === getValues("password") || "Пароли не совпадают",
            })}
          />
          {errors.confirmPassword && (
            <Typography
              sx={{
                color: "red",
              }}
            >
              {errors.confirmPassword.message}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "20px",
            }}
          >
            Зарегистрироваться
          </Button>

          <Box
            display={"flex"}
            gap={"30px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography color={"#DAE0E6"}>Есть аккаунт?</Typography>
            <Link
              to={"/login"}
              sx={{
                cursor: "pointer",
              }}
            >
              Войти
            </Link>
          </Box>
        </Box>
      </Box>
    </form>
  );
}
