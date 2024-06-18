import React from 'react'
import { Box, Input } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";

export const SearchInput = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        width: "80%",
      }}
    >
      <Input
        placeholder="Поиск"
        disableUnderline={true}
        sx={{
          borderRadius: "20px",
          backgroundColor: "gray",
          textAlign: "center",
          paddingLeft: "20px",
          color: "white",
          width: "100%",
        }}
      >
        aaa
      </Input>
      <SearchIcon
        sx={{
          position: "absolute",
          cursor: "pointer",
          padding: "10px",
          color: "white",
        }}
      />
    </Box>
  );
}
