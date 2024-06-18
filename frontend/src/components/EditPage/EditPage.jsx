import React, { useEffect, useState } from 'react'
import { Header } from '../Header/Header';
import { Avatar, Box, Button, Input, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Sidebar } from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { editUserData } from '../../utils/APIRoutes';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const EditPage = () => {
    const [isMobile, setIsMobile] = useState(false);
    
    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues
    } = useForm();

    const isLogin = useSelector((state) => state.user.userData._id);
    const user = useSelector((state) => state.user.userData);
    
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState(user.surname);

    const navigate = useNavigate()
    
  useEffect(() => {
    if (!isLogin) {
      navigate("/news");
    }
    document.title = "Редактировать профиль";
  }, []);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [isMobile]);

    const onSubmit = async (data) => {
        console.log(data)
        await axios
          .post(editUserData, {
            userId: user._id,
            name: data.name,
            surname: data.surname,
            email: data.email,
            password: data.password,
          })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
    }

    const handleEmail = ({ target: { value } }) => {
      setEmail(value);
    };
  return (
    <Box
      sx={{
        height: "91vh",
      }}
    >
      {isLogin && (
        <>
          <Header />
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              backgroundColor: "#0E1621",
            }}
          >
            {!isMobile && <Sidebar />}
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                id="edit-profile-container"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  id="edit-profile-photo"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop: "20px",
                  }}
                >
                  <Avatar />
                  <Button>
                    <Typography color={"white"}>Изменить фотографию</Typography>
                  </Button>
                </Box>

                <Box
                  id="edit-profile-inputs"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "15px",
                    marginTop: "20px",
                  }}
                >
                  <Input
                    name="name"
                    placeholder="Имя"
                    defaultValue={user.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disableUnderline={true}
                    sx={{
                      borderRadius: "30px",
                      backgroundColor: "white",
                      paddingX: "20px",
                    }}
                    {...register("name", {
                      required: "Это обязательное поле",
                    })}
                  />
                  {errors.name && (
                    <Typography color={"red"}>{errors.name.message}</Typography>
                  )}
                  <Input
                    name="surname"
                    placeholder="Фамилия"
                    value={surname}
                    defaultValue={user.surname}
                    onChange={(e) => setSurname(e.target.value)}
                    disableUnderline={true}
                    sx={{
                      borderRadius: "30px",
                      backgroundColor: "white",
                      paddingX: "20px",
                    }}
                    {...register("surname", {
                      required: "Это обязательное поле",
                    })}
                  />
                  {errors.surname && (
                    <Typography color={"red"}>
                      {errors.surname.message}
                    </Typography>
                  )}

                  <Input
                    autoComplete="false"
                    name="email"
                    type="email"
                    value={email}
                    defaultValue={user.email}
                    onChange={handleEmail}
                    placeholder="Почта"
                    disableUnderline={true}
                    sx={{
                      borderRadius: "30px",
                      backgroundColor: "white",
                      paddingX: "20px",
                    }}
                    {...register("email", {
                      required: "Это обязательное поле",
                    })}
                  />
                  {errors.email && (
                    <Typography color={"red"}>
                      {errors.email.message}
                    </Typography>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "15px",
                      marginTop: "20px",
                    }}
                  >
                    <Input
                      name="password"
                      type="password"
                      placeholder="Пароль"
                      disableUnderline={true}
                      sx={{
                        borderRadius: "30px",
                        backgroundColor: "white",
                        paddingX: "20px",
                      }}
                      {...register("password", {
                        required: "Это обязательное поле",
                      })}
                    />
                    {errors.password && (
                      <Typography color={"red"}>
                        {errors.password.message}
                      </Typography>
                    )}
                    <Input
                      name="confirmPassword"
                      type="password"
                      placeholder="Подтвердите пароль"
                      disableUnderline={true}
                      sx={{
                        borderRadius: "30px",
                        backgroundColor: "white",
                        paddingX: "20px",
                      }}
                      {...register("confirmPassword", {
                        required: "Это обязательное поле",
                        validate: (value) =>
                          value === getValues("password") ||
                          "Пароли не совпадают",
                      })}
                    />
                    {errors.confirmPassword && (
                      <Typography color={"red"}>
                        {errors.confirmPassword.message}
                      </Typography>
                    )}
                  </Box>
                  <Button
                    type="submit"
                    sx={{
                      color: "white",
                      backgroundColor: "blue",
                      marginTop: "20px",
                      maxWidth: "300px",
                    }}
                  >
                    Подтвердить
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </>
      )}
    </Box>
  );
}
