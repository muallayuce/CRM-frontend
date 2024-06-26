import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Box, Drawer, IconButton, List, ListItem, ListItemIcon, Popover, Toolbar, Tooltip, Typography } from '@mui/material';
import { FaAddressBook, FaBars, FaBriefcase, FaBuilding, FaChartLine, FaCog, FaDiceD6, FaHandshake, FaIndustry, FaSignOutAlt, FaTachometerAlt, FaUserFriends, FaUsers, FaUser, FaUserEdit, } from "react-icons/fa";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import OrganizationModal from '../pages/organization/OrganizationModal';
import Company from '../pages/company/Company';
import AddCompany from '../pages/company/AddCompany';
import CompanyDetails from '../pages/company/CompanyDetails';
import EditCompany from '../pages/company/EditCompany';
import Leads from '../pages/leads/Leads';
import AddContacts from '../pages/contacts/AddContacts';
import { EditLead } from '../pages/leads/EditLead';
import LeadDetails from '../pages/leads/LeadDetails';
import Contacts from '../pages/contacts/Contacts';
import EditContact from '../pages/contacts/EditContacts';
import ContactDetails from '../pages/contacts/ContactDetails';
import Users from '../pages/users/Users';
import Opportunities from '../pages/opportunities/Opportunities';
import Cases from '../pages/cases/Cases';
import { AddLeads } from '../pages/leads/AddLeads';
import Accounts from '../pages/accounts/Accounts';
import { AddAccount } from '../pages/accounts/AddAccount';
import { EditAccount } from '../pages/accounts/EditAccount';
import { AccountDetails } from '../pages/accounts/AccountDetails';
import { AddUsers } from '../pages/users/AddUsers';
import { EditUser } from '../pages/users/EditUser';
import UserDetails from '../pages/users/UserDetails';
import { UserProfile } from '../pages/users/UserProfile';
import EditUserProfile from '../pages/users/EditUserProfile';
import { AddOpportunity } from '../pages/opportunities/AddOpportunity';
import { EditOpportunity } from '../pages/opportunities/EditOpportunity';
import { OpportunityDetails } from '../pages/opportunities/OpportunityDetails';
import { AddCase } from '../pages/cases/AddCase';
import { EditCase } from '../pages/cases/EditCase';
import { CaseDetails } from '../pages/cases/CaseDetails';
import logo from '../assets/images/auth/logo.png';
import { StyledListItemButton, StyledListItemText } from '../styles/CssStyled';
import MyContext from '../context/Context';
import Deals from '../pages/deals/Deals'
import Admin from '../pages/admin/Admin';
//import {EditProfile} from '../pages/profile/EditProfile';


// declare global {
//     interface Window {
//         drawer: any;
//     }
// }


