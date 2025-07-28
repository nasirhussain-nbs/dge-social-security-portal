import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert, Slide } from "@mui/material";
import { removeNotification } from "../../store/slices/uiSlice";

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};

const NotificationSystem = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.ui);

  const handleClose = (notificationId) => {
    dispatch(removeNotification(notificationId));
  };

  return (
    <>
      {notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={6000}
          onClose={() => handleClose(notification.id)}
          TransitionComponent={SlideTransition}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          sx={{
            bottom: { xs: 16, sm: 24 + index * 70 },
          }}
        >
          <Alert
            onClose={() => handleClose(notification.id)}
            severity={notification.type}
            variant="filled"
            sx={{
              borderRadius: 2,
              fontWeight: 500,
              minWidth: 300,
            }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default NotificationSystem;
