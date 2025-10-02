import AppBar from "./components/AppBar/AppBar.tsx";
import Home from "./features/Home/Home.tsx";
import {Routes, Route} from "react-router-dom";
import ArtistPage from "./features/ArtistPage/ArtistPage.tsx";
import Album from "./features/Album/Album.tsx";
import Login from "./features/users/Login.tsx";
import Signup from "./features/users/Signup.tsx";
import History from "./features/History/History.tsx";
import AddAlbum from "./features/Album/AddAlbum.tsx";
import AddArtist from "./features/ArtistPage/AddArtist.tsx";
import AddTrack from "./features/track/AddTrack.tsx";

const App = () => {

  return (
    <>
        <header>
            <AppBar />
        </header>
        <main className="p-2">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="artists/:id" element={<ArtistPage />} />
                <Route path="artists/add" element={<AddArtist />} />
                <Route path="album/:id" element={<Album />} />
                <Route path="album/add" element={<AddAlbum />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/track-history" element={<History />} />
                <Route path="/tracks/add" element={<AddTrack />} />
                <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
        </main>
    </>
  )
};

export default App
