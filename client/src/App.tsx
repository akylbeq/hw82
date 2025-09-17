import AppBar from "./components/AppBar/AppBar.tsx";
import Home from "./features/Home/Home.tsx";
import {Routes, Route} from "react-router-dom";
import ArtistPage from "./features/ArtistPage/ArtistPage.tsx";
import Album from "./features/Album/Album.tsx";

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
                <Route path="album/:id" element={<Album />} />
            </Routes>
        </main>
    </>
  )
};

export default App
