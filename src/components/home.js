import '../App.css';
import { Button } from '@mui/material';
import { Link} from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function Home() {

  return (
    <div>
      <header className="App-header" >
        <h1 style={{fontSize:70,textTransform:'uppercase'}}>Library System</h1>
        <div style={{display:'flex', flexDirection:'row'}}>
            <Link to="/students" style={{margin:30,textDecoration:'none'}}>
                <Button variant="outlined" style={{padding:18,color:'white',fontSize:20,width:300,backgroundColor:'rgba(220,8,8,0.65)', borderColor:'white',borderWidth:2}} startIcon={<PeopleIcon/>} >
                    Students List
                </Button>
            </Link>
            <Link to="/books" style={{margin:30, textDecoration:'none'}}>
                <Button variant="outlined" style={{padding:18, color:'white',fontSize:20,width:300,backgroundColor:'rgba(220,8,8,0.65)', borderColor:'white',borderWidth:2}} startIcon={<MenuBookIcon/>} >
                    Books List
                </Button>
            </Link>
        </div>
      </header>
    </div>
  );
}