export default function Sidebar(props: any) {
    const navigate = useNavigate()
    const location = useLocation()
    const [screen, setScreen] = useState('contacts')
    const [drawerWidth, setDrawerWidth] = useState(60)
    const [headerWidth, setHeaderWidth] = useState(drawerWidth)
    const [userDetail, setUserDetail] = useState('')
    const [organizationModal, setOrganizationModal] = useState(false)
    const organizationModalClose = () => { setOrganizationModal(false) }



    useEffect(() => {
        toggleScreen();
    }, [navigate]);


    // useEffect(() => {
    // navigate('/leads')
    // if (localStorage.getItem('Token') && localStorage.getItem('org')) {
    //     // setScreen('contacts')
    //     navigate('/contacts')
    // }
    // if (!localStorage.getItem('Token')) {
    //     navigate('/login')
    // }
    // if (!localStorage.getItem('org')) {
    //     navigate('/organization')
    // }
    // toggleScreen()
    // }, [])


    const toggleScreen = () => {
        const path = location.pathname.split('/')[2];
        setScreen(path || 'contacts');
    };

    const navList = ['deals', 'dashboard', 'contacts', 'accounts', 'companies', 'cases'];
    {/* Admin items list shown only if role stored in selected organization is ADMIN */ }
    const adminNavList = ['admin', 'users'];

    const navIcons = (text: any, screen: any): React.ReactNode => {
        const iconStyle = { fontSize: '30px' };
        switch (text) {
            case 'deals':
                return <FaHandshake style={screen === 'deals' ? { ...iconStyle, fill: '#3e79f7' } : iconStyle} />
            case 'dashboard':
                return <FaChartLine style={screen === 'dashboard' ? { ...iconStyle, fill: '#3e79f7' } : iconStyle} />
            case 'contacts':
                return <FaAddressBook style={screen === 'contacts' ? { ...iconStyle, fill: '#3e79f7' } : iconStyle} />
            case 'accounts':
                return <FaBuilding style={screen === 'accounts' ? { ...iconStyle, fill: '#3e79f7' } : iconStyle} />
            case 'companies':
                return <FaIndustry style={screen === 'companies' ? { ...iconStyle, fill: '#3e79f7' } : iconStyle} />
            case 'cases':
                return <FaBriefcase style={screen === 'cases' ? { ...iconStyle, fill: '#3e79f7' } : iconStyle} />
            case 'users':
                return <FaUserFriends style={screen === 'users' ? { ...iconStyle, fill: '#3e79f7' } : iconStyle} />
            case 'admin':
                return <FaUserEdit style={screen === 'admin' ? { ...iconStyle, fill: '#3e79f7' } : iconStyle} />
            default:
                return <FaDiceD6 style={{ ...iconStyle, fill: '#3e79f7' }} />
        }
    }
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    /**
     * Clears the browser's local storage, session storage, and cookies.
     * This function is used to remove all cached data and user-specific information
     * from the browser, typically when the user logs out or the application needs
     * to reset the user's session.
     */
    const clearCache = () => {
        // Clear local storage
        localStorage.clear();

        // Clear session storage
        sessionStorage.clear();

        // Clear cookies
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
    };

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <>
            <Box>
                <AppBar position="fixed" sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    height: '60px',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    boxShadow: '1px'
                }}>
                    <Box>
                        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
                            {drawerWidth === 60}
                            <IconButton sx={{ ml: '-10px' }} onClick={() => setDrawerWidth(drawerWidth === 60 ? 200 : 60)}>
                                <FaBars style={{ height: '20px' }} />
                            </IconButton>
                            <img src={logo} alt="App Logo" width={'40px'} style={{ marginLeft: '10px', marginRight: '0px' }} />
                            <Typography sx={{ fontWeight: 'bold', color: 'black', ml: '20px', textTransform: 'capitalize', fontSize: '20px', mt: '5px' }}>
                                LeadOpp CRM {drawerWidth == 60 && ` - ${screen}`}
                            </Typography>
                        </Toolbar>
                    </Box>
                    <Box style={{
                        marginRight: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <IconButton onClick={handleClick} sx={{ mr: 3 }}>
                            <Avatar sx={{ height: '27px', width: '27px' }} />
                        </IconButton>
                        <Popover
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                        >
                            <List disablePadding>
                                <ListItem disablePadding>
                                    <StyledListItemButton onClick={() => {
                                        clearCache();
                                        navigate('/login')
                                    }}>
                                        <ListItemIcon > <FaSignOutAlt fill='#3e79f7' /></ListItemIcon>
                                        <StyledListItemText primary={'Sign out'} sx={{ ml: '-20px', color: '#3e79f7' }} />
                                    </StyledListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <StyledListItemButton onClick={() => setOrganizationModal(!organizationModal)}>
                                        <ListItemIcon > <FaIndustry fill='#3e79f7' /></ListItemIcon>
                                        <StyledListItemText primary={'Organization'} sx={{ ml: '-20px', color: '#3e79f7' }} />
                                    </StyledListItemButton>
                                </ListItem>

                                <ListItem disablePadding>

                                    <StyledListItemButton onClick={() => {
                                        setAnchorEl(null);
                                        navigate('/app/profile');

                                    }}>
                                        <ListItemIcon > <FaUser fill='#3e79f7' /></ListItemIcon>
                                        <StyledListItemText primary={'My Profile'} sx={{ ml: '-20px', color: '#3e79f7' }} />
                                    </StyledListItemButton>
                                </ListItem>
                            </List>
                        </Popover>
                    </Box>
                </AppBar>

                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
                    }}
                >
                    <Box>
                        <List sx={{ pt: '65px' }}>
                            {navList.map((text) => (
                                <ListItem key={text} disablePadding>
                                    <Tooltip title={drawerWidth === 60 ? capitalizeFirstLetter(text) : ''} placement="right" arrow>
                                        <StyledListItemButton
                                            sx={{
                                                justifyContent: 'center',
                                                pt: drawerWidth === 60 ? '12px' : '12px',
                                                pb: drawerWidth === 60 ? '12px' : '12px'
                                            }}
                                            onClick={() => {
                                                navigate(`/app/${text}`)
                                                setScreen(text)
                                            }}
                                            selected={screen === text}
                                        >
                                            <ListItemIcon sx={{
                                                justifyContent: 'center',
                                                minWidth: 0
                                            }}>
                                                {navIcons(text, screen)}
                                            </ListItemIcon>
                                            {drawerWidth > 60 && (
                                                <StyledListItemText primary={text} sx={{ ml: 2, textTransform: 'capitalize' }} />
                                            )}
                                        </StyledListItemButton>
                                    </Tooltip>
                                </ListItem>
                            ))}

                            {/* Admin items list shown only if role stored in selected organization is ADMIN */}
                            {localStorage.role === 'ADMIN' && adminNavList.map((text) => (
                                <ListItem key={text} disablePadding>
                                    <Tooltip title={drawerWidth === 60 ? capitalizeFirstLetter(text) : ''} placement="right" arrow>
                                        <StyledListItemButton
                                            sx={{
                                                justifyContent: 'center',
                                                pt: drawerWidth === 60 ? '12px' : '12px',
                                                pb: drawerWidth === 60 ? '12px' : '12px'
                                            }}
                                            onClick={() => {
                                                navigate(`/app/${text}`)
                                                setScreen(text)
                                            }}
                                            selected={screen === text}
                                        >
                                            <ListItemIcon sx={{
                                                justifyContent: 'center',
                                                minWidth: 0
                                            }}>
                                                {navIcons(text, screen)}
                                            </ListItemIcon>
                                            {drawerWidth > 60 && (
                                                <StyledListItemText primary={text} sx={{ ml: 2, textTransform: 'capitalize' }} />
                                            )}
                                        </StyledListItemButton>
                                    </Tooltip>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
                <MyContext.Provider value={{ drawerWidth: drawerWidth, screen: screen }}>
                    <Box sx={{ width: 'auto', ml: drawerWidth === 60 ? '60px' : '200px', overflowX: 'hidden' }}>
                        <Routes>
                            <Route index element={<Deals />} />
                            <Route path='/app/deals' element={<Deals />} />
                            <Route path='/app/leads' element={<Leads />} />
                            <Route path='/app/leads/add-leads' element={<AddLeads />} />
                            <Route path='/app/leads/edit-lead' element={<EditLead />} />
                            <Route path='/app/leads/lead-details' element={<LeadDetails />} />
                            <Route path='/app/opportunities' element={<Opportunities />} />
                            <Route path='/app/opportunities/add-opportunity' element={<AddOpportunity />} />
                            <Route path='/app/opportunities/opportunity-details' element={<OpportunityDetails />} />
                            <Route path='/app/opportunities/edit-opportunity' element={<EditOpportunity />} />
                            <Route path='/app/companies' element={<Company />} />
                            <Route path='/app/companies/add-company' element={<AddCompany />} />
                            <Route path='/app/companies/edit-company' element={<EditCompany />} />
                            <Route path='/app/companies/company-details' element={<CompanyDetails />} />
                            <Route path='/app/contacts' element={<Contacts />} />
                            <Route path='/app/contacts/add-contacts' element={<AddContacts />} />
                            <Route path='/app/contacts/contact-details' element={<ContactDetails />} />
                            <Route path='/app/contacts/edit-contact' element={<EditContact />} />
                            <Route path='/app/accounts' element={<Accounts />} />
                            <Route path='/app/accounts/add-account' element={<AddAccount />} />
                            <Route path='/app/accounts/account-details' element={<AccountDetails />} />
                            <Route path='/app/accounts/edit-account' element={<EditAccount />} />
                            <Route path='/app/cases' element={<Cases />} />
                            <Route path='/app/cases/add-case' element={<AddCase />} />
                            <Route path='/app/cases/edit-case' element={<EditCase />} />
                            <Route path='/app/cases/case-details' element={<CaseDetails />} />
                            <Route path='/app/admin' element={<Admin />} />
                            <Route path='/app/users' element={<Users />} />
                            <Route path='/app/users/add-users' element={<AddUsers />} />
                            <Route path='/app/users/edit-user' element={<EditUser />} />
                            <Route path='/app/users/user-details' element={<UserDetails />} />
                            <Route path='/app/profile' element={<UserProfile />} />
                            <Route path="/app/profile/edit/:id" element={<EditUserProfile onUpdate={console.log}/>} />

                        </Routes>
                    </Box>
                </MyContext.Provider>
                <OrganizationModal open={organizationModal} handleClose={() => setOrganizationModal(false)} />
            </Box>
        </>
    );
}
