import React, {Component} from 'react'
import styles from './style.module.css';


export default class ExcelAbout extends Component {
    
    render() {
        return(
                <div className={styles["excel-details"]}>
                        <p className={styles["about-text"]}>The country's second oldest tech-fest.  A place for students to display their technical talent. The country's best gather and compete among themselves to prove their skill not only industrial knowledge but their talent as well rounded engineers. </p>
                </div>
        );
    }
}