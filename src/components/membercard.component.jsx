import React from "react";
import { getFullDay } from "../common/date";

const MemberCard = ({ member }) => {
    const { personal_info: { fullname, username, profile_img }, joinedAt, account_info } = member;
    const total_posts = account_info ? account_info.total_posts : 0;
    const total_reads = account_info ? account_info.total_reads : 0;

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
            <div className="flex items-center space-x-4">
                <img
                    src={profile_img}
                    alt={fullname}
                    className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                    <h1 className="text-xl font-semibold">{fullname}</h1>
                    <p className="text-gray-500">@{username}</p>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-gray-600">Joined on {joinedAt ? getFullDay(joinedAt) : ''}</p>
                <p className="text-gray-600">Total Posts: {total_posts}</p>
                <p className="text-gray-600">Total Reads: {total_reads}</p>
            </div>
        </div>
    );
};

export default MemberCard;
