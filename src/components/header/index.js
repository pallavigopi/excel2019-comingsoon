import React, {Component} from 'react'
import styles from './style.module.css';


export default class Header extends Component {
    
    render() {
        return(
                <div className={styles["header"]}>

                    <div className={styles["header-left"]}>
                        <div className = {styles["mec-logo"]}></div>
                        <div className = {styles["mec"]}>Govt. Model Engineering College, Kochi</div>
                    </div>


                    <div className={styles["header-center"]}>
                        <div className={styles["header-title"]}>
                            <div className = {styles["excel-logo"]}></div>
                            <div className = {styles["excel"]}><b>EXCEL 2019</b></div>
                        </div>
                    </div>

                    <div className={styles["header-right"]}>
                        <div className = {styles["excel-legacy"]}>Excel Legacy</div>
                        <div className = {styles["legacy-logo"]}></div>
                    </div>
                </div>

        );
    }
}