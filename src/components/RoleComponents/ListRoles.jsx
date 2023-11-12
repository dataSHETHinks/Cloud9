import React, { useState, useEffect } from "react";
import api from "../../apiConfig";
import "../../css/RolesComponentsCss/ListRolesCss.css"

const ListRoles = () => {
    const [allRoles, setAllRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await api("GET", "/user/get_user_roles/", {});
                setAllRoles(response.data || []);
            } catch (error) {
                console.error("GET Request Error:", error);
            }
        };

        fetchRoles();
    }, []); // Fetch data on component mount

    const renderTableHeader = () => {
        if (allRoles.length === 0) {
            return null;
        }

        const keys = Object.keys(allRoles[0]).filter((key) => key !== "id");

        return (
            <thead>
                <tr>
                    <th>#</th>
                    {keys.map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
            </thead>
        );
    };

    const renderTableBody = () => {
        if (allRoles.length === 0) {
            return (
                <h2>No roles added</h2>
            );
        }

        return (
            <tbody>
                {allRoles.map((role, index) => (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        {Object.entries(role)
                            .filter(([key]) => key !== "id") // Exclude "id"
                            .map(([key, value], innerIndex) => (
                                <td key={innerIndex}>{value.toString()}</td>
                            ))}
                    </tr>
                ))}
            </tbody>
        );
    };

    return (
        <div className="list-roles-table-responsive">
            <table className="list-roles-table table-bordered table-striped">
                {renderTableHeader()}
                {renderTableBody()}
            </table>
        </div>
    );
};

export default ListRoles;
