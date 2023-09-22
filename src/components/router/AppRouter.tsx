import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import RequireAuth from '@app/components/router/RequireAuth';
import { withLoading } from '@app/hocs/withLoading.hoc';
import MapViewPage from '@app/pages/GarlicWeekPages/MapViewPage/MapViewPage';
import ListViewPage from '@app/pages/GarlicWeekPages/ListViewPage/ListViewPage';
import TOSComponent from "@app/components/tos/TOSComponent";


const MapView = withLoading(MapViewPage);
const ListView = withLoading(ListViewPage);
const TOSView = withLoading(TOSComponent);


export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ListView />} />
          <Route path="mapview" element={<MapView />} />
          <Route path="terms" element={<TOSView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
