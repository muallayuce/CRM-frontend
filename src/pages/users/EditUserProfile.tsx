import { SERVER, ProfileUrl } from '../../services/ApiUrls';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, FormControl, FormGroup, InputLabel, Input, Typography, Select, MenuItem, Stack, Card } from '@mui/material';
import { COUNTRIES } from '../../components/Data';
import { FiChevronUp } from '@react-icons/all-files/fi/FiChevronUp';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';
import { CustomToolbar } from '../../styles/CssStyled';

interface EditUserProfileProps {
    onUpdate: () => void;
}

const EditUserProfile: React.FC<EditUserProfileProps> = ({ onUpdate }) => {
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        job_title: '',
        address_line: '',
        street: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
        mobile_number: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [countrySelectOpen, setCountrySelectOpen] = useState(false);
    const handleChange = (e: any) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: e.target.files?.[0] || null });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('Token');
            const org = localStorage.getItem('org');

            if (!token || !org) {
                setError('Missing token or organization ID in localStorage');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${SERVER}${ProfileUrl}/`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'org': org,
                        'Authorization': token,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error fetching profile: ${response.statusText}`);
                }

                const data = await response.json();

                setFormData({
                    email: data.user_obj.user_details.email,
                    first_name: data.user_obj.user_details.first_name,
                    last_name: data.user_obj.user_details.last_name,
                    job_title: data.user_obj.user_details.job_title,
                    address_line: data.user_obj.address.address_line,
                    street: data.user_obj.address.street,
                    city: data.user_obj.address.city,
                    state: data.user_obj.address.state,
                    postcode: data.user_obj.address.postcode,
                    country: data.user_obj.address.country,
                    mobile_number: data.user_obj.phone,
                });
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }

        };

        fetchUserProfile();
    }, [id]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('Token');
        const org = localStorage.getItem('org');

        if (!token || !org) {
            setError('Missing token or organization ID in localStorage');
            return;
        }

        try {
            const response = await fetch(`${SERVER}${ProfileUrl}/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Error updating profile: ${response.statusText}`);
            }

            onUpdate();
        } catch (error: any) {
            setError(error.message);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ mt: '60px' }}>
            <CustomToolbar sx={{ flexDirection: 'row-reverse' }}>
                <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Button
                        variant='contained'
                        className={'add-button'}
                        component={Link}
                        to={`/app/profile/`}
                    >
                        Back
                    </Button>
                </Stack>
            </CustomToolbar>

            <Box sx={{ mt: '10px', p: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box sx={{ width: '100%' }}></Box>
                <Card sx={{ borderRadius: '7px' }}>
                    <Box sx={{ p: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography style={{ fontWeight: 600, fontSize: '18px', color: '#1a3353f0' }}>Edit profile</Typography>
                    </Box>
                    <Box sx={{ p: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <form onSubmit={handleFormSubmit}>
                        <FormGroup>
                            <FormControl>
                                <InputLabel>First Name</InputLabel>
                                <Input
                                    value={formData.first_name}
                                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Last Name</InputLabel>
                                <Input
                                    value={formData.last_name}
                                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Job Title</InputLabel>
                                <Input
                                    value={formData.job_title}
                                    onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Email</InputLabel>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Mobile Number</InputLabel>
                                <Input
                                    value={formData.mobile_number}
                                    onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Adress Line</InputLabel>
                                <Input
                                    value={formData.address_line}
                                    onChange={(e) => setFormData({ ...formData, address_line: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Street</InputLabel>
                                <Input
                                    value={formData.street}
                                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel>City</InputLabel>
                                <Input
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel>State</InputLabel>
                                <Input
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Postcode</InputLabel>
                                <Input
                                    value={formData.postcode}
                                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel>City</InputLabel>
                                <Input
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />
                            </FormControl>
                            <FormControl sx={{ width: '70%' }}>
                                <Select
                                    name="country"
                                    value={formData.country}
                                    open={countrySelectOpen}
                                    onClick={() => setCountrySelectOpen(!countrySelectOpen)}
                                    IconComponent={() => (
                                        <div
                                            onClick={() =>
                                                setCountrySelectOpen(!countrySelectOpen)
                                            }
                                            className="select-icon-background"
                                        >
                                            {countrySelectOpen ? (
                                                <FiChevronUp className="select-icon" />
                                            ) : (
                                                <FiChevronDown className="select-icon" />
                                            )}
                                        </div>
                                    )}
                                    className={'select'}
                                    onChange={handleChange}
                                >

                                    {COUNTRIES.map((option) => (
                                        <MenuItem
                                            key={option.code}
                                            value={option.code}
                                        >
                                            {option.name}

                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button type="submit" variant="contained" color="primary">
                                Save Changes
                            </Button>
                        </FormGroup>
                    </form>
                    </Box>
                    </Card>
            </Box>
        </Box >
    );
};

export default EditUserProfile;
