import React from "react";
import Check from "./assets/Check.svg";
import Clock from "./assets/Clock.svg";
import Notes from "./assets/Notes.svg";
import "./StatsBar.css";

function StatsBar({ toApplyCount, inProgressCount, offersCount }) {
    const stats = [
        {
            id: "status-total-application",
            title: "Total Applications",
            count: toApplyCount + inProgressCount + offersCount,
        },
        {
            id: "status-in-progress",
            title: "In Progress",
            count: inProgressCount,
        },
        {
            id: "status-offers-received",
            title: "Offers Received",
            count: offersCount,
        },
    ];

    const statsColors = {
        "status-total-application": "#F2B95D",
        "status-in-progress": "#A9AEDA",
        "status-offers-received": "#A5D192",
    };

    const statsIcons = {
        "status-total-application": Notes,
        "status-in-progress": Clock,
        "status-offers-received": Check,
    };

    const statsTextColors = {
        "status-total-application": "#6D4300",
        "status-in-progress": "#040B43",
        "status-offers-received": "#1A3D0B",
    };

    return (
        <div className="stats-container">
            {stats.map((stat) => (
            <div key={stat.id} className="stat-box" style={{ backgroundColor: statsColors[stat.id] }}>
                <div className="stat-icon">
                    <img src={statsIcons[stat.id]} alt="stat icon" />
                </div>
                <div className="stat-text">
                    <span style={{ color: statsTextColors[stat.id] }}>{stat.count}</span>
                    <p style={{ color: statsTextColors[stat.id] }}>{stat.title}</p>
                </div>    
            </div>
        ))}
        </div>
    );
}

export default StatsBar
