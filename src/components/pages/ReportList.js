// ReportList.js
// Engineer: Pranav Acharya

import React, { useState, useEffect } from 'react';

import "./Application.css"
import ReportView from "./ReportView";
import ReportPane from "./ReportPane"

function ReportList (props) {   
    const [results, setResults] = useState({});
    const [isListView, setIsListView] = useState(true);
    const [reportData, setReportData] = useState({})
    const [removed, setRemoved] = useState(false);

    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }

    useEffect(() => {
        const url = `${server}/report/?display_all=True`
        fetch(url, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },              
        })
        .then(response => response.json()) 
        .then(data => {
            // console.log(data)
            setResults(data)
        })
        .catch((error) => console.log("Error: " + error))
    }, [server, isListView])

    function changeView(event, type, reportData) {
        setIsListView(prevIsListView => !prevIsListView);
        if (type === "product-pane") {
            setReportData(reportData);
            setRemoved(false)
        }
    };

    function banUser(){
        const userurl = `/user/?user_id=${reportData["reportedUser_id"]}`
        fetch(server+userurl, {
            method: 'DELETE',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },              
        })
        .then(response => response.json()) 
        .then(data => {
            alert(data["message"])
            setRemoved(true)
        })
        .catch((error) => console.log("Error: " + error))
    }
    
    function deleteReport(){
        const url = `${server}/report/?report_id=${reportData["report_id"]}`
        fetch(url, {
            method: 'DELETE',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },              
        })
        .then(response => response.json()) 
        .then(data => {
            alert(data["message"])
            setRemoved(true)
        })
        .catch((error) => console.log("Error: " + error))
    }

    return (
        <div className="container">
            {!isListView

            ? <div>   
                <h1> Review Application </h1>
                {<ReportView reportData={reportData} />}
                <button className="product_back_button" onClick={(e) => changeView(e, "product-view")}> Back </button>
                <button className="product_back_button" disabled={removed} onClick={() => banUser()}> Ban User </button>
                <button className="product_back_button" disabled={removed} onClick={() => deleteReport()}> Delete Report</button>
            </div>

            : <div>
                <h1> Submitted Reports </h1>

                    <div className="title">
                        Active Reports (Total: {Object.keys(results).length})
                    </div>

                    <div className="application_header">
                        <div className="application_date">
                            Report Date
                        </div>
                        <div className="application_user">
                            Report Submitted By (ID)
                        </div>
                        <div className="application_user">
                            Reported User (ID)
                        </div>
                    </div>

                        {Object.values(results).map(report => (
                            <button className="product_panel_button" onClick={(e) => changeView(e, "product-pane", {
                                userReporter_id: report["userReporter_id"],
                                reportedUser_id: report["reportedUser_id"],                               
                                reportDate: report["reportDate"],
                                reportText: report["reportText"],
                                report_id: report["report_id"]
                            })}>

                                <ReportPane 
                                    reportDate={report["reportDate"]}
                                    userReporter={report["userReporter_id"]}
                                    reportedUser={report["reportedUser_id"]} 
                                />   
                                </button> 
                        ))}                
                </div>
            }
        </div>
    );
};

export default ReportList;