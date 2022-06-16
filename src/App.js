import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Views _____________________________________
import { Session } from "./views/Session";
import { LandPage } from "./views/LandPage/LandPage";
import { Error } from "./views/Error";
import { Main } from "./views/Main";
import { Events } from "views/Events";
import { FilterEvents } from "views/FilterEvents";
import { FilterCenters } from "views/FilterCenters";

// Components ________________________________
import { Header } from "components/Header/Header";
// Context ___________________________________
import { UserContextProvider } from "./contexts/user";
import { Footer } from "components/Footer/Footer";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Header />
        <main className="app--main">
          <Routes>
            <Route path="/" element={<LandPage />} />
            <Route path="/login" element={<Session />} />
            <Route path="/main" element={<Main />} />
            <Route path="/events" element={<Events />} />
            <Route path="/filterevents" element={<FilterEvents />} />
            <Route path="/filtercenters" element={<FilterCenters />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
