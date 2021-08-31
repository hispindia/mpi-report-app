import React, { useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Button, } from "@material-ui/core";
import { getAuthenticatedUser } from "../../utils";
import { getImageAPI } from "../../services";
import { addAvatar } from "../../actions/avatarActions";
import { makeStyles } from '@material-ui/core/styles'

import styles from "./styles";

const useStyles = makeStyles(styles);

function UserAvatar(props) {
  const classes = useStyles();
  const avatar = useSelector((state) => state.avatar.avatar);
  const dispatch = useDispatch();

  useEffect(() => {
    getImageAPI(`/personimage/${getAuthenticatedUser().person.uuid}`)
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        dispatch(addAvatar(url));
      })
      .catch((e) => {
        dispatch(addAvatar(null));
      });
  }, []);
  return (
    <div className={clsx(classes.root, classes.flexRow)}>
      
      <div className={classes.flexColumn}>        

        <div className={classes.flexRow}>
          <Button color="primary" size="small" onClick={props.handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserAvatar;
