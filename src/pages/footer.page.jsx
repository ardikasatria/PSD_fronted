import React from 'react';
import { ThemeContext } from '../App';
import { useContext } from "react";
import {
  FiGithub,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import logoDark from "../imgs/psdDark.png";
import logoLight from "../imgs/PSDNormal.png";
import { Link } from 'react-router-dom';

const socialLinks = [
  {
    id: 1,
    icon: <FiInstagram className='text-2xl' color="#C13584"/>,
    url: "https://instagram.com/projeksainsdata",
    // Instagram color
  },
  {
    id: 2,
    icon: <FiGithub className='text-2xl' color="#333" />,
    url: "https://github.com/projeksainsdata",
    // Github color
  },
  {
    id: 3,
    icon: <FaXTwitter className='text-2xl' color="#333" />,
    url: "https://twitter.com/ProjekData",
     // Twitter color
  },
  {
    id: 4,
    icon: <FiYoutube className='text-2xl' color="#FF0000" />,
    url: "https://www.youtube.com/channel/UC2MBB6gj5SoiGZ2m72QlMag",
     // Youtube color
  },
];

const Footer = () => {
  let { theme } = useContext(ThemeContext);
  const year = new Date().getFullYear();
  return (
    <footer>
        <div className="container mt-10">
          <div className="pt-5 border-t-2 border-primary-light dark:border-secondary-dark">
            <div className="flex items-center justify-center flex-col sm:flex-row mb-5">
              <img src={theme == "light" ? logoLight : logoDark} alt="Footer Logo" className="h-12 w-auto mb-5 mr-5 sm:mb-0" />
              <ul className="flex gap-2 sm:gap-2">
                {socialLinks.map((link) => (
                  <a
                    href={link.url}
                    target="__blank"
                    key={link.id}
                    className="circle-button text-dark-400 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer rounded-lg bg-dark-50 dark:bg-ternary-dark hover:bg-gray-100 shadow-md p-4 duration-300"
                  >
                    <i className="text-xl sm:text-2xl md:text-3xl">{link.icon}</i>
                  </a>
                ))}
              </ul>
            </div>
            <div className="font-general-regular flex flex-col justify-right mb-5 items-center sm:mb-1">
              <p className="mt-5">
                {`Copyright © Projek Sains Data ${year}`}
              </p>
              <div className="flex items-center gap-2 mt-2">
                  <i className='fi fi-rr-info text-light-green' />
                  <Link className="text-light-green" to="/tentang-kami">Tentang Projek Sains Data</Link>
              </div>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
