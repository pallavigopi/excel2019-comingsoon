import React, {Component} from 'react'
import styles from './style.module.css';
import excelLogo from './excellogo.png';
import mecLogo from './Meclogo.png';
import excelLegacy from './excellegacy.png';

export default class Header extends Component {
    
    render() {
        return(
                <div className={styles["header"]}>

                    <div className={styles["header-left"]}>
                        <a href="http://mec.ac.in" target="_blank"><img className={styles["logomec"]} src={mecLogo}/></a>
                        <div className = {styles["mec"]}>Govt. Model Engineering College, Kochi</div>
                    </div>


                    <div className={styles["header-center"]}>
                        <div className={styles["header-title"]}>
                        <a href="https://excelmec.org" target="_blank"><img className={styles["logoexcel"]} src={excelLogo}/></a>
                            <div className = {styles["excel"]}>EXCEL 2019</div>
                        </div>
                    </div>

                    <div className={styles["header-right"]}>
                        <div className = {styles["excel-legacy"]}>Excel Legacy</div>
                        <a href="" target="_blank"><img className={styles["logolegacy"]} src={excelLegacy}/></a>
                    </div>
                </div>

        );
    }
}