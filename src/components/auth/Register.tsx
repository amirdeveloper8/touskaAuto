import React, { ChangeEvent, Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import classes from "./auth.module.css";

import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { BsCheckAll } from "react-icons/bs";
import { ConnectToDB } from "../../lib/connect-to-db";
import axios from "axios";
import Notification from "../ui/notification";
import Modal from "../ui/Modal";
import { Link } from "react-router-dom";

interface notificationDetails {
  status: string;
  title: string;
  message: string;
}

const Register: React.FC = () => {
  const [dataError, setdataError] = useState<string>("خطایی رخ داده است!");
  const [notification, setNotification] = useState<string>();

  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfPass, setShowConfPass] = useState<boolean>(false);

  const [emailVal, setEmailVal] = useState<string>("");
  const [passVal, setPassVal] = useState<string>("");
  const [confPassVal, setConfPassVal] = useState<string>("");

  const [successRegister, setSuccessRegister] = useState<boolean>(false);

  const emailChangeHandelr = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setEmailVal(value);
  };

  const passChangeHandelr = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setPassVal(value);
  };

  const confPassChangeHandelr = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setConfPassVal(value);
  };

  let correctPass = false;

  if (passVal === confPassVal) {
    correctPass = true;
  }

  let formValidate = false;

  if (
    emailVal?.trim().includes("@") &&
    emailVal?.trim().includes(".") &&
    passVal.trim().length > 6 &&
    correctPass
  ) {
    formValidate = true;
  }

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setNotification("pending");

    const connectDB = ConnectToDB("register/user/email");

    const fData = new FormData();

    fData.append("email", emailVal);
    fData.append("password", passVal);
    fData.append("password_confirmation", confPassVal);

    axios({
      method: "POST",
      url: connectDB,
      data: fData,
    })
      .then((res) => {
        if (res.data.status === "success") {
          setNotification(res.data.status);
          setSuccessRegister(true);

          setTimeout(() => {
            setNotification("");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log("Error", err.response);
        setNotification("error");
        setdataError(err.response.data.user);
      });
  };

  let notifDetails: notificationDetails = {
    status: "",
    title: "",
    message: "",
  };

  if (notification === "pending") {
    notifDetails = {
      status: "pending",
      title: "منتظر بمانید!",
      message: "در حال ارسال اطلاعات",
    };
  }

  if (notification === "success") {
    notifDetails = {
      status: "success",
      title: "موفق!",
      message: "اطلاعات شما با موفقیت ارسال شد!",
    };
  }

  if (notification === "error") {
    notifDetails = {
      status: "error",
      title: "خطا!",
      message: dataError,
    };
  }

  return (
    <Fragment>
      {successRegister && (
        <Modal>
          <h2>منتظر تایید مدیر سایت باشید!</h2>
          <button
            className={classes.button}
            onClick={() => setSuccessRegister(false)}
          >
            بازگشت
          </button>
        </Modal>
      )}

      <div className={classes.title}>
        <h1> ثبت نام </h1>
      </div>
      <Form className={classes.form} onSubmit={submitHandler}>
        <Form.Group className={classes.formGroup} controlId="formBasicEmail">
          <Form.Label>ایمیل</Form.Label>
          <Form.Control
            type="email"
            placeholder="ایمیل"
            value={emailVal}
            onChange={emailChangeHandelr}
          />
        </Form.Group>

        <Form.Group className={classes.formGroup} controlId="formBasicPassword">
          <Form.Label>رمز عبور</Form.Label>
          <Form.Control
            type={showPass ? `text` : `password`}
            placeholder="رمز عبور"
            value={passVal}
            onChange={passChangeHandelr}
          />
          {!showPass && (
            <AiFillEye
              className={classes.showsIconPass}
              onClick={() => setShowPass(true)}
            />
          )}
          {showPass && (
            <AiFillEyeInvisible
              className={classes.showsIconPass}
              onClick={() => setShowPass(false)}
            />
          )}
        </Form.Group>

        <Form.Group className={classes.formGroup} controlId="formBasicPassword">
          <Form.Label>تایید رمز عبور</Form.Label>
          <Form.Control
            type={showConfPass ? `text` : `password`}
            placeholder="تایید رمز عبور"
            value={confPassVal}
            onChange={confPassChangeHandelr}
          />
          {!showConfPass && (
            <AiFillEye
              className={classes.showsIconPass}
              onClick={() => setShowConfPass(true)}
            />
          )}
          {showConfPass && (
            <AiFillEyeInvisible
              className={classes.showsIconPass}
              onClick={() => setShowConfPass(false)}
            />
          )}
          {correctPass && <BsCheckAll className={classes.checkPass} />}
        </Form.Group>

        <Button disabled={!formValidate} variant="primary" type="submit">
          تایید و ارسال
        </Button>
        <Link dir="rtl" className="mt-3" to="/login">
          وارد شوید!
        </Link>
      </Form>
      {notification && (
        <Notification
          status={notifDetails.status}
          title={notifDetails.title}
          message={notifDetails.message}
        />
      )}
    </Fragment>
  );
};

export default Register;
