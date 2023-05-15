import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../../layouts/Main';
import MasterPages from '../../layouts/MasterPages';
import BookMarks from '../../pages/BookMarks';
import CharacterDetails from '../../pages/CharacterDetails';
import Characters from '../../pages/Characters';
import ComicDetails from '../../pages/ComicDetails';
import Comics from '../../pages/Comics';
import HomePage from '../../pages/Homepage';
import StorieDetails from '../../pages/StorieDetails';
import Stories from '../../pages/Stories';

export default function Router() {
  return (
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/bookmark' element={<BookMarks />} />
          <Route element={<MasterPages />}>
            <Route path='/characters' element={<Characters />} />
            <Route path='/comics' element={<Comics />} />
          </Route>
          <Route path='/stories' element={<Stories />} />
          <Route path='/characters/:id' element={<CharacterDetails />} />
          <Route path='/comics/:id' element={<ComicDetails />} />
          <Route path='/stories/:id' element={<StorieDetails />} />
        </Route>
      </Routes>
  );
}
