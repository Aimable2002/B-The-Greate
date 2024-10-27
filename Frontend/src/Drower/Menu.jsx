
import React from 'react'; 
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import MovieIcon from '@mui/icons-material/Movie';

import GradeIcon from '@mui/icons-material/Grade';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Menu({ open, onClose }) {
    const list = (
        <Box
            sx={{
                width: 250,
                height: 1000,
                backgroundColor: '#000', // Change to your desired color
                color: 'white', // Change text color
            }}
            role="presentation"
            onClick={onClose} // Close on item click
            onKeyDown={onClose}
        >
            <List>
                {[    
                    { text: 'Home', icon: <HomeIcon /> },
                    { text: 'Upcoming', icon: <UpcomingIcon /> },
                    { text: 'Recent', icon: <WorkHistoryIcon /> },
                    { text: 'Watch List', icon: <MovieIcon /> },
                ].map(({ text, icon }) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon style={{ color: 'white' }}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} primaryTypographyProps={{ style: { color: 'white' } }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ backgroundColor: 'white' }} />
            <List>
                {[  
                    { text: 'Saved', icon: <GradeIcon /> },
                    { text: 'Logout', icon: <LogoutIcon /> },
                    { text: 'Delete Account', icon: <DeleteForeverIcon /> },
                ].map(({ text, icon }) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon style={{ color: 'white' }}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} primaryTypographyProps={{ style: { color: 'white' } }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
        >
            {list}
        </Drawer>
    );
}

