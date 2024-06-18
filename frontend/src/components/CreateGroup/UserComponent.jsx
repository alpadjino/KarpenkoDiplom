import React, { useEffect, useState } from 'react'
import { Avatar, Box, Checkbox, Input, ListItem, Typography } from '@mui/material';
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useCreateGroupContext } from '../CreateGroupProvider/CreateGroupProvider';

export const UserComponent = ({ user }) => {
  const [isCheckAdmin, setIsCheckAdmin] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const { setSelectedUsers, setSelectedAdmins, reset, setReset } = useCreateGroupContext();

  useEffect(() => {
    if (reset) {
      setSelectedUsers([]);
      setSelectedAdmins([]);

      setIsCheckAdmin(false);
      setIsCheck(false);
      
      setReset(false);
    }

    if (isCheckAdmin && !isCheck) {
      setIsCheck(true);
      setSelectedUsers((prev) => [...prev, user._id]);
      setIsCheckAdmin(true);
    }
  }, [isCheckAdmin, isCheck, reset]);

  return (
    <ListItem>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "whitesmoke",
          borderRadius: "20px",
          width: "100%",
        }}
      >
        <Box
          id={"Check_User"}
          sx={{
            display: "flex",
            paddingLeft: "20px",
          }}
        >
          <Checkbox
            checked={isCheck}
            onChange={() => {
              if (!isCheck) {
                setSelectedUsers((prev) => [...prev, user._id]);
                setIsCheck(true);
              } else {
                setSelectedUsers((prev) =>
                  prev.filter((id) => id !== user._id)
                );
                setIsCheck(false);
              }
            }}
          
          />
          <Avatar />
        </Box>
        <Box
          id="User_Info"
          sx={{
            display: "flex",
            flexDirection: "column",
            wordBreak: "break-word",
            paddingX: "10px",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "2vh",
              fontWeight: "bold",
            }}
          >
            {user.name}
          </Typography>
          <Typography sx={{ fontSize: "2vh", fontWeight: "bold" }}>
            {user.surname}
          </Typography>
          <Typography
            sx={{
              fontSize: "2vh",
            }}
          >
            {user.email}
          </Typography>
          {/* {isCheckAdmin && (
            <Input
              placeholder="Введите роль"
              sx={{
                marginBottom: "10px",
              }}
            />
          )} */}
        </Box>
        <Box
          id={"CheckAdmin"}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            paddingRight: "20px",
          }}
        >
          <AdminPanelSettingsIcon />
          <Checkbox
          checked={isCheckAdmin}
          onChange={() => {
              if (!isCheckAdmin) {
                setSelectedAdmins((prev) => [...prev, user._id]);
                setIsCheckAdmin(true);
              } else {
                setSelectedAdmins((prev) =>
                  prev.filter((id) => id !== user._id)
                );
                setIsCheckAdmin(false);
              }
            }} />
        </Box>
      </Box>
    </ListItem>
  );
}
