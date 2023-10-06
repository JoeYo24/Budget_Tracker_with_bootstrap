import React from "react";
import "./help.scss";
import Sidebar from "../myDiary/sidebar";
import "../myDiary/sidebar.scss";

const Help = () => {
    return (
        <div className="helpPage">
            <div className="sidebarContainer"> 
                <Sidebar />
            </div>
            <div className="helpContainer">
                <h1>Getting Started</h1>
                <p>Start by adding some transactions to your diary. You can do this by clicking on the <a href="/transaction">'Add Transaction'</a> button on the <a href="/my-diary">'My Diary'</a> page.</p>
                <p>Once you have added some transactions, you can view your diary by clicking on the <a href="/my-diary">'My Diary'</a> button on the sidebar.</p>
                <p>From the <a href="/my-diary">'My Diary'</a> page, you can view your transactions, edit them, or delete them.</p>
                <p>On the <a href="/my-diary">'My Diary'</a> page, you can also view your monthly salary, and the amount you have to spend on needs, and wants, as well as the minimum amount of savings you should have.</p>
                <p>On the <a href="/goals">'Goals'</a> page, you can add goals, and view your goals.</p>
                <p>For goals, you must add a goal first before savings transactions so the goal can be calculated correctly.</p>
                <p>On the <a href="/compare">'Compare'</a> page, you can compare your savings between the current month and last month, and also search for transactions by date.</p>
            </div>
        </div>
    )
}

export default Help;