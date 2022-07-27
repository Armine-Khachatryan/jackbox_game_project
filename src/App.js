import './App.css';
import TeamPage from "./app/pages/TeamPage/TeamPage";
import TeamCreationPage from "./app/pages/TeamCreationPage/TeamCreationPage";
import VerifyEmail from "./app/pages/VerifyEmail/VerifyEmail";
import ChoosingCharacterPage from "./app/pages/ChoosingCharacterPage/ChoosingCharacterPage";
import MyProfile from "./app/pages/MyProfile/MyProfile";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import React, {useState} from "react";
import Registration from "./app/pages/Registration/Registration";
import Login from "./app/pages/Login/Login";
import GatheringParticipantsPage from "./app/pages/GatheringParticipantsPage/GatheringParticipantsPage";
import GameStartingPage from "./app/pages/GameStartingPage/GameStartingPage";
import GameStarting from "./app/pages/GameStarting/GameStarting";
import RangeSlider from "./app/components/RangeSlider/RangeSlider";
import QuestionPage from "./app/pages/QuestionPage/QuestionPage";
import ResetPasswordMessagePage from "./app/pages/ResetPasswordMessagePage/ResetPasswordMessagePage";
import ResetPasswordPage from "./app/pages/ResetPasswordPage/ResetPasswordPage";
import EditProfilePage from "./app/pages/EditProfilePage/EditProfilePage";
import TeamPageHost from "./app/pages/TeamPageHost/TeamPageHost";
import TeamCreationPageHost from "./app/pages/TeamCreationPageHost/TeamCreationPageHost";
import ChoosingCharacterPageHost from "./app/pages/ChoosingCharacterPageHost/ChoosingCharacterPageHost";





function App() {

    let [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken" || ""));

  return (
          <BrowserRouter>
              <Routes>
                  <Route exact path="/" element={<Login setAccessToken={setAccessToken}/>}/>
                  <Route exact path="/login" element={<Login setAccessToken={setAccessToken} />}/>
                  <Route exact path="/registration" element={<Registration/>}/>
                  <Route exact path="/verifyEmail" element={<VerifyEmail/>}/>
                  {accessToken ?
                      <>
                          <Route exact path="/myProfile" element={<MyProfile/>}/>
                          <Route exact path="/teamPage" element={<TeamPage/>}/>
                          <Route exact path="/teamPageHost" element={<TeamPageHost/>}/>
                          <Route exact path="/teamCreationPage" element={<TeamCreationPage/>}/>
                          <Route exact path="/teamCreationPageHost" element={<TeamCreationPageHost/>}/>
                          <Route exact path="/choosingCharacterPage" element={<ChoosingCharacterPage/>}/>
                          <Route exact path="/choosingCharacterPageHost" element={<ChoosingCharacterPageHost/>}/>
                          <Route exact path="/gameStartingPage" element={<GameStartingPage/>}/>
                          <Route exact path="/gameStarting" element={<GameStarting/>}/>
                          <Route exact path="/gatheringParticipantsPage" element={<GatheringParticipantsPage/>}/>
                          <Route exact path='/rangeslider' element={<RangeSlider/>}/>
                          <Route exact path='/questionPage' element={<QuestionPage/>}/>
                          <Route exact path='/resetPasswordMessagePage' element={<ResetPasswordMessagePage/>}/>
                          <Route exact path='/resetPasswordPage' element={<ResetPasswordPage/>}/>
                          <Route exact path='/editProfilePage' element={<EditProfilePage/>}/>
                      </>
                  :
                      <Route exact path="/login" element={<Login/>}/>
                  }
              </Routes>
          </BrowserRouter>
  );
}

export default App;
