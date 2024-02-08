import React from 'react';
import Card from './Card';
import classes from './Card.module.css';
import Me from './Assets/WIN_20191008_05_41_08_Pro.jpg';
function Homepage({title, message, Anchor} ){
return(
    <div className="centered-content">
    <h1>{title}</h1>
    <p> {message}</p>
    <p> {Anchor}</p>
    <Card className={classes.card}>
    <img src={Me} alt='Me'></img>
   </Card>
    </div>
)

}




export  default Homepage;