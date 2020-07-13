import React, {useState,useEffect}from 'react';
// import logo from './logo.svg';
import './App.css';
import use from './u.jpg';
import Post from './Post'
import useit from './use it.png'
import yo from './yo.jpeg'
import { db,auth } from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button,Input} from '@material-ui/core';
import ImageUpload from './ImageUpload'



function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {
  const classes = useStyles();
  const [posts,setPosts] = useState([])
  const [open,setOpen] = useState(false)
  const [modalStyle] = useState(getModalStyle);
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')
  const[user,setUser] = useState(null)
  const [openSignIn,setOpenSignIn] = useState(false)

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((authUser)=>{
    if (authUser) {
      // User has logged in
      console.log(authUser)
      setUser(authUser)

    }else{
    setUser(null)

   }

   })

   return()=>{
    //perform some cleanup actions
    unsubscribe()
   }
   
  }, [user,username])



  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot=>{

      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data()
      })));
    })

  },[])

  const signUp = (event) =>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName: username

      })
    })
    .catch((error)=>alert(error.message))

    setOpen(false)

  }

  const signIn = (event) =>{
    event.preventDefault();

    auth.signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))

      setOpenSignIn(false)

  }

  return (
    <div className="app">

    {user && user.displayName ?(
      <ImageUpload username = {user.displayName}/>
      ):(
       <h3>you need to login</h3>
      )}

    
    
     
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        >
         <div style={modalStyle} className={classes.paper}>
         <form className ="app_signup">
     <center>
     <img 
        className = "app_headerImage1"
        src = {useit}
        alt="insta_logo"
        />
        </center>

         <Input
        type = "text"
        placeholder ="Username"
        value={username}
        onChange ={(e)=>setUsername(e.target.value)}
        />

        <Input
        type = "text"
        placeholder ="Email"
        value={email}
        onChange ={(e)=>setEmail(e.target.value)}
        />

        <Input
        type = "text"
        placeholder ="Password"
        value={password}
        onChange ={(e)=>setPassword(e.target.value)}
        />
        <Button onClick={signUp}>Sign Up</Button>

    </form>
     

      </div>
      </Modal>



      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
        >
         <div style={modalStyle} className={classes.paper}>
         <form className ="app_signup">
     <center>
     <img 
        className = "app_headerImage1"
        src = {useit}
        alt="insta_logo"
        />
        </center>


        <Input
        type = "text"
        placeholder ="Email"
        value={email}
        onChange ={(e)=>setEmail(e.target.value)}
        />

        <Input
        type = "text"
        placeholder ="Password"
        value={password}
        onChange ={(e)=>setPassword(e.target.value)}
        />
        <Button onClick={signIn}>Sign In</Button>

    </form>
     

      </div>
      </Modal>


      <div className = "app_header">
 
        <img 
        className = "app_headerImage"
        src = {use}
        alt="insta_logo"
        />


    </div>
    {user ? (
      <Button onClick={() => auth.signOut()}>Logout</Button>

      ):(
      <div className = "app_loginContainer">
      <Button type="submit" onClick={() => setOpenSignIn(true)}>Sign In</Button>
      <Button type="submit" onClick={() => setOpen(true)}>Sign Up</Button>

      </div>

      )}
    
      
      {
        posts.map(({id,post}) => (
          <Post key = {id} username = {post.username} caption = {post.caption} imageUrl ={post.imageUrl} />

          ))
      }
     
      
  </div>
  );
}


export default App;
