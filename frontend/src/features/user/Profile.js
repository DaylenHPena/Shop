import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components";
import { useRequest } from "../../lib/useRequest";
import ApiService from "../../services/ApiService";
import { userActions } from "./userSlice";


export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { response, error, loading, refetch } = useRequest(
    ()=>ApiService.retrieveProfile()
  );

  return (
    <div>
      {loading ? (
        <Loading />
      ) : response ? (
        <>
          <h1>{response.username}</h1>
          <LogoutIcon
        onClick={() => {
          dispatch(userActions.logout());
          navigate("/login/");
        }}
      />
        </>
      ) : (
        <>Nothing found</>
      )}
    </div>
  );
}
