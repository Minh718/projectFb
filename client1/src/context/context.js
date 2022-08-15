import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [isOpenReq, setIsOpenReq] = useState(false);
  const addGiveRequests = (userId) => {
    setUser({
      ...user,
      giveRequests: [...user.giveRequests, userId],
    });
  };
  const cancelReqAdd = (userId) => {
    setUser({
      ...user,
      getRequests: user.getRequests.filter(
        (getRequest) => getRequest !== userId
      ),
    });
  };
  const comfirmAddFriend = (userId) => {
    setUser({
      ...user,
      friends: [...user.friends, userId],
      getRequests: user.getRequests.filter(
        (getRequest) => getRequest !== userId
      ),
    });
  };
  const cancelGiveRequests = (userId) => {
    setUser({
      ...user,
      giveRequests: user.giveRequests.filter(
        (giveRequest) => giveRequest !== userId
      ),
    });
  };
  const deleteFriend = (userId) => {
    setUser({
      ...user,
      friends: user.friends.filter((friend) => friend !== userId),
    });
  };
  const updataAvatar = (namefile) => {
    setUser({ ...user, profilePicture: namefile });
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        addGiveRequests,
        cancelGiveRequests,
        isOpenReq,
        setIsOpenReq,
        comfirmAddFriend,
        cancelReqAdd,
        deleteFriend,
        updataAvatar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
