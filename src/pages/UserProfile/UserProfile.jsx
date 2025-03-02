import { Input } from "antd";
import Header from "../../components/Header/Header";
import { useContext } from "react";
import { userContext } from "../../App";
import { Navigate } from "react-router-dom";

function UserProfile() {
    const { dataUser, tokenAuth } = useContext(userContext);
    return (
        <>
            {tokenAuth ? (
                <>
                    <Header />
                    <div className="mx-auto container px-[100px] mt-[50px] flex flex-col gap-y-[10px]">
                        <h1 className="text-[1.5rem] font-bold mb-[40px]">User Profile</h1>
                        <div className="flex flex-col gap-y-2">
                            <span>Fullname</span>
                            <Input className="w-1/2" value={dataUser.data.fullName} disabled />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <span>Username</span>
                            <Input className="w-1/2" value={dataUser.data.username} disabled />
                        </div>
                    </div>
                </>
            ) : (
                <Navigate to='/'/>
            )}
        </>
    )
}
export default UserProfile;