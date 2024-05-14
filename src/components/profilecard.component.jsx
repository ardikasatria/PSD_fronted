import React from 'react';

const ProfileCard = ({ profile }) => {
    return (
        <div className="profile-card">
            <img src={profile.personal_info.profile_img} alt={profile.personal_info.fullname} className="profile-picture" />
            <h2 className="username">@{profile.personal_info.username}</h2>
            <h3 className="fullname">{profile.personal_info.fullname}</h3>
            <p className="bio">{profile.personal_info.bio}</p>
            <div className="social-links">
                {/* Render social links if available */}
                {profile.social_links && Object.entries(profile.social_links).map(([key, value]) => (
                    <a key={key} href={value} target="_blank" rel="noopener noreferrer" className={`social-link ${key}`}>
                        {/* Icon for the social link */}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ProfileCard;
