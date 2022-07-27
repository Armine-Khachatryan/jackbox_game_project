import React, {useState, useEffect} from "react";
import Logo from "../../assets/images/Logo.png";
import Edit from '../../assets/images/Edit.png';
import ProfilePic from '../../assets/images/ProfilePic.png';
import Camera from '../../assets/images/Camera.png';
import LogOut from '../../assets/images/LogOut.png';
import ChangePasswordModal from "../../components/ChangePasswordModal/ChangePasswordModal";
import PasswordChangedSuccessfully from '../../components/PasswordChangedSuccessfully/PasswordChangedSuccessfully';
import BigButton from "../../UI/BigButton/BigButton";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import config from "../../config";
import {useDispatch, useSelector} from "react-redux";
import classes from './MyProfile.module.css';
import useRefreshToken from "../../hooks/useRefreshToken";


function MyProfile() {
    let user = useSelector(store => store.user);
    console.log(user.image)
    let refreshToken = useRefreshToken();
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const [changePassModalIsOpen, setChangePassModalIsOpen] = useState(false);
    const [passwordChangedModalIsOpen, setPasswordChangedModalIsOpen] = useState(false);
    const [profileInfo, setProfileInfo] = useState();
    let token = localStorage.getItem("accessToken");


    useEffect(()=>{
        console.log("refresh token")
        refreshToken()
        getProfileData()
    },[])



    function openChangePasswordModal() {
        setChangePassModalIsOpen(true);
    }

    function closeChangePasswordModal() {
        setChangePassModalIsOpen(false)
    }

    function openPasswordChangedModal() {
        setPasswordChangedModalIsOpen(true);
    }


    function closePasswordChangedModal() {
        setPasswordChangedModalIsOpen(false);
    }


    const removeTokenAndGoLogin = () => {
        localStorage.removeItem("token")
        navigate('/login')
    }


    let postProfilePicture = async (image) => {

        try {
            let formData = new FormData()
            formData.append('image', image)
            let response = await axios.patch(`${config.baseUrl}auth/api/profile/edit/`, formData, {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
            console.log(response);
            console.log(response.data.image)
            setImage(response.data.image)
            dispatch({
                type: "RESPONSE_PROFILE_PIC",
                payload: response.data.image,
            })
        } catch (error) {
            console.log(error, 'createProfilePictureError');
        }
    }



    let getProfileData = async () => {
        try {
            let response = await axios.get(`${config.baseUrl}auth/api/profile/me/`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                })
            console.log(response.data, "result");
            setProfileInfo(response.data);
            console.log(profileInfo, "profileInfo")

        } catch (error) {
            console.log(error);
            console.log(error.response, 'getProfileInfoError');
        }
    }


    console.log(profileInfo, "kkjkldsjfkldjflkprofileInfo");

    return (
        <>
            {
                profileInfo ?
                    <>
                        <div className="entireDiv">
                            <div className="smallContainer">
                                <div className={"logoImgDivMyProfile"}>
                                    <img className="logoClass" src={Logo}/>
                                </div>
                                <div className={classes.profilePart}>
                                    <div className={classes.editImgDiv} onClick={() => navigate('/editProfilePage')}>
                                        <img src={Edit} className={classes.editImg}/>
                                    </div>
                                    <div className={classes.ProfileDivs}>
                                        <div className={classes.profilePic}>
                                            <label className="uploadProfilePicture"
                                                   // htmlFor={`${!user.image && "uploadProfilePicture"}`}
                                                   htmlFor={`${!profileInfo.image && "uploadProfilePicture"}`}
                                            >
                                                <div className={classes.profilePictureDiv}>
                                                    {/*{user.image ? <>*/}
                                                    {/*        <img title="abc" className={classes.uploadedProfPic}*/}
                                                    {/*             src={user.image}/>*/}
                                                    {/*    </> :*/}
                                                    {profileInfo.image ?
                                                            <img title="abc" className={classes.uploadedProfPic}
                                                                 // src={URL.createObjectURL(profileInfo.image)}/>
                                                                 src={profileInfo.image}/>
                                                        :
                                                        image?
                                                            <>
                                                                <img className={classes.uploadedProfPic} title="def"
                                                                     src={image}/>
                                                                {/*<img src={CloseProfilePic} className={classes.cameraImage}/>*/}
                                                            </> :
                                                            <>
                                                                <img src={ProfilePic} title="xyz"/>
                                                                <img src={Camera} className={classes.cameraImage}/>
                                                            </>
                                                    }
                                                </div>
                                            </label>
                                            <input className={classes.uploadPicInput} id={'uploadProfilePicture'}
                                                   type="file"
                                                   name="file"
                                                   onChange={(event) => {
                                                       postProfilePicture(event.target.files[0])
                                                   }}
                                            />
                                        </div>
                                        <div
                                            className={classes.fullName}>{profileInfo.first_name + " " + profileInfo.last_name}</div>
                                        <div className={classes.nickname}>{profileInfo.username}</div>
                                        <div className={classes.email}>{profileInfo.email}</div>
                                        <div className={classes.changePasswordDiv} onClick={openChangePasswordModal}>Change
                                            password
                                        </div>
                                        <div className={classes.logOutWholeDiv}
                                             onClick={
                                                 removeTokenAndGoLogin
                                             }
                                        >
                                            <img src={LogOut} className={classes.logOutIcon}/>
                                            <div className={classes.logOutText}>log out</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.buttonsProfileDiv}>
                                    <div className="buttonsSmallDiv">
                                        <BigButton
                                            OnClick={() => navigate('/teamCreationPageHost')}
                                        >Create New Room</BigButton>
                                    </div>
                                    <div className="buttonsSmallDiv">
                                        <BigButton>Saved Rooms</BigButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ChangePasswordModal changePassModalIsOpen={changePassModalIsOpen}
                                             closeChangePasswordModal={closeChangePasswordModal}
                                             openPasswordChangedModal={openPasswordChangedModal}/>
                        <PasswordChangedSuccessfully passwordChangedModalIsOpen={passwordChangedModalIsOpen}
                                                     closePasswordChangedModal={closePasswordChangedModal}
                                                     closeChangePasswordModal={closeChangePasswordModal}/>
                    </>
                    :
                    null
            }
        </>
    )
}


export default MyProfile;