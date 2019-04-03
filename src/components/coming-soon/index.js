import React, {Component} from 'react'
import styles from './style.module.css';


export default class ComingSoon extends Component {
    
    render() {
        
            var deadline = new Date("Jan 4, 2020 15:37:25").getTime(); 
            var x = setInterval(function() { 
                var now = new Date().getTime(); 
                var t = deadline - now; 
                var days = Math.floor(t / (1000 * 60 * 60 * 24)); 
                var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
                var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
                var seconds = Math.floor((t % (1000 * 60)) / 1000); 
                document.getElementById("timer").innerHTML = days + " : "  
                + hours + " : " + minutes + " : " + seconds; 
                    if (t < 0) { 
                        clearInterval(x); 
                        document.getElementById("timer").innerHTML = "EXPIRED"; 
                    } 
            }, 1000); 
        return(
            <div className={styles["coming-soon"]}>
                <div className = {styles["gear-gif"]}></div>
                <div className = {styles["countdown"]}>
                    <div className = {styles["comingSoon"]}>COMING SOON</div>
                    <div id="timer" className={styles["timer"]}></div>
                </div>
              
            </div>
        );
    }
}