import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems:'center'
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    
  //   content: {
  //     flexGrow: 1,
  //     padding: theme.spacing(3),
  //     transition: theme.transitions.create('margin', {
  //       easing: theme.transitions.easing.sharp,
  //       duration: theme.transitions.duration.leavingScreen,
  //     }),
  //     marginLeft: -drawerWidth,
  //   },
  //   contentShift: {
  //     transition: theme.transitions.create('margin', {
  //       easing: theme.transitions.easing.easeOut,
  //       duration: theme.transitions.duration.enteringScreen,
  //     }),
  //     marginLeft: 0,
  //   },
  // 
  }
  )
  );
export default function Header(){
    const classes = useStyles();
    return (
    <div className={classes.root}>
    <AppBar
    position="fixed"
    >
        <div style={{margin:"auto"}}>
            <Toolbar >
                <div>
                <Typography variant="h6" noWrap >
                Invoice Generator
                </Typography>
                </div>
            </Toolbar>
        </div>
    </AppBar>
    </div>
    )
}