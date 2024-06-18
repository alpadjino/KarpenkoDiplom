import React, { createContext, useContext, useState } from 'react'

const CreateGroupContext = createContext();

const CreateGroupProvider = ({children}) => {
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [reset, setReset] = useState(false);

  return (
    <CreateGroupContext.Provider
      value={{
        selectedUsers,
        setSelectedUsers,

        selectedAdmins,
        setSelectedAdmins,

        reset,
        setReset,
      }}
    >
      {children}
    </CreateGroupContext.Provider>
  );
}

export const useCreateGroupContext = () => useContext(CreateGroupContext);

export { CreateGroupProvider }

