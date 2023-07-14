
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Slide_hearder from './components/slide_header';
import Footer from './components/footer';
import Posts from './components/posts';
import PostManager from './components/PostManager';
import Create from './components/Create';
import EditPost from './components/EditPost';

function App() {
  return (
    <div className='container-fluid' >
      <BrowserRouter>
      {/* <Header/> */}
      {/* <Slide_hearder/> */}
      <Routes>
        <Route path='/posts' element={<Posts/>}/>
        <Route path='/postmanager' element={<PostManager/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit/:code' element={<EditPost/>}/>
      </Routes>
      {/* <Footer/> */}
      </BrowserRouter>

    </div>
  );
}

export default App;
