import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'


export const SidebarData = [
    {
        title: 'Overview',
        path: '/overview',
        icon: <AiIcons.AiFillHome/>,
        alwaysVisible: true
    },
    {
        title: 'Requests',
        path: '',
        icon: <IoIcons.IoIosPaper/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        alwaysVisible: true,
        subNav: [
            {
                title: 'See all requests',
                path: '/request/all',
                icon: <FaIcons.FaPenSquare/>,
                visibility: "ROLE_HR",
                alwaysVisible: false
            },
            {
                title: 'Create Request',
                path: '/request/create',
                icon: <FaIcons.FaPenSquare/>,
                alwaysVisible: true
            },
            {
                title: 'See your requests',
                path: '/request/user/all',
                icon: <IoIcons.IoIosPaper/>,
                alwaysVisible: true
            },
        ]
    },
    {
        title: 'Timesheet',
        path: '',
        icon: <IoIcons.IoIosPaper/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        alwaysVisible: true,
        subNav: [
            {
                title: 'See timesheet data',
                path: '/timesheet/data',
                icon: <FaIcons.FaPenSquare/>,
                visibility: "ROLE_HR",
                alwaysVisible: false
            },
            {
                title: 'Fill timesheet data',
                path: '/timesheet/user',
                icon: <FaIcons.FaPenSquare/>,
                alwaysVisible: true
            },
        ]
    },
    {
        title: 'Recommend',
        path: '',
        icon: <FaIcons.FaUser/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        alwaysVisible: true,
        subNav: [
            {
                title: 'See all recommendations',
                path: '/recommendations/all',
                icon: <FaIcons.FaUsers/>,
                visibility: 'ROLE_HR'
            },
            {
                title: 'Recommend someone',
                path: '/recommendations/add',
                icon: <FaIcons.FaUsers/>,
                alwaysVisible: true
            },
            {
                title: 'See your recommendations',
                path: '/recommendations/user',
                icon: <FaIcons.FaUser/>,
                alwaysVisible: true
            }
        ]
    },
    {
        title: 'ADMIN',
        path: '',
        icon: <FaIcons.FaUserShield/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        alwaysVisible: false,
        visibility: "ROLE_ADMIN",
        subNav: [
            {
                title: 'Register new user',
                path: '/admin/add-account',
                icon: <FaIcons.FaUserPlus/>,

                visibility: "ROLE_ADMIN"
            },
            {
                title: 'See all users',
                path: '/admin/users-all',
                icon: <FaIcons.FaUsersCog/>,
                visibility: "ROLE_ADMIN"
            },
        ]
    }
]
