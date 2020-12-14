// AddProductReport.js
// Engineer: Pranav Acharya

import React, {useState} from "react";

function AddProductReport(props) {
    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }

    const [newInfo, setNewInfo] = useState({
        ...props.postData,
        report_info: ""
    })

    function handleChange(evt) { 
        const name = evt.target.name 
        const value = evt.target.value 

	  setNewInfo({
        ...newInfo,
        [name]: value
      })
    }

    function submitReport(event) {
        event.preventDefault();

        let url = `${server}/report/?`

        url += `&userReporter_id=${(JSON.parse(sessionStorage.getItem("user")).user_id)}`
        //url += `&reportedUser_id=${props.productData.vendor_id}`
        url += `&reportedUser_id=${props.productData.vendor_id}`

        /*requiredParams.forEach((param, index) => {
            if (newInfo[param] === "") {
                newInfo[param] = props.postData[param]
            }
            url += `&${param}=${newInfo[param]}`
        });*/

        console.log(url)

        fetch(url, 
            {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }, 
                body: newInfo["report_info"],          
            })
            .then(response => response.json()) 
                .then(data => {
                if(data["message"] === "Report created successfully!" || data["message"] === "Report submitted successfully!"){
                    alert("Report created successfully!")
                    props.cancelReport()
                }
                else{
                    alert(`Error creating report: ${data["message"]}`)
                }
            })
            .catch((error) => console.log("Report creation error: " + error))

    }

    return (
        <div className="update-form">
            <h1> Add Report </h1>
            <form onSubmit={submitReport}>
                <div className="form_input">
                    <label className="form_label" for="report_info"> Report: </label>         
                    <textarea className="form_field" type="text" value={newInfo.report_info} name="report_info" onChange={handleChange} />
                </div>
                
                <input className="form_submit" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default AddProductReport;