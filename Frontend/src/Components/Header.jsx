import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '../Drower/Menu';

export default function ButtonAppBar() {
    const [invisible, setInvisible] = React.useState(false);

    const handleBadgeVisibility = () => {
        setInvisible(!invisible);
      };

      const [menuOpen, setMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

  return (
    <div className='w-full flex flex-row justify-between'>
        <div className=' flex justify-between w-full items-center'>
        <div className='flex flex-row gap-1'>
            <h1 style={{color: 'red'}}>B</h1>
            <h1 style={{color: 'red'}}>Agasobanuye</h1>
        </div>
        <div className='flex justify-between gap-6'>
            <i><SearchIcon /></i>
            <i>
            <Badge color="secondary" variant="dot" invisible={invisible}>
                <NotificationsIcon checked={!invisible} onChange={handleBadgeVisibility}/>
            </Badge>
                {/* <FormControlLabel
                sx={{ color: 'text.primary' }}
                control={<Switch  />}
                label="Show Badge"
                /> */}
            </i>
            <i><PersonIcon /></i>
            <i onClick={toggleMenu}><MenuIcon /></i>
        </div>
        </div>
        <Menu open={menuOpen} onClose={toggleMenu} />
    </div>
  );
}
