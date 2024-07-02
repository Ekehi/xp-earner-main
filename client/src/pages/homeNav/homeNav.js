import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home'
import TaskIcon from '@mui/icons-material/Task'
import PresaleIcon from '@mui/icons-material/Web'
import { useState } from "react"

export 
    const HomeNav = () => {
    const [value, setValue] = useState(0)
    return (
        <BottomNavigation sx={{width:'100%', position: 'absolute', bottom: 0}} value={value} onChange={(event, newValue) => { setValue(newValue)}}>
            <BottomNavigationAction label='Home' icon={<HomeIcon/>}/>
            <BottomNavigationAction label='Task' icon={<TaskIcon/>}/>
            <BottomNavigationAction label='Presale' icon={<PresaleIcon/>}/>
        </BottomNavigation>
    )
}

export default HomeNav;