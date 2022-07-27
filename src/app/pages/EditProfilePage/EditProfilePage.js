import React, {useEffect, useState} from "react";
import Logo from "../../assets/images/Logo.png";
import CloseIconInProfile from "../../assets/images/CloseIconInProfile.png";
import ProfilePic from "../../assets/images/ProfilePic.png";
import Camera from "../../assets/images/Camera.png";
import classes from './EditProfilePage.module.css';
import Input from "../../UI/Inputs/Input";
import {useDispatch} from "react-redux";
import useInput from "../../hooks/useInput";
import useValidate from "../../hooks/useValidate";
import PurpleBigButton from "../../UI/PurpleBigButton/PurpleBigButton";
import {useNavigate} from "react-router-dom";
import CloseProfilePic from "../../assets/images/CloseProfilePic.png";
import useRefreshToken from "../../hooks/useRefreshToken";
import axios from "axios";
import config from "../../config";



function EditProfilePage (){
    const {isName}=useValidate()
    let refreshToken = useRefreshToken();
    const navigate =useNavigate();
    const dispatch =useDispatch()
    const [image, setImage] = useState(null);
    const [editProfileInfo, setEditProfileInfo] = useState();

    console.log(editProfileInfo, "editProfileInfo")
    // console.log(editProfileInfo.image,"setEditProfileInfo.image")
    let token = localStorage.getItem("accessToken");

    let getEditProfileData = async () => {
        try {
            let response = await axios.get(`${config.baseUrl}auth/api/profile/me/`,
                {
                    headers: {
                        authorization: `Bearer ${token}`, //check
                    }
                })
            console.log(response.data, "result");
            setEditProfileInfo(response.data);
            console.log(editProfileInfo, "editProfileInfo")``

        } catch (error) {
            console.log(error);
            console.log(error.response, 'getProfileInfoError');
        }
    }


    useEffect(()=>{
        console.log("refresh token")
        refreshToken();
        getEditProfileData()
    },[])



    const {
        value: first_name,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        isTouched:firstNameIsTouched,
        // reset: resetFirstName,
    } = useInput(isName);

    const {
        value: last_name,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        isTouched:lastNameIsTouched,
        // reset: resetLastName,
    } = useInput(isName);


    let formIsValid = false;
    if (firstNameIsValid ||
        lastNameIsValid ||
        image || image===null||undefined || editProfileInfo.image
    ) {
        formIsValid = true;
    }


    const submitHandler = async event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        await postEditProfileData();
    }


    const values= {
        first_name: !firstNameIsTouched && editProfileInfo? editProfileInfo.first_name : first_name,
        last_name:!lastNameIsTouched && editProfileInfo ? editProfileInfo.last_name : last_name,
    }

    const removeProfileImage =()=>{
        setEditProfileInfo({...editProfileInfo,image:''})
        setImage(null)
        dispatch({
            type: "REMOVE_PROFILE_IMAGE",
            payload: null
        })
    }

    let postEditProfileData = async () => {
        try {
            let formData = new FormData()
            // if (typeof image == "string"){
            //     formData = {
            //         first_name: values.first_name,
            //         last_name :  values.last_name,
            //     }
            //     console.log('first issue')
            // }
            if(image===null && editProfileInfo.image){
                formData = {
                    first_name: values.first_name,
                    last_name :  values.last_name,
                }
                console.log('first issue')
            }
            else if (image ===null || image===undefined){
                formData = {
                    image : null,
                    first_name: values.first_name,
                    last_name :  values.last_name
                }
                    console.log('second issue')
            }
            else
            {
                formData.append('image', image)
                formData.append('first_name', values.first_name)
                formData.append('last_name', values.last_name)
            }
            console.log('third issue')

            let response = await axios.patch(`${config.baseUrl}auth/api/profile/edit/`, formData,{
                headers: {
                    authorization:`Bearer ${token}`,
                }
            })
            console.log(response.data);
            console.log(response.data.image);
            dispatch ({
                type: "RESPONSE_EDIT_PROFILE_DATA",
                payload: response.data
            })
            navigate('/myProfile');
        } catch (error) {
            console.log(error, 'postEditProfileDataError');
        }
    }

    console.log(editProfileInfo);
    return(
        <>
            {
                editProfileInfo?
                    <div className="entireDiv">
                        <div className="smallContainer">
                            <div className={"logoImgDivMyProfile"}>
                                <img className="logoClass" src={Logo}/>
                            </div>
                            <div className={classes.EditProfileWholeDiv}>
                                <div className={classes.closeImgDiv}  >
                                    <img src={CloseIconInProfile} className={classes.closeImg}  onClick={()=>navigate('/myProfile')}/>
                                </div>
                                <div className={classes.editProfileDivs}>
                                    <div className={classes.editProfileNextDiv}>
                                        <label className="uploadProfilePicture"
                                               htmlFor={"uploadProfilePicture"}
                                            // htmlFor={`${!editProfileInfo.image && "uploadProfilePicture"}`}
                                        >
                                            <div className={classes.editProfilePictureDiv}>
                                                {
                                                    editProfileInfo.image ?  <>
                                                            <img className={classes.uploadedProfPic}  src={editProfileInfo.image} />
                                                            <img src={CloseProfilePic} className={classes.cameraImage}
                                                                 onClick={removeProfileImage}
                                                            />
                                                        </>:
                                                        image ?  <>
                                                                <img className={classes.uploadedProfPic} title='sndjsb'
                                                                    // src={image}
                                                                     src={URL.createObjectURL(image)}
                                                                />
                                                                <img src={CloseProfilePic} className={classes.cameraImage}/>
                                                            </>:
                                                            <>
                                                                <img src={ProfilePic}  title='profilePicture'  />
                                                                <img src={Camera} className={classes.cameraImage}/>
                                                            </>
                                                }
                                            </div>
                                        </label>
                                        <input className={classes.uploadPicInput}
                                            // id={`${!editProfileInfo.image && "uploadProfilePicture"}`}
                                               id={"uploadProfilePicture"}
                                               type="file"
                                               name="file"
                                               onChange={(event) => {
                                                   setImage(event.target.files[0])
                                               }}
                                        />
                                    </div>
                                    <form onSubmit={submitHandler}>
                                        <Input
                                            hasError = {firstNameHasError}
                                            errorText="Please enter first name."
                                            input={{
                                                value:editProfileInfo && !firstNameIsTouched  ? editProfileInfo.first_name : first_name,
                                                placeholder: "First name",
                                                type: "text",
                                                onChange: firstNameChangeHandler,
                                                onBlur:firstNameBlurHandler
                                            }}
                                        />
                                        <Input
                                            hasError = {lastNameHasError}
                                            errorText="Please enter last name."
                                            input={{
                                                value:editProfileInfo && !lastNameIsTouched  ? editProfileInfo.last_name : last_name,
                                                placeholder: "Last name",
                                                type: "text",
                                                onChange: lastNameChangeHandler,
                                                onBlur: lastNameBlurHandler
                                            }}
                                        />

                                        <Input
                                            // hasError = {nicknameHasError}
                                            // errorText="Please enter a Nickname."
                                            input={{
                                                value: editProfileInfo.username,
                                                placeholder: editProfileInfo.username,
                                                // Object.keys(user).length !== 0? user.username : editProfileInfo.username,
                                                type: "text",
                                                disabled:true
                                                // onChange: nicknameChangeHandler,
                                                // onBlur: nicknameBlurHandler
                                            }}
                                        />
                                        <Input
                                            // hasError = {emailHasError}
                                            // errorText={emailMessage}
                                            input={{
                                                value: editProfileInfo.email,
                                                placeholder: editProfileInfo.email,
                                                type: "email",
                                                // onChange: emailChangeHandler,
                                                // onBlur: emailBlurHandler,
                                                disabled:true
                                            }}
                                        />
                                        <PurpleBigButton disabled={!formIsValid} type={"submit"}>Save changes</PurpleBigButton>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </>


    )
}


export default EditProfilePage;